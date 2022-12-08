import { Component } from '@angular/core';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';

@Component({
  selector: 'vts-demo-code-editor-config',
  template: `
    <p vts-paragraph style="margin-bottom: 8px;">
      Change Theme
      <vts-switch
        [ngModel]="dark"
        (ngModelChange)="onDarkModeChange($event)"
        [vtsUnCheckedChildren]="unchecked"
        [vtsCheckedChildren]="checked"
      ></vts-switch>
    </p>
    <ng-template #unchecked>
      <i vts-icon vtsType="bulb"></i>
    </ng-template>
    <ng-template #checked>
      <i vts-icon vtsType="SettingsPower"></i>
    </ng-template>
    <vts-code-editor
      style="height: 200px"
      [ngModel]="code"
      [vtsEditorOption]="{ language: 'markdown' }"
    ></vts-code-editor>
  `
})
export class VtsDemoCodeEditorConfigComponent {
  dark = false;

  code = `**All monaco editor instances on the same page always have the same color. It's a by-design of monaco editor.**

You can refer to [this issue](https://github.com/Microsoft/monaco-editor/issues/338).`;

  constructor(private vtsConfigService: VtsConfigService) {}

  onDarkModeChange(dark: boolean): void {
    this.dark = dark;
    const defaultEditorOption =
      this.vtsConfigService.getConfigForComponent('codeEditor')?.defaultEditorOption || {};
    this.vtsConfigService.set('codeEditor', {
      defaultEditorOption: {
        ...defaultEditorOption,
        theme: dark ? 'vs-dark' : 'vs'
      }
    });
  }
}
