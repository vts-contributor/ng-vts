import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
import { VtsThemeColorType } from './pro-layout.types';
import { VtsThemeService, VtsTheme, VtsThemeItem } from '@ui-vts/theme/services';

@Component({
  selector: 'vts-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class VtsSettingDrawerComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private prolayoutService: ProlayoutService,
    private themeService: VtsThemeService
  ) {
    this.elementRef.nativeElement.classList.add('vts-setting-drawer');
    this.themeService.allTheme$.subscribe((d: VtsThemeItem[]) => (this.allThemes = d));
    this.themeService.theme$.subscribe((d: VtsTheme | null) => {
      this.currentTheme = d;
      this.isDarkMode = d === 'dark';
    });
  }

  allThemes: VtsThemeItem[] = [];
  currentTheme: VtsTheme | null = null;
  isDarkMode: boolean = false;
  open: boolean = false;
  listColors: VtsThemeColorType[] = [
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
    }
  ];

  isFixedHeader: boolean = false;
  isFixedSider: boolean = true;
  isShowHeader: boolean = true;
  isShowSider: boolean = true;
  isShowFooter: boolean = true;
  useSplitMenu: boolean = false;

  @Output() vtsSetThemeColor: EventEmitter<string> = new EventEmitter<string>();

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

  onChangeThemeColor(value: string) {
    let cloneColors: VtsThemeColorType[] = [...this.listColors];
    cloneColors.filter(c => c.isChecked)[0].isChecked = false;
    cloneColors.filter(c => c.value == value)[0].isChecked = true;
    this.listColors = [...cloneColors];
    this.vtsSetThemeColor.emit(value);
  }

  onChangeSplitMenu(value: boolean) {
    this.useSplitMenu = value;
    this.prolayoutService.onChangeUseSplitMenu(value);
  }

  onThemeChange() {
    this.themeService.setTheme(this.currentTheme === 'default' ? 'dark' : 'default');
  }
}
