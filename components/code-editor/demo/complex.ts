import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { VtsCodeEditorComponent } from '@ui-vts/ng-vts/code-editor';
import { VtsTooltipDirective } from '@ui-vts/ng-vts/tooltip';

@Component({
  selector: 'vts-demo-code-editor-complex',
  template: `
    <p vts-paragraph style="margin-bottom: 8px;">
      Loading
      <vts-switch [(ngModel)]="loading"></vts-switch>
    </p>
    <vts-code-editor
      class="editor"
      [class.full-screen]="fullScreen"
      [ngModel]="code"
      [vtsLoading]="loading"
      [vtsToolkit]="toolkit"
      [vtsEditorOption]="{ language: 'javascript' }"
    ></vts-code-editor>
    <ng-template #toolkit>
      <i
        vts-icon
        [class.active]="fullScreen"
        vts-tooltip
        vtsTooltipTitle="Toggle Fullscreen"
        [vtsType]="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
        (click)="toggleFullScreen()"
      ></i>
    </ng-template>
  `,
  styles: [
    `
      .editor {
        height: 200px;
      }

      .full-screen {
        position: fixed;
        z-index: 999;
        height: 100vh;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }
    `
  ]
})
export class VtsDemoCodeEditorComplexComponent {
  @ViewChild(VtsCodeEditorComponent, { static: false })
  editorComponent?: VtsCodeEditorComponent;
  @ViewChild(VtsTooltipDirective, { static: false })
  tooltip?: VtsTooltipDirective;

  loading = true;
  fullScreen = false;
  code = `function flatten(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('The parameter must be an array.');
  }

  function partial(arr_) {
    return arr_.reduce((previous, current) => {
      if (current instanceof Array) {
        previous.push(...partial(current));
        return previous;
      } else {
        previous.push(current);
        return previous;
      }
    }, []);
  }

  return partial(arr);
}

console.log(flatten(['1', 2, [[3]]]))`;
  private document: Document;

  // tslint:disable-next-line no-any
  constructor(@Inject(DOCUMENT) document: any, private renderer: Renderer2) {
    this.document = document;
  }

  toggleFullScreen(): void {
    this.fullScreen = !this.fullScreen;
    this.renderer.setStyle(this.document.body, 'overflow-y', this.fullScreen ? 'hidden' : null);
    this.editorComponent?.layout();
    this.tooltip?.hide();
  }
}
