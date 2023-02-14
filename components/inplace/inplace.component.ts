import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  ContentChild
} from '@angular/core';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { VtsInplaceCollapseComponent } from './inplace-collapse.component';
import { VtsInplacePlaceholderComponent } from './inplace-placeholder.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-inplace',
  host: {
    '[class.vts-inplace]': 'true',
    '[class.vts-inplace-disabled]': 'vtsDisabled',
    '[class.vts-inplace-active]': 'vtsActive'
  },
  template: `
    <ng-container *ngIf="!vtsActive">
      <ng-container *ngTemplateOutlet="expand"></ng-container>
    </ng-container>
    <div class="vts-inplace-content" *ngIf="vtsActive">
      <ng-content></ng-content>
    </div>
    <ng-container *ngIf="vtsActive && vtsClosable">
      <ng-container *ngTemplateOutlet="collapse"></ng-container>
    </ng-container>

    <ng-template #expand>
      <ng-container *ngIf="expandTpl; else defaultExpandTpl">
        <ng-content select="vts-inplace-placeholder"></ng-content>
      </ng-container>
      <ng-template #defaultExpandTpl>
        <div
          class="vts-inplace-placeholder"
          (click)="activate()"
          (keydown)="onKeydown($event)"
          *ngIf="!vtsActive"
          tabindex="1"
        >
          <ng-container *ngIf="vtsIcon">
            <button [disabled]="vtsDisabled" vts-button vtsType="text">
              <i vts-icon [vtsType]="vtsIcon"></i>
            </button>
          </ng-container>
          <ng-container *ngIf="vtsText && !vtsIcon">
            <span
              vts-typo
              [vtsType]="!vtsDisabled ? 'link' : null"
              [vtsColor]="vtsDisabled ? 'disabled' : null"
            >
              {{ vtsText }}
            </span>
          </ng-container>
        </div>
      </ng-template>
    </ng-template>
    <ng-template #collapse>
      <ng-container *ngIf="collapseTpl; else defaultCollapseTpl">
        <ng-content select="vts-inplace-collapse"></ng-content>
      </ng-container>
      <ng-template #defaultCollapseTpl>
        <div class="vts-inplace-collapse" (click)="deactivate()" tabindex="1">
          <ng-container *ngIf="vtsCollapseIcon">
            <button [disabled]="vtsDisabled" vts-button vtsType="text">
              <i vts-icon [vtsType]="vtsCollapseIcon"></i>
            </button>
          </ng-container>
          <ng-container *ngIf="vtsCollapseText && !vtsCollapseIcon">
            <span
              vts-typo
              [vtsType]="!vtsDisabled ? 'link' : null"
              [vtsColor]="vtsDisabled ? 'disabled' : null"
            >
              {{ vtsCollapseText }}
            </span>
          </ng-container>
        </div>
      </ng-template>
    </ng-template>
  `
})
export class VtsInplaceComponent {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsActive: BooleanInput;
  static ngAcceptInputType_vtsClosable: BooleanInput;

  @Input() @InputBoolean() vtsActive: boolean = false;
  @Input() @InputBoolean() vtsClosable: boolean = false;
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Input() vtsIcon: string | null = null;
  @Input() vtsText: string | null = null;
  @Input() vtsCollapseIcon: string | null = null;
  @Input() vtsCollapseText: string | null = null;
  @Output() vtsActiveChange: EventEmitter<any> = new EventEmitter();

  @ContentChild(VtsInplacePlaceholderComponent) expandTpl?: VtsInplacePlaceholderComponent;
  @ContentChild(VtsInplaceCollapseComponent) collapseTpl?: VtsInplaceCollapseComponent;

  constructor(public cd: ChangeDetectorRef) {}

  activate() {
    if (!this.vtsDisabled) {
      this.vtsActive = true;
      this.vtsActiveChange.emit(true);
      this.cd.markForCheck();
    }
  }

  deactivate() {
    if (!this.vtsDisabled) {
      this.vtsActive = false;
      this.vtsActiveChange.emit(false);
      this.cd.markForCheck();
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.activate();
      event.preventDefault();
    }
  }
}
