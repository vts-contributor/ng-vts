import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
import { ThemeColorType } from './pro-layout.types';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class VtsSettingDrawerComponent implements OnInit {

    constructor(private elementRef: ElementRef, private prolayoutService: ProlayoutService) {
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

    isFixedHeader: boolean = false;
    isFixedSider: boolean = true;
    isShowHeader: boolean = true;
    isShowSider: boolean = true;
    isShowFooter: boolean = true;
    @Input() useDarkMode: boolean = false;
    useSplitMenu: boolean = false;

    @Output() setThemeColor: EventEmitter<string> = new EventEmitter<string>();
    @Output() setPageStyle: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        this.prolayoutService.fixedSiderChange$.next(this.isFixedSider);
        this.prolayoutService.fixedHeaderChange$.next(this.isFixedHeader);
    }

    closeDrawer() {
        this.open = false;
    }

    openDrawer() {
        this.open = true;
    }

    onChangeFixedSider(value: boolean) {
        this.isFixedSider = value;
        this.prolayoutService.onChangeFixedSider(value);
        if (value && this.isFixedHeader) {
          this.isFixedHeader = false;
          this.prolayoutService.onChangeFixedHeader(false);
        }
        if (!this.isShowSider) {
          this.isShowSider = true;
          this.prolayoutService.onChangeVisibilitySider(true);
        }
    }

    onChangeFixedHeader(value: boolean) {
        this.isFixedHeader = value;
        this.prolayoutService.onChangeFixedHeader(value);
        if (value && this.isFixedSider) {
          this.isFixedSider = false;
          this.prolayoutService.onChangeFixedSider(false);
        }
        if (!this.isShowHeader) {
          this.isShowHeader = true;
          this.prolayoutService.onChangeVisibilityHeader(true);
        }
    }

    onChangeVisiblityHeader(value: boolean) {
        this.isShowHeader = value;
        this.prolayoutService.onChangeVisibilityHeader(value);
        if (!value && this.isFixedHeader) {
          this.isFixedHeader = false;
          this.prolayoutService.onChangeFixedHeader(false);
        }
    }

    onChangeVisiblitySider(value: boolean) {
        this.isShowSider = value;
        this.prolayoutService.onChangeVisibilitySider(value);
        if (!value && this.isFixedSider) {
          this.isFixedSider = false;
          this.prolayoutService.onChangeFixedSider(false);
        }
    }

    onChangeVisiblityFooter(value: boolean) {
        this.isShowFooter = value;
        this.prolayoutService.onChangeVisibilityFooter(value);
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
        this.useSplitMenu = value;
        this.prolayoutService.onChangeUseSplitMenu(value);
    }
}