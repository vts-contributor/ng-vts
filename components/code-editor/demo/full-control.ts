import { Component } from '@angular/core';
import { editor } from 'monaco-editor';

// tslint:disable-next-line no-any
declare const monaco: any;

@Component({
  selector: 'vts-demo-code-editor-full-control',
  template: `
    <vts-code-editor
      class="editor"
      [vtsFullControl]="true"
      (vtsEditorInitialized)="onEditorInit($event)"
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
export class VtsDemoCodeEditorFullControlComponent {
  editor?: editor.ICodeEditor | editor.IEditor;

  code = `import { VtsCodeEditorModule } from '@ui-vts/ng-vts/code-editor'

@Component({})
export class SomeComponent {}`;

  onEditorInit(e: editor.ICodeEditor | editor.IEditor): void {
    this.editor = e;
    this.editor.setModel(
      monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript')
    );
  }
}
