import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService, DemoCode } from '../../app.service';
import { OnlineIdeService } from '../../online-ide/online-ide.service';

@Component({
  selector: 'vts-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './codebox.component.html',
  styleUrls: ['./codebox.component.less']
})
export class VtsCodeBoxComponent implements OnInit, OnDestroy {
  highlightCode?: string;
  copied = false;
  commandCopied = false;
  showIframe: boolean = false;
  simulateIFrame: boolean = false;
  iframe?: SafeUrl;
  language = 'zh';
  theme = 'default';
  destroy$ = new Subject();
  codeLoaded = false;
  onlineIDELoading = false;
  copyLoading = false;
  @Input() vtsTitle!: string;
  @Input() vtsExpanded = false;
  @Input() vtsHref!: string;
  @Input() vtsLink!: string;
  @Input() vtsId!: string;
  @Input() vtsIframeHeight: number | null = 360;
  @Input() vtsComponentName = '';
  @Input() vtsSelector = '';
  @Input() vtsGenerateCommand = '';

  @Input()
  set vtsIframeSource(value: string) {
    this.showIframe = value !== 'null' && environment.production;
    this.simulateIFrame = value !== 'null' && !environment.production;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  navigateToFragment(): void {
    if (this.platform.isBrowser) {
      window.location.hash = this.vtsLink;
    }
  }

  copyCode(): void {
    setTimeout(() => {
      this.copyLoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.copyLoading = false;
      this.check();
      this.copy(data.rawCode).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
          this.check();
        }, 1000);
      });
    });
  }

  copyGenerateCommand(command: string): void {
    this.copy(command).then(() => {
      this.commandCopied = true;
      setTimeout(() => {
        this.commandCopied = false;
        this.check();
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
      // @ts-ignore
      let copyTextArea = null as HTMLTextAreaElement;
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

  expandCode(expanded: boolean): void {
    this.vtsExpanded = expanded;
    if (expanded) {
      this.getDemoCode().subscribe();
    }
  }

  openOnlineIDE(ide: 'StackBlitz' | 'CodeSandbox' = 'StackBlitz'): void {
    setTimeout(() => {
      this.onlineIDELoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.onlineIDELoading = false;
      this.check();
      if (ide === 'StackBlitz') {
        this.onlineIdeService.openOnStackBlitz(
          this.vtsComponentName,
          data.rawCode,
          this.vtsSelector
        );
      } else {
        this.onlineIdeService.openOnCodeSandbox(
          this.vtsComponentName,
          data.rawCode,
          this.vtsSelector
        );
      }
    });
  }

  check(): void {
    this.cdr.markForCheck();
  }

  // tslint:disable-next-line:no-any
  constructor(
    @Inject(DOCUMENT) private dom: any,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private appService: AppService,
    private platform: Platform,
    private onlineIdeService: OnlineIdeService
  ) {}

  ngOnInit(): void {
    this.appService.theme$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.theme = data;
      this.check();
    });
    this.appService.language$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.language = data;
      this.check();
    });
  }

  getDemoCode(): Observable<DemoCode> {
    return this.appService.getCode(this.vtsId).pipe(
      takeUntil(this.destroy$),
      tap(data => {
        if (data) {
          this.highlightCode = data.highlightCode;
          this.codeLoaded = true;
          this.check();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
