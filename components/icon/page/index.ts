import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AntdManifest,
  BootstrapManifest,
  BoxIconManifest,
  CircumIconManifest,
  CssggManifest,
  DevIconManifest,
  FaManifest,
  FeatherManifest,
  GameIconManifest,
  HeroManifest,
  FlatColorManifest,
  IcomoonManifest,
  MatManifest,
  OctIconManifest,
  RadixManifest,
  SimpleIconManifest,
  SimpleLineManifest,
  ThemifyManifest,
  TypIconManifest,
  VsManifest,
  VtsManifest,
  WeatherManifest
} from '@ui-vts/icons-angular';
import { ColorEvent } from 'ngx-color';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'vts-page-demo-icon',
  template: `
    <vts-affix [vtsOffsetTop]="87" class="toc-affix">
      <vts-anchor [vtsOffsetTop]="87" [vtsAffix]="false" vtsShowInkInFixed>
        <vts-link vtsHref="#list-of-icons" vtsTitle="List of Icon"></vts-link>
        <vts-link vtsHref="#api" vtsTitle="API"></vts-link>
      </vts-anchor>
    </vts-affix>
    <div class="icon-container">
      <div class="list-manifest" vts-row>
        <div class="manifest-list" vts-col vtsFlex="140px">
          <div>Library:</div>
          <div
            class="manifest-item"
            [class.active]="item === typeName"
            *ngFor="let item of allTypes"
            (click)="onChangeType(item)"
          >
            {{ item }}
          </div>
          <br />
          <div>Color change:</div>
          <color-twitter
            [color]="iconColor"
            (onChangeComplete)="onColorChange($event)"
            width="140px"
            [colors]="['#ee0033', '#7BDCB5']"
          ></color-twitter>
        </div>
        <div class="manifest-content" vts-col vtsFlex="1">
          <vts-input-group class="search" [vtsSuffix]="suffixIconSearch">
            <input
              vts-input
              placeholder="Search icons"
              [(ngModel)]="searchInput"
              (ngModelChange)="onSearchChange()"
            />
            <ng-template #suffixIconSearch>
              <i vts-icon vtsType="Search"></i>
            </ng-template>
          </vts-input-group>
          <div class="content">
            <ul class="vtsicons-list">
              <li
                *ngFor="let icon of filteredIcons; trackBy: trackByFn"
                (click)="onIconClick($event, icon)"
              >
                <i
                  vts-icon
                  [vtsType]="icon + ':' + type"
                  style="color: var(--icon-demo-color--)"
                ></i>
                <span class="vtsicon-class">
                  <vts-badge>
                    {{ icon }}
                  </vts-badge>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    '[attr.style]': `'--icon-demo-color--:' + iconColor`
  }
})
export class VtsPageDemoIconEnComponent implements OnInit {
  iconColor: string = '#555';
  allIcons = {
    VTS: {
      content: VtsManifest,
      type: 'vts'
    },
    'Ant design': {
      content: AntdManifest,
      type: 'antd'
    },
    Bootstrap: {
      content: BootstrapManifest,
      type: 'bootstrap'
    },
    BoxIcons: {
      content: BoxIconManifest,
      type: 'boxIcon'
    },
    Circum: {
      content: CircumIconManifest,
      type: 'circumIcon'
    },
    Devicons: {
      content: DevIconManifest,
      type: 'devIcon'
    },
    Feather: {
      content: FeatherManifest,
      type: 'feather'
    },
    'Flat Color': {
      content: FlatColorManifest,
      type: 'flatColor'
    },
    'Font awesome': {
      content: FaManifest,
      type: 'fa'
    },
    GameIcon: {
      content: GameIconManifest,
      type: 'gameIcon'
    },
    'Github Octicons': {
      content: OctIconManifest,
      type: 'octIcon'
    },
    Heroicons: {
      content: HeroManifest,
      type: 'hero'
    },
    IcoMoon: {
      content: IcomoonManifest,
      type: 'icomoon'
    },
    'Material Design': {
      content: MatManifest,
      type: 'mat'
    },
    Radix: {
      content: RadixManifest,
      type: 'radix'
    },
    SimpleIcon: {
      content: SimpleIconManifest,
      type: 'simpleIcon'
    },
    'Simple line': {
      content: SimpleLineManifest,
      type: 'simpleLine'
    },
    Themify: {
      content: ThemifyManifest,
      type: 'themify'
    },
    TypIcon: {
      content: TypIconManifest,
      type: 'typIcon'
    },
    'VS Code': {
      content: VsManifest,
      type: 'vs'
    },
    Weather: {
      content: WeatherManifest,
      type: 'weather'
    },
    'css.gg': {
      content: CssggManifest,
      type: 'cssgg'
    }
  };
  allTypes = Object.keys(this.allIcons);

  icons: string[] = this.allIcons['VTS'].content.icons;
  filteredIcons = this.icons;
  type: string = this.allIcons['VTS'].type;
  _typeName: string = 'VTS';
  set typeName(value: string) {
    this._typeName = value;
    this.type = this.allIcons[value as keyof typeof this.allIcons].type;
    this.icons = this.allIcons[value as keyof typeof this.allIcons].content.icons;
    this.handleSearchChange();
  }
  get typeName() {
    return this._typeName;
  }

  searchInput = '';
  searchInput$ = new Subject<string>();

  trackByFn = (_index: number, item: string) => {
    return `${item}-${this.type}`;
  };

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i vts-icon vtsType="${icon}:${this.type}"></i>`;
    target.classList.add('copied');
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    });
  }

  onChangeType(type: string) {
    this.typeName = type;
  }

  onSearchChange() {
    this.searchInput$.next(this.searchInput);
  }

  handleSearchChange() {
    if (!this.searchInput) this.filteredIcons = this.icons;
    else
      this.filteredIcons = this.icons.filter(i =>
        i.toLowerCase().includes(this.searchInput.toLowerCase().trim())
      );
  }

  onColorChange(e: ColorEvent) {
    this.iconColor = e.color.hex;
  }

  private _copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
      let copyTextArea = null as any as HTMLTextAreaElement; // tslint:disable-line:no-any
      try {
        copyTextArea = this.dom.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        this.dom.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        this.dom.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    });

    return promise;
  }

  constructor(@Inject(DOCUMENT) private dom: any) {}

  ngOnInit(): void {
    this.searchInput$.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.handleSearchChange();
    });
  }
}
