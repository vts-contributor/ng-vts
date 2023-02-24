import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class VtsSettingDrawerComponent implements OnInit {

    constructor(private elementRef: ElementRef){
        this.elementRef.nativeElement.classList.add('vts-setting-drawer');
    }

    open: boolean = false;
    drawerWrapClassName: string = "test-prolayout"

    @Input() isFixedHeader: boolean = false;
    @Input() isFixedSider: boolean = false;

    @Output() setFixedHeader: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() setFixedSider: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    ngOnInit() { }

    closeDrawer(){
        this.open = false;
    }

    openDrawer(){
        this.open = true;
    }

    onChangeFixedSider(value: boolean){
        this.setFixedSider.emit(value);
    }

    onChangeFixedHeader(value: boolean){
        this.setFixedHeader.emit(value);
    }
}