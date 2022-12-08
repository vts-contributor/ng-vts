import { Component, QueryList, ViewChildren } from '@angular/core';
import { VtsCodeBoxComponent } from '../share/codebox/codebox.component';

@Component({
  selector     : 'vts-demo-{{component}}',
  preserveWhitespaces: false,
  templateUrl  : './{{language}}.html'
})
export class {{componentName}} {
  expanded = false;
  @ViewChildren(VtsCodeBoxComponent) codeBoxes!: QueryList<VtsCodeBoxComponent>;

  goLink(link: string): void {
    if (window) {
      window.location.hash = link;
    }
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => {
      code.vtsExpanded = this.expanded;
      code.expandCode(this.expanded);
      code.check();
    });
  }

}
