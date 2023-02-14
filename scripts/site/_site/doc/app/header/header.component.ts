import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VERSION } from '@ui-vts/ng-vts/version';
import { AppService } from '../app.service';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header id="header" class="clearfix">
      <div class="menu-row">
        <!--
        <div class="sidebar-toggle">
          <i (click)="toggleSidebar()" vts-icon vtsType="SubjectOutline"></i>
        </div>
        -->
        <ng-container [ngTemplateOutlet]="menu"></ng-container>
        <!--
        <div app-searchbar [language]="language" [responsive]="responsive" (focusChange)="onFocusChange($event)"></div>
        -->
      </div>

      <div
        id="sectionPopover"
        vts-popover
        #sectionPopover="vtsPopover"
        vtsPopoverTrigger="click"
        [vtsPopoverContent]="popoverTemplate"
        vtsPopoverOverlayClassName="sectionPopoverWrapper"
      >
        <i vts-icon vtsType="Bookmarks"></i>
      </div>
    </header>
    <ng-template #menu>
      <ng-container>
        <div [routerLink]="['/']" id="headerLogo"></div>

        <ng-container *ngIf="guidelineData?.whatsnew">
          <div (click)="navigateForGuideline(guidelineData.whatsnew.location)" id="whatsnew">
            {{ guidelineData.whatsnew.postTitle }}
          </div>
        </ng-container>

        <div id="navBarMenu">
          <ul>
            <li>
              <a
                *ngIf="!!guidelineUrl?.length"
                (click)="navigateForGuideline('')"
                href="javascript:void(0)"
                rel="noopener noreferrer"
              >
                Home
              </a>
            </li>
            <li *ngFor="let section of guidelineData.sections">
              <a
                (click)="navigateForGuideline(section.firstRoute)"
                href="javascript:void(0)"
                rel="noopener noreferrer"
              >
                {{ section.title }}
              </a>
            </li>
            <li
              *ngIf="!!platforms"
              vts-dropdown
              [vtsDropdownMenu]="dropdownMenu"
              class="active"
              [vtsOverlayStyle]="{ position: 'relative', width: '100%' }"
            >
              <a href="javascript:void(0)" rel="noopener noreferrer">
                Dev Framework
                <svg
                  style="margin-bottom: -3px"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill="currentColor"
                  width="1em"
                  height="1em"
                  data-icon="ArrowDownOutline"
                  aria-hidden="true"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </ng-container>
    </ng-template>

    <ng-template #popoverTemplate>
      <ul vts-menu>
        <li
          vts-menu-item
          *ngFor="let section of guidelineData.sections"
          (click)="navigateForGuideline(section.firstRoute)"
        >
          {{ section.title }}
        </li>
        <li
          *ngIf="!!platforms"
          vts-submenu
          vtsTitle="Dev Framework"
          vtsMenuClassName="sectionPopoverSubmenuWrapper"
        >
          <ul>
            <li
              *ngFor="let item of platforms!"
              [vtsSelected]="!!item.name.startsWith('_')"
              vts-menu-item
              (click)="navigate(item); sectionPopover.hide()"
            >
              {{ formatName(item.name) }}
            </li>
          </ul>
        </li>
      </ul>
    </ng-template>

    <vts-dropdown-menu #dropdownMenu="vtsDropdownMenu">
      <ul *ngIf="!!platforms" vts-menu>
        <li
          *ngFor="let item of platforms"
          [vtsSelected]="!!item.name.startsWith('_')"
          vts-menu-item
          (click)="navigate(item); sectionPopover.hide()"
        >
          {{ formatName(item.name) }}
        </li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class HeaderComponent implements OnChanges, OnInit {
  @Input() language: 'zh' | 'en' = 'zh';
  @Input() windowWidth = 1400;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'components';
  @Input() sidebarCollapse = true;
  @Output() versionChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<'zh' | 'en'>();
  @Output() directionChange = new EventEmitter<'ltr' | 'rtl'>();
  @Output() sidebarCollapseChange = new EventEmitter();

  searching = false;
  isMobile = false;
  mode = 'horizontal';
  responsive: null | 'narrow' | 'crowded' = null;
  oldVersionList = ['10.2.x', '9.3.x', '8.5.x', '7.5.x', '1.8.x', '0.7.x', '0.5.x'];
  currentVersion = VERSION.full;
  nextDirection: 'ltr' | 'rtl' = 'rtl';

  guidelineData: {
    routes: any[];
    sections: any[];
    whatsnew: any;
  } = {
    routes: [],
    sections: [],
    whatsnew: null
  };

  platforms?: { name: string; url?: string }[];
  guidelineUrl = '';

  constructor(
    private vtsConfigService: VtsConfigService,
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private message: VtsMessageService
  ) {}
  onChangeVersion(version: string): void {
    this.versionChange.emit(version);
  }

  onFocusChange(focus: boolean): void {
    this.searching = focus;
  }

  onChangeLanguage(language: 'en' | 'zh'): void {
    this.languageChange.emit(language);
  }

  toggleDirection(): void {
    this.directionChange.emit(this.nextDirection);
    this.vtsConfigService.set('modal', { vtsDirection: this.nextDirection });
    this.vtsConfigService.set('drawer', { vtsDirection: this.nextDirection });
    this.vtsConfigService.set('message', { vtsDirection: this.nextDirection });
    this.vtsConfigService.set('toast', { vtsDirection: this.nextDirection });
    this.vtsConfigService.set('image', { vtsDirection: this.nextDirection });
    if (this.nextDirection === 'rtl') {
      this.nextDirection = 'ltr';
    } else {
      this.nextDirection = 'rtl';
    }
  }

  toggleSidebar() {
    this.sidebarCollapse = !this.sidebarCollapse;
    this.sidebarCollapseChange.emit(this.sidebarCollapse);
  }

  updateResponsive(): void {
    this.responsive = null;
    this.isMobile = this.windowWidth <= 768;

    if (this.isMobile) {
      this.sidebarCollapse = true;
      this.sidebarCollapseChange.emit(this.sidebarCollapse);
    }

    if (this.windowWidth < RESPONSIVE_XS) {
      // this.responsive = 'crowded';
    } else if (this.windowWidth < RESPONSIVE_SM) {
      // this.responsive = 'narrow';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { windowWidth } = changes;
    if (windowWidth) {
      this.updateResponsive();
    }
  }

  ngOnInit() {
    this.appService.fetchEnvironment().subscribe(
      (data: any) => {
        let guidelineUrl = '';
        if ([!!data?.guidelineUrl, !!data?.guidelineDomain].every(i => i)) {
          const hostName = window.location.hostname;
          if (/^([0-9]+(\.|$)){4}/.test(hostName)) guidelineUrl = data?.guidelineUrl;
          else guidelineUrl = data?.guidelineDomain;
        } else {
          guidelineUrl = data?.link ?? data?.linkDomain;
        }
        this.guidelineUrl = guidelineUrl;

        const platforms = data.platform;
        if (!!platforms?.length) {
          this.platforms = platforms;
        }
      },
      err => {
        console.error(err);
      }
    );
    this.appService.fetchGuidelineInfo().subscribe(
      (data: any) => {
        const routes = data?.routes || [];
        const sections = data?.sections || [];
        const whatsnew = data?.whatsnew || null;
        this.guidelineData = {
          routes,
          sections,
          whatsnew
        };
        this.cdr.markForCheck();
      },
      err => {
        console.error(err);
      }
    );
  }

  formatName(item: any) {
    return item.replace('_', '');
  }

  navigateForGuideline(path: string) {
    const baseUrl = new URL(this.guidelineUrl);
    const guidelineLoc = baseUrl.origin + (baseUrl.pathname != '/' ? baseUrl.pathname : '');
    const destinate = [guidelineLoc, path].join('');
    window.location.assign(destinate);
  }

  navigate(platform: any) {
    if (platform.name.startsWith('_')) return;

    let openLink = '';
    if ([!!platform?.link, !!platform?.linkDomain].every(i => i)) {
      const hostName = window.location.hostname;
      if (/^([0-9]+(\.|$)){4}/.test(hostName)) openLink = platform?.link;
      else openLink = platform?.linkDomain;
    } else {
      openLink = platform?.link ?? platform?.linkDomain;
    }

    if (!!openLink?.link?.length) {
      window.location.assign(openLink);
    } else {
      this.showProcessing();
    }
  }

  showProcessing() {
    this.message.warning('The framework is under development.');
  }
}
