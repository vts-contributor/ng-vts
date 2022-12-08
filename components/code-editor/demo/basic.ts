import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-code-editor-basic',
  template: `
    <vts-code-editor
      class="editor"
      [ngModel]="code"
      [vtsEditorOption]="{ language: 'typescript' }"
    ></vts-code-editor>
  `,
  styles: [
    `
      .editor {
        height: 200px;
      }
    `
  ]
})
export class VtsDemoCodeEditorBasicComponent {
  code = `import { VtsCodeEditorModule } from '@ui-vts/ng-vts/code-editor'

@Component({})
export class SomeComponent {}`;
}
