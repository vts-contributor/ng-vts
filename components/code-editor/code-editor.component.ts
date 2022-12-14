/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Import types from monaco editor.
import { editor } from 'monaco-editor';
import { warn } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, VtsSafeAny, OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { inNextTick, InputBoolean } from '@ui-vts/ng-vts/core/util';
import { BehaviorSubject, combineLatest, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

import { VtsCodeEditorService } from './code-editor.service';
import { DiffEditorOptions, EditorOptions, JoinedEditorOptions, VtsEditorMode } from './typings';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import IStandaloneDiffEditor = editor.IStandaloneDiffEditor;

declare const monaco: VtsSafeAny;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-code-editor',
  exportAs: 'vtsCodeEditor',
  template: `
    <div class="vts-code-editor-loading" *ngIf="vtsLoading">
      <vts-spin></vts-spin>
    </div>

    <div class="vts-code-editor-toolkit" *ngIf="vtsToolkit">
      <ng-template [ngTemplateOutlet]="vtsToolkit"></ng-template>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsCodeEditorComponent),
      multi: true
    }
  ]
})
export class VtsCodeEditorComponent implements OnDestroy, AfterViewInit {
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsFullControl: BooleanInput;

  @Input() vtsEditorMode: VtsEditorMode = 'normal';
  @Input() vtsOriginalText = '';
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @InputBoolean() vtsFullControl = false;
  @Input() vtsToolkit?: TemplateRef<void>;

  @Input() set vtsEditorOption(value: JoinedEditorOptions) {
    this.editorOption$.next(value);
  }

  @Output() readonly vtsEditorInitialized = new EventEmitter<
    IStandaloneCodeEditor | IStandaloneDiffEditor
  >();

  editorOptionCached: JoinedEditorOptions = {};

  private readonly el: HTMLElement;
  private destroy$ = new Subject<void>();
  private resize$ = new Subject<void>();
  private editorOption$ = new BehaviorSubject<JoinedEditorOptions>({});
  private editorInstance?: IStandaloneCodeEditor | IStandaloneDiffEditor;
  private value = '';
  private modelSet = false;

  constructor(
    private vtsCodeEditorService: VtsCodeEditorService,
    private ngZone: NgZone,
    elementRef: ElementRef,
    private platform: Platform
  ) {
    this.el = elementRef.nativeElement;
    this.el.classList.add('vts-code-editor');
  }

  /**
   * Initialize a monaco editor instance.
   */
  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.vtsCodeEditorService.requestToInit().subscribe(option => this.setup(option));
  }

  ngOnDestroy(): void {
    if (this.editorInstance) {
      this.editorInstance.dispose();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string): void {
    this.value = value;
    this.setValue();
  }

  registerOnChange(fn: OnChangeType): VtsSafeAny {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouch = fn;
  }

  onChange: OnChangeType = (_value: string) => {};

  onTouch: OnTouchedType = () => {};

  layout(): void {
    this.resize$.next();
  }

  private setup(option: JoinedEditorOptions): void {
    inNextTick().subscribe(() => {
      this.editorOptionCached = option;
      this.registerOptionChanges();
      this.initMonacoEditorInstance();
      this.registerResizeChange();
      this.setValue();

      if (!this.vtsFullControl) {
        this.setValueEmitter();
      }

      this.vtsEditorInitialized.emit(this.editorInstance);
    });
  }

  private registerOptionChanges(): void {
    combineLatest([this.editorOption$, this.vtsCodeEditorService.option$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([selfOpt, defaultOpt]) => {
        this.editorOptionCached = {
          ...this.editorOptionCached,
          ...defaultOpt,
          ...selfOpt
        };
        this.updateOptionToMonaco();
      });
  }

  private initMonacoEditorInstance(): void {
    this.ngZone.runOutsideAngular(() => {
      this.editorInstance =
        this.vtsEditorMode === 'normal'
          ? monaco.editor.create(this.el, { ...this.editorOptionCached })
          : monaco.editor.createDiffEditor(this.el, {
              ...(this.editorOptionCached as DiffEditorOptions)
            });
    });
  }

  private registerResizeChange(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(300), takeUntil(this.destroy$))
        .subscribe(() => {
          this.layout();
        });

      this.resize$
        .pipe(
          takeUntil(this.destroy$),
          filter(() => !!this.editorInstance),
          map(() => ({
            width: this.el.clientWidth,
            height: this.el.clientHeight
          })),
          distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
          debounceTime(50)
        )
        .subscribe(() => {
          this.editorInstance!.layout();
        });
    });
  }

  private setValue(): void {
    if (!this.editorInstance) {
      return;
    }

    if (this.vtsFullControl && this.value) {
      warn(
        `should not set value when you are using full control mode! It would result in ambiguous data flow!`
      );
      return;
    }

    if (this.vtsEditorMode === 'normal') {
      if (this.modelSet) {
        const model = this.editorInstance.getModel() as ITextModel;
        this.preservePositionAndSelections(() => model.setValue(this.value));
      } else {
        (this.editorInstance as IStandaloneCodeEditor).setModel(
          monaco.editor.createModel(this.value, (this.editorOptionCached as EditorOptions).language)
        );
        this.modelSet = true;
      }
    } else {
      if (this.modelSet) {
        const model = (this.editorInstance as IStandaloneDiffEditor).getModel()!;
        this.preservePositionAndSelections(() => {
          model.modified.setValue(this.value);
          model.original.setValue(this.vtsOriginalText);
        });
      } else {
        const language = (this.editorOptionCached as EditorOptions).language;
        (this.editorInstance as IStandaloneDiffEditor).setModel({
          original: monaco.editor.createModel(this.vtsOriginalText, language),
          modified: monaco.editor.createModel(this.value, language)
        });
        this.modelSet = true;
      }
    }
  }

  /**
   * {@link editor.ICodeEditor}#setValue resets the cursor position to the start of the document.
   * This helper memorizes the cursor position and selections and restores them after the given
   * function has been called.
   */
  private preservePositionAndSelections(fn: () => unknown): void {
    if (!this.editorInstance) {
      fn();
      return;
    }

    const position = this.editorInstance.getPosition();
    const selections = this.editorInstance.getSelections();

    fn();

    if (position) {
      this.editorInstance.setPosition(position);
    }
    if (selections) {
      this.editorInstance.setSelections(selections);
    }
  }

  private setValueEmitter(): void {
    const model = (
      this.vtsEditorMode === 'normal'
        ? (this.editorInstance as IStandaloneCodeEditor).getModel()
        : (this.editorInstance as IStandaloneDiffEditor).getModel()!.modified
    ) as ITextModel;

    model.onDidChangeContent(() => {
      this.ngZone.run(() => {
        this.emitValue(model.getValue());
      });
    });
  }

  private emitValue(value: string): void {
    if (this.value === value) {
      // If the value didn't change there's no reason to send an update.
      // Specifically this may happen during an update from the model (writeValue) where sending an update to the model would actually be incorrect.
      return;
    }

    this.value = value;
    this.onChange(value);
  }

  private updateOptionToMonaco(): void {
    if (this.editorInstance) {
      this.editorInstance.updateOptions({ ...this.editorOptionCached });
    }
  }
}
