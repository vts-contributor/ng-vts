import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-code-editor-diff',
  template: `
    <vts-code-editor
      class="editor"
      [vtsOriginalText]="originalCode"
      [vtsEditorMode]="'diff'"
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
export class VtsDemoCodeEditorDiffComponent {
  originalCode = `import { VtsCodeEditorModule } from '@ui-vts/ng-vts/code-editor';

@Component({})
export class SomeComponent {}`;

  code = `import { VtsCodeEditorModule } from '@ui-vts/ng-vts/code-editor';

@Component({})
export class SomeComponent {}`;
}
