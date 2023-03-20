import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';
import { ThemeColorType } from './pro-layout.types';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class VtsSettingDrawerComponent implements OnInit {

    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.classList.add('vts-setting-drawer');
    }

    open: boolean = false;
    listColors: ThemeColorType[] = [
        {
            isChecked: true,
            value: '#EE0033'
        },
        {
            isChecked: false,
            value: '#f50'
        },
        {
            isChecked: false,
            value: '#2db7f5'
        },
        {
            isChecked: false,
            value: '#87d068'
        },
        {
            isChecked: false,
            value: '#108ee9'
        },        
    ]

    @Input() isFixedHeader: boolean = false;
    @Input() isFixedSider: boolean = false;
    @Input() isShowHeader: boolean = true;
    @Input() isShowSider: boolean = true;
    @Input() isShowFooter: boolean = true;
    @Input() useDarkMode: boolean = false;
    @Input() useSplitMenu: boolean = false;

    @Output() setFixedHeader: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setFixedSider: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setVisiblityHeader: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setVisiblitySider: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setVisiblityFooter: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setThemeColor: EventEmitter<string> = new EventEmitter<string>();
    @Output() setPageStyle: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setSplitMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() { }

    closeDrawer() {
        this.open = false;
    }

    openDrawer() {
        this.open = true;
    }

    onChangeFixedSider(value: boolean) {
        this.setFixedSider.emit(value);
    }

    onChangeFixedHeader(value: boolean) {
        this.setFixedHeader.emit(value);
    }

    onChangeVisiblityHeader(value: boolean) {
        this.setVisiblityHeader.emit(value);
    }

    onChangeVisiblitySider(value: boolean) {
        this.setVisiblitySider.emit(value);
    }

    onChangeVisiblityFooter(value: boolean) {
        this.setVisiblityFooter.emit(value);
    }

    onChangeThemeColor(value: string){
        let cloneColors: ThemeColorType[] = [...this.listColors];
        cloneColors.filter(c => c.isChecked)[0].isChecked = false;
        cloneColors.filter(c => c.value == value)[0].isChecked = true;
        this.listColors = [...cloneColors];
        this.setThemeColor.emit(value);
    }

    onChangePageStyle(value: boolean){
        this.setPageStyle.emit(value);
    }

    onChangeSplitMenu(value: boolean){
        this.setSplitMenu.emit(value);
    }
}