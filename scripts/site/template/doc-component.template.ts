import { Component } from '@angular/core';

@Component({
  selector     : 'vts-doc-{{component}}-{{language}}',
  templateUrl  : './{{component}}-{{language}}.html',
  preserveWhitespaces: false
})
export class VtsDoc{{componentName}}Component {
  goLink(link: string) {
    if (window) {
      window.location.hash = link;
    }
  }
}
