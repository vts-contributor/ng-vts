import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ContentChildren,
  QueryList,
  ElementRef,
  ChangeDetectorRef,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { VtsSplitterItemDirective } from './splitter-item.directive';

@Component({
  selector: 'vts-splitter',
  template: `
    <div #container [ngClass]="containerClass()" [class]="vtsStyleClass" [ngStyle]="vtsStyle">
      <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
        <div
          [ngClass]="panelContainerClass()"
          [class]="vtsPanelStyleClass"
          [ngStyle]="vtsPanelStyle"
        >
          <ng-container *ngTemplateOutlet="panel"></ng-container>
        </div>
        <div
          class="vts-splitter-gutter"
          [class.vts-splitter-gutter-resizing]="isResizing"
          *ngIf="i !== panels.length - 1"
          [ngStyle]="gutterStyle()"
          (mousedown)="onGutterMouseDown($event, i)"
          (touchstart)="onGutterTouchStart($event, i)"
        >
          <div class="vts-splitter-gutter-handle"></div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-splitter-panel-nested]': 'nested'
  }
})
export class VtsSplitterComponent {
  @Input() vtsStyle: NgStyleInterface | null = null;
  @Input() vtsStyleClass: string = '';
  @Input() vtsPanelStyleClass: string = '';
  @Input() vtsPanelStyle: NgStyleInterface | null = null;
  @Input() vtsStateStorage: string = 'session';
  @Input() vtsStateKey: string | null = null;
  @Input() vtsLayout: string = 'horizontal';
  @Input() vtsGutterSize: number = 4;
  @Input() vtsMinSizes: number[] = [];
  @Output() vtsOnResizeEnd: EventEmitter<any> = new EventEmitter();
  @Output() vtsOnResizeStart: EventEmitter<any> = new EventEmitter();

  @ContentChildren(VtsSplitterItemDirective) templates!: QueryList<VtsSplitterItemDirective>;
  @ViewChild('container', { static: false }) containerViewChild!: ElementRef;

  @Input() get vtsPanelSizes(): number[] {
    return this._panelSizes;
  }
  set vtsPanelSizes(val: number[]) {
    this._panelSizes = val;
    if (this.el && this.el.nativeElement && this.panels.length > 0) {
      let children = [...this.el.nativeElement.children[0].children].filter((child: HTMLElement) =>
        child.classList.contains('vts-splitter-panel')
      );
      let _panelSizes = [];

      this.panels.map((_, i) => {
        let panelInitialSize = this.vtsPanelSizes.length - 1 >= i ? this.vtsPanelSizes[i] : null;
        let panelSize = panelInitialSize || 100 / this.panels.length;
        _panelSizes[i] = panelSize;
        children[i].style.flexBasis =
          'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.vtsGutterSize + 'px)';
      });
    }
  }

  nested = false;
  panels: TemplateRef<any>[] = [];
  dragging = false;
  mouseMoveListener: ((e: MouseEvent) => any) | null = null;
  mouseUpListener: ((e: MouseEvent) => any) | null = null;
  touchMoveListener: ((e: TouchEvent) => any) | null = null;
  touchEndListener: ((e: TouchEvent) => any) | null = null;
  size: number | null = null;
  gutterElement: HTMLElement | null = null;
  startPos: number | null = null;
  prevPanelElement: HTMLElement | null = null;
  nextPanelElement: HTMLElement | null = null;
  nextPanelSize: number | null = null;
  prevPanelSize: number | null = null;
  _panelSizes: number[] = [];
  prevPanelIndex: number | null = null;
  isResizing: boolean = false;

  constructor(public cd: ChangeDetectorRef, private el: ElementRef) {}

  ngOnInit() {
    this.nested = this.isNested();
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      if (item.template) this.panels.push(item.template);
    });
  }

  ngAfterViewInit() {
    if (this.panels && this.panels.length) {
      let initialized = false;
      if (this.isStateful()) {
        initialized = this.restoreState();
      }

      if (!initialized) {
        let children = [...this.el.nativeElement.children[0].children].filter(
          (child: HTMLElement) => child.classList.contains('vts-splitter-panel')
        );
        let _panelSizes: number[] = [];

        this.panels.map((_, i) => {
          let panelInitialSize = this.vtsPanelSizes.length - 1 >= i ? this.vtsPanelSizes[i] : null;
          let panelSize = panelInitialSize || 100 / this.panels.length;
          _panelSizes[i] = panelSize;
          children[i].style.flexBasis =
            'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.vtsGutterSize + 'px)';
        });

        this._panelSizes = _panelSizes;
      }
    }
  }

  resizeStart(event: Partial<MouseEvent & TouchEvent>, index: number) {
    this.gutterElement = event.currentTarget as HTMLElement;
    this.size = this.horizontal()
      ? this.getWidth(this.containerViewChild.nativeElement)
      : this.getHeight(this.containerViewChild.nativeElement);
    this.dragging = true;
    this.startPos = this.horizontal()
      ? event.pageX || event.changedTouches?.[0].pageX || null
      : event.pageY || event.changedTouches?.[0].pageY || null;
    this.prevPanelElement = this.gutterElement!.previousElementSibling as HTMLElement;
    this.nextPanelElement = this.gutterElement!.nextElementSibling as HTMLElement;
    this.prevPanelSize =
      (100 *
        (this.horizontal()
          ? this.getOuterWidth(this.prevPanelElement, true)
          : this.getOuterHeight(this.prevPanelElement, true))) /
      this.size;
    this.nextPanelSize =
      (100 *
        (this.horizontal()
          ? this.getOuterWidth(this.nextPanelElement, true)
          : this.getOuterHeight(this.nextPanelElement, true))) /
      this.size;
    this.prevPanelIndex = index;
    this.gutterElement.classList.add('vts-splitter-gutter-resizing');
    this.containerViewChild.nativeElement.classList.add('vts-splitter-resizing');
    this.vtsOnResizeStart.emit({ originalEvent: event, sizes: this._panelSizes });
    this.isResizing = false;
  }

  onResize(event: Partial<MouseEvent & TouchEvent>) {
    let newPos;
    if (this.horizontal())
      newPos = ((event.pageX || 0) * 100) / this.size! - (this.startPos! * 100) / this.size!;
    else newPos = ((event.pageY || 0) * 100) / this.size! - (this.startPos! * 100) / this.size!;

    let newPrevPanelSize = this.prevPanelSize! + newPos;
    let newNextPanelSize = this.nextPanelSize! - newPos;

    if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
      this.prevPanelElement!.style.flexBasis =
        'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.vtsGutterSize + 'px)';
      this.nextPanelElement!.style.flexBasis =
        'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.vtsGutterSize + 'px)';
      this._panelSizes[this.prevPanelIndex!] = newPrevPanelSize;
      this._panelSizes[this.prevPanelIndex! + 1] = newNextPanelSize;
    }
  }

  resizeEnd(event: Partial<MouseEvent & TouchEvent>) {
    if (this.isStateful()) {
      this.saveState();
    }

    this.vtsOnResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
    this.gutterElement?.classList.remove('vts-splitter-gutter-resizing');
    this.containerViewChild.nativeElement.classList.remove('vts-splitter-resizing');
    this.clear();
    this.isResizing = false;
  }

  onGutterMouseDown(event: MouseEvent, index: number) {
    this.resizeStart(event, index);
    this.bindMouseListeners();
  }

  onGutterTouchStart(event: TouchEvent, index: number) {
    if (event.cancelable) {
      this.resizeStart(event, index);
      this.bindTouchListeners();

      event.preventDefault();
    }
  }

  onGutterTouchEnd(event: TouchEvent) {
    this.resizeEnd(event);
    this.unbindTouchListeners();

    if (event.cancelable) event.preventDefault();
  }

  validateResize(newPrevPanelSize: number, newNextPanelSize: number) {
    if (
      this.vtsMinSizes.length >= 1 &&
      this.vtsMinSizes[0] &&
      this.vtsMinSizes[0] > newPrevPanelSize
    ) {
      return false;
    }

    if (
      this.vtsMinSizes.length > 1 &&
      this.vtsMinSizes[1] &&
      this.vtsMinSizes[1] > newNextPanelSize
    ) {
      return false;
    }

    return true;
  }

  bindMouseListeners() {
    if (!this.mouseMoveListener) {
      this.mouseMoveListener = event => this.onResize(event);
      document.addEventListener('mousemove', this.mouseMoveListener);
    }

    if (!this.mouseUpListener) {
      this.mouseUpListener = event => {
        this.resizeEnd(event);
        this.unbindMouseListeners();
      };
      document.addEventListener('mouseup', this.mouseUpListener);
    }
  }

  bindTouchListeners() {
    if (!this.touchMoveListener) {
      this.touchMoveListener = event => this.onResize(event.changedTouches[0]);
      document.addEventListener('touchmove', this.touchMoveListener);
    }

    if (!this.touchEndListener) {
      this.touchEndListener = event => {
        this.resizeEnd(event);
        this.unbindTouchListeners();
      };
      document.addEventListener('touchend', this.touchEndListener);
    }
  }

  unbindMouseListeners() {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = null;
    }

    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
      this.mouseUpListener = null;
    }
  }

  unbindTouchListeners() {
    if (this.touchMoveListener) {
      document.removeEventListener('touchmove', this.touchMoveListener);
      this.touchMoveListener = null;
    }

    if (this.touchEndListener) {
      document.removeEventListener('touchend', this.touchEndListener);
      this.touchEndListener = null;
    }
  }

  clear() {
    this.dragging = false;
    this.size = null;
    this.startPos = null;
    this.prevPanelElement = null;
    this.nextPanelElement = null;
    this.prevPanelSize = null;
    this.nextPanelSize = null;
    this.gutterElement = null;
    this.prevPanelIndex = null;
  }

  isNested() {
    if (this.el.nativeElement) {
      let parent: HTMLElement | null = this.el.nativeElement.parentElement as HTMLElement;
      while (parent && parent.classList.contains('vts-splitter')) {
        parent = parent.parentElement;
      }

      return parent !== null;
    } else {
      return false;
    }
  }

  isStateful() {
    return this.vtsStateKey != null;
  }

  getStorage() {
    switch (this.vtsStateStorage) {
      case 'local':
        return window.localStorage;

      case 'session':
        return window.sessionStorage;

      default:
        throw new Error(
          this.vtsStateStorage +
            ' is not a valid value for the state storage, supported values are "local" and "session".'
        );
    }
  }

  saveState() {
    this.getStorage().setItem(this.vtsStateKey!, JSON.stringify(this._panelSizes));
  }

  restoreState() {
    const storage = this.getStorage();
    const stateString = storage.getItem(this.vtsStateKey!);

    if (stateString) {
      this._panelSizes = JSON.parse(stateString);
      let children = [...this.containerViewChild.nativeElement.children].filter(
        (child: HTMLElement) => child.classList.contains('vts-splitter-panel')
      );
      children.forEach((child, i) => {
        child.style.flexBasis =
          'calc(' +
          this._panelSizes[i] +
          '% - ' +
          (this.panels.length - 1) * this.vtsGutterSize +
          'px)';
      });

      return true;
    }

    return false;
  }

  containerClass() {
    return {
      'vts-splitter': true,
      'vts-splitter-horizontal': this.vtsLayout === 'horizontal',
      'vts-splitter-vertical': this.vtsLayout === 'vertical'
    };
  }

  panelContainerClass() {
    return {
      'vts-splitter-panel': true,
      'vts-splitter-panel-nested': true
    };
  }

  gutterStyle() {
    if (this.horizontal()) return { width: this.vtsGutterSize + 'px' };
    else return { height: this.vtsGutterSize + 'px' };
  }

  horizontal() {
    return this.vtsLayout === 'horizontal';
  }

  // #region Utilities

  public getHeight(el: HTMLElement): number {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);

    height -=
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);

    return height;
  }

  public getWidth(el: HTMLElement): number {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -=
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth);

    return width;
  }

  public getOuterWidth(el: HTMLElement, margin?: boolean) {
    let width = el.offsetWidth;

    if (margin) {
      let style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  public getOuterHeight(el: HTMLElement, margin?: boolean) {
    let height = el.offsetHeight;

    if (margin) {
      let style = getComputedStyle(el);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }

  // #endregion
}
