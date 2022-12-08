import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'vts-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="language-angular"><code [innerHTML]="code"></code></pre>
  `
})
export class VtsHighlightComponent implements OnInit {
  code: SafeHtml | string = '';
  @ViewChild('code', { static: true }) codeElement!: ElementRef;
  @Input() vtsLanguage?: string;

  @Input()
  get vtsCode(): string | SafeHtml {
    return this.code || '';
  }

  set vtsCode(value: string | SafeHtml) {
    this.code = this.sanitizer.bypassSecurityTrustHtml(value as string);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
