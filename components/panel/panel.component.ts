import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewEncapsulation,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { accordionMotion } from '@ui-vts/ng-vts/core/animation';

@Component({
  selector: 'vts-panel',
  exportAs: 'vtsPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-card class="vts-panel">
      <vts-card-header [vtsTitle]="vtsTitle" class="vts-panel-header">
        <vts-card-header-extra>
          <ng-container *ngIf="vtsExtraTpl; else defaultExtraTpl">
            <ng-container *vtsStringTemplateOutlet="vtsExtraTpl">
              {{ vtsExtraTpl }}
            </ng-container>
          </ng-container>
          <ng-template #defaultExtraTpl>
            <div
              class="vts-panel-toggle"
              [class.vts-panel-toggle-active]="vtsActive"
              (click)="toggle()"
            >
              <ng-container *ngIf="!vtsActive; else collapseToggleTpl">
                <ng-container *ngTemplateOutlet="expandToggleTpl"></ng-container>
              </ng-container>
              <ng-template #expandToggleTpl>
                <ng-container *ngIf="vtsExpandTpl; else vtsExpandIconTpl">
                  <ng-container *vtsStringTemplateOutlet="vtsExpandTpl">
                    {{ vtsExpandTpl }}
                  </ng-container>
                </ng-container>
                <ng-template #vtsExpandIconTpl>
                  <button *ngIf="vtsExpandIcon" vts-button vtsType="text">
                    <i vts-icon [vtsType]="vtsExpandIcon"></i>
                  </button>
                </ng-template>
              </ng-template>
              <ng-template #collapseToggleTpl>
                <ng-container *ngIf="vtsCollapseTpl; else vtsCollapseIconTpl">
                  <ng-container *vtsStringTemplateOutlet="vtsCollapseTpl">
                    {{ vtsCollapseTpl }}
                  </ng-container>
                </ng-container>
                <ng-template #vtsCollapseIconTpl>
                  <button *ngIf="vtsCollapseIcon" vts-button vtsType="text">
                    <i vts-icon [vtsType]="vtsCollapseIcon"></i>
                  </button>
                </ng-template>
              </ng-template>
            </div>
          </ng-template>
        </vts-card-header-extra>
      </vts-card-header>
      <vts-card-body
        class="vts-panel-content"
        [class.vts-panel-content-active]="vtsActive"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [@accordionMotion]="vtsActive ? 'expanded' : 'hidden'"
        [vtsContent]="content"
      >
        <ng-template #content>
          <div class="vts-panel-content-box">
            <ng-content></ng-content>
          </div>
        </ng-template>
      </vts-card-body>
    </vts-card>
  `,
  animations: [accordionMotion]
})
export class VtsPanelComponent implements OnDestroy, OnInit, OnChanges {
  @Input() vtsTitle?: string | null;
  @Input() vtsExpandIcon?: string = 'ArrowDownOutline';
  @Input() vtsExpandTpl?: string | TemplateRef<any>;
  @Input() vtsCollapseIcon?: string = 'ArrowUpOutline';
  @Input() vtsCollapseTpl?: string | TemplateRef<any>;
  @Input() vtsExtraTpl?: string | TemplateRef<any>;
  @Input() vtsActive: boolean = true;
  _bindActive: boolean = false;

  @Output() vtsActiveChange = new EventEmitter<boolean>();

  private destroy$ = new Subject();

  constructor(@Optional() public noAnimation?: VtsNoAnimationDirective) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsActive } = changes;
    if (vtsActive && vtsActive.firstChange) {
      this._bindActive = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public show() {
    if (this._bindActive) this.vtsActiveChange.emit(true);
    else {
      this.vtsActive = true;
      this.vtsActiveChange.emit(this.vtsActive);
    }
  }

  public hide() {
    if (this._bindActive) this.vtsActiveChange.emit(true);
    else {
      this.vtsActive = false;
      this.vtsActiveChange.emit(this.vtsActive);
    }
  }

  public toggle() {
    if (this._bindActive) this.vtsActiveChange.emit(!this.vtsActive);
    else {
      this.vtsActive = !this.vtsActive;
      this.vtsActiveChange.emit(this.vtsActive);
    }
  }
}
