import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { InputBoolean } from '../core/util';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'vts-inplace',
    host: {
        // '[class.vts-inplace-display-disabled]': `disabled`,
    },
    template: `
        <div [ngClass]="{ 'vts-inplace': true }">
            <div class="vts-inplace-display" (click)="onActivateClick($event)" (keydown)="onKeydown($event)" *ngIf="!active" tabindex="1" [ngClass]="{ 'vts-inplace-disabled': disabled }">
                <i vts-icon [vtsType]="vtsIcon" *ngIf="vtsIcon"></i>    
                <ng-content select="[vtsInplaceDisplay]"></ng-content>
            </div>
            <div class="vts-inplace-content" *ngIf="active" >
                    <ng-content select="[vtsInplaceContent]"></ng-content>
                    <button vts-button vtsType="primary" (click)="onDeactivateClick($event)" *ngIf="closable" tabindex="1"><i vts-icon vtsType="Close"></i></button>
            </div>
        </div>
    `,
})
export class VtsInplaceComponent {
  
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_active: BooleanInput;

    @Input() @InputBoolean() active: boolean = false;

    @Input() closable: boolean = false;

    @Input() @InputBoolean() disabled: boolean = false;

    @Input() preventClick: boolean = false;

    @Input() style: any;

    @Input() styleClass: string = '';
    
    @Input() vtsIcon: string | null = null;

    @Output() onActivate: EventEmitter<any> = new EventEmitter();

    @Output() onDeactivate: EventEmitter<any> = new EventEmitter();

    hover: boolean = true;


    constructor(public cd: ChangeDetectorRef) {}

    onActivateClick(event: Event | undefined) {
        if (!this.preventClick) this.activate(event);
    }

    onDeactivateClick(event: Event | undefined) {
        if (!this.preventClick) this.deactivate(event);
    }

    activate(event?: Event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
            this.cd.markForCheck();
        } 
    }

    deactivate(event?: Event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
            this.cd.markForCheck();
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            
            this.activate(event);
            event.preventDefault();
        }
    }
}