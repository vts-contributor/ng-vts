import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { manifest, ThemeType } from '@ui-vts/icons-angular';

const newIconNames: string[] = [];

@Component({
  selector: 'vts-page-demo-icon',
  template: `
    <vts-affix [vtsOffsetTop]="87" class="toc-affix">
      <vts-anchor [vtsOffsetTop]="87" [vtsAffix]="false" vtsShowInkInFixed>
        <vts-link vtsHref="#list-of-icons" vtsTitle="List of Icon"></vts-link>
        <vts-link vtsHref="#api" vtsTitle="API"></vts-link>
      </vts-anchor>
    </vts-affix>
    <div [attr.data-filter]="currentFilter" class="icon-selector">
      <vts-radio-group
        id="radioGroup"
        [ngModel]="currentFilter"
        (ngModelChange)="setIconsShouldBeDisplayed($event)"
      >
        <label vts-radio-button vtsValue="Shape">
          <i vts-icon>
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
              width="1em"
              height="1em"
              data-icon="Layer"
              aria-hidden="true"
            >
              <path
                d="M12.6 18.06a1 1 0 01-1.23 0l-6.15-4.78a1 1 0 00-1.22 0 1 1 0 000 1.57l6.76 5.26c.72.56 1.73.56 2.46 0l6.76-5.26a1 1 0 000-1.57l-.01-.01a1 1 0 00-1.22 0l-6.15 4.79zm.63-3.02l6.76-5.26a1 1 0 000-1.58l-6.76-5.26a2.01 2.01 0 00-2.46 0L4.01 8.21a1 1 0 000 1.58l6.76 5.26a2 2 0 002.46-.01z"
              ></path>
            </svg>
          </i>
          Shape
        </label>
        <label vts-radio-button vtsValue="Line">
          <i vts-icon>
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
              width="1em"
              height="1em"
              data-icon="AssignmentOutline"
              aria-hidden="true"
            >
              <path
                d="M7 15h7v2H7v-2zm0-4h10v2H7v-2zm0-4h10v2H7V7zm12-4h-4.18A3.01 3.01 0 0012 1c-1.3 0-2.4.84-2.82 2H5a2 2 0 00-2 2v14a2.05 2.05 0 00.59 1.42 2 2 0 001.01.55c.13.02.26.03.4.03h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75a.76.76 0 01-.75-.75c0-.41.34-.75.75-.75zM19 19H5V5h14v14z"
              ></path>
            </svg>
          </i>
          Line
        </label>
        <label vts-radio-button vtsValue="Doutone">
          <i vts-icon>
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
              width="1em"
              height="1em"
              data-icon="ChromeReaderModeDoutone"
              aria-hidden="true"
            >
              <path d="M3 6h8v13H3V6z" opacity=".3"></path>
              <path
                d="M21 4H3a2 2 0 00-2 2v13c0 1.1.9 2 2 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM11 19H3V6h8v13zm10 0h-8V6h8v13zm-7-9.5h6V11h-6V9.5zm0 2.5h6v1.5h-6V12zm0 2.5h6V16h-6v-1.5z"
              ></path>
            </svg>
          </i>
          Doutone
        </label>
      </vts-radio-group>
      <vts-input-group [vtsSuffix]="suffixIconSearch">
        <input
          vts-input
          [placeholder]="localeObj.search"
          [(ngModel)]="searchingString"
          (ngModelChange)="onSearchChange()"
        />
      </vts-input-group>
      <ng-template #suffixIconSearch>
        <i vts-icon vtsType="Search"></i>
      </ng-template>
    </div>
    <ng-container *ngFor="let category of categoryNames; let i = index">
      <h3>{{ localeObj[category] }}</h3>
      <ul [attr.data-filter]="currentFilter" class="vtsicons-list">
        <li
          *ngFor="let icon of displayedNames[i].icons; trackBy: trackByFn"
          (click)="onIconClick($event, icon)"
        >
          <i vts-icon [vtsType]="icon"></i>
          <span class="vtsicon-class">
            <vts-badge *ngIf="isNewIcon(icon); else notNewTpl" vtsDot>
              {{ icon }}
            </vts-badge>
            <ng-template #notNewTpl>
              {{ icon }}
            </ng-template>
          </span>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [
    `
      h3 {
        margin: 1.6em 0 0.6em;
        font-size: 18px;
      }
    `,
    `
      ul.vtsicons-list li .vtsicon {
        font-size: 24px;
      }
    `,
    `
      .icon-selector {
        display: flex;
        justify-content: space-between;
      }

      vts-input-group {
        margin-left: 10px;
        flex: 1 1 0%;
      }
    `,
    `
      [data-filter='Shape'] li:not(:hover) .vtsicon {
        color: #ee0033;
      }

      [data-filter='Line'] li:not(:hover) .vtsicon {
        color: #ee0033;
      }

      [data-filter='Doutone'] li:not(:hover) .vtsicon {
        color: #8f9294;
      }
    `,
    `
      #radioGroup .vts-radio-button-wrapper {
        padding: 10px;
        line-height: 1;
        background: white;
        color: #000;
        width: 105px;
        font-weight: 400;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-color: #d1d1d1 !important;
        white-space: nowrap;
      }

      #radioGroup .vts-radio-button-wrapper::before {
        background: #d1d1d1 !important;
      }

      #radioGroup .vts-radio-button-wrapper:not(.vts-radio-button-wrapper-checked):hover {
        background: #e9e9e9;
        font-weight: 600;
        color: #000;
      }

      #radioGroup .vts-radio-button-wrapper-checked:not(.vts-radio-button-wrapper-disabled) {
        background: #192e35;
        color: white;
        font-weight: 600;
        border-color: transparent !important;
      }

      #radioGroup .vts-radio-button-wrapper-checked:not(.vts-radio-button-wrapper-disabled):hover {
        background: #192e35;
        color: white;
        font-weight: 600;
        border-color: transparent !important;
      }

      #radioGroup
        .vts-radio-button-wrapper-checked:not(.vts-radio-button-wrapper-disabled)::before {
        background: transparent !important;
      }
    `
  ]
})
export class VtsPageDemoIconEnComponent implements OnInit {
  displayedNames: Array<{ name: string; icons: string[] }> = [];
  categoryNames: string[] = [];
  currentTheme: ThemeType = 'all';
  currentFilter: string = 'Shape';
  localeObj: { [key: string]: string } = {
    direction: 'Directional Icons',
    suggestion: 'Suggested Icons',
    edit: 'Editor Icons',
    data: 'Data Icons',
    other: 'Application Icons',
    logo: 'Brand and Logos',
    search: 'Search icon here. Click icon to copy code.'
  };

  searchingString = '';

  trackByFn = (_index: number, item: string) => {
    return `${item}-${this.currentTheme}`;
  };

  isNewIcon = (name: string) => {
    return newIconNames.indexOf(name) > -1;
  };

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i vts-icon vtsType="${icon}"></i>`;
    target.classList.add('copied');
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    });
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

  prepareIcons(): void {
    const theme = this.currentTheme;
    const filter = this.currentFilter;
    const search = this.searchingString;

    let icons: string[] = [];
    switch (filter) {
      case 'Shape':
        icons = manifest[theme].filter(
          name => !name.endsWith('Outline') && !name.endsWith('Doutone')
        );
        break;
      case 'Line':
        icons = manifest[theme].filter(name => name.endsWith('Outline'));
        break;
      case 'Doutone':
        icons = manifest[theme].filter(name => name.endsWith('Doutone'));
        break;
    }

    if (search) icons = icons.filter(name => name.toUpperCase().includes(search.toUpperCase()));
    this.displayedNames = [{ name: filter, icons: icons }];
    this.categoryNames = [filter];
  }

  setIconsShouldBeDisplayed(filter: string): void {
    this.currentFilter = filter;
    this.prepareIcons();
  }

  onSearchChange(): void {
    this.prepareIcons();
  }

  // tslint:disable-next-line:no-any
  constructor(@Inject(DOCUMENT) private dom: any) {}

  ngOnInit(): void {
    this.setIconsShouldBeDisplayed('Shape');
  }
}
