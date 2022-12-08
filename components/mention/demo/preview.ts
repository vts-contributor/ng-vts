import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'vts-demo-mention-preview',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-tabset>
      <vts-tab vtsTitle="Write">
        <vts-mention [vtsSuggestions]="suggestions">
          <textarea
            vts-input
            [vtsAutosize]="{ minRows: 4, maxRows: 4 }"
            [(ngModel)]="inputValue"
            (ngModelChange)="renderPreView()"
            vtsMentionTrigger
          ></textarea>
        </vts-mention>
      </vts-tab>
      <vts-tab vtsTitle="Preview">
        <pre [innerHTML]="preview"></pre>
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoMentionPreviewComponent {
  inputValue: string = 'Switch tab view preview @NG-VTS ';
  preview?: SafeHtml;
  suggestions = ['NG-VTS', 'angular', 'Reactive-Extensions'];

  constructor(private sanitizer: DomSanitizer) {
    this.renderPreView();
  }

  getRegExp(prefix: string | string[]): RegExp {
    const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

    if (prefixArray.length > 1) {
      prefixToken = `[${prefixToken}]`;
    }

    return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
  }

  renderPreView(): void {
    if (this.inputValue) {
      const regex = this.getRegExp('@');
      const previewValue = this.inputValue.replace(
        regex,
        match =>
          `<a target="_blank" href="https://github.com/${match.trim().substring(1)}">${match}</a>`
      );
      this.preview = this.sanitizer.bypassSecurityTrustHtml(previewValue);
    }
  }
}
