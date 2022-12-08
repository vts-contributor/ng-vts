/* declarations: VtsDrawerCustomComponent */

import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { VtsDrawerRef, VtsDrawerService } from '@ui-vts/ng-vts/drawer';

@Component({
  selector: 'vts-demo-drawer-service',
  template: `
    <ng-template #drawerTemplate let-data let-drawerRef="drawerRef">
      value: {{ data?.value }}
      <br />
      <button vts-button vtsType="primary" (click)="drawerRef.close()">close</button>
    </ng-template>
    <div vts-form>
      <vts-form-item>
        <input vts-input [(ngModel)]="value" />
      </vts-form-item>
    </div>
    <button vts-button vtsType="primary" (click)="openTemplate()">Use Template</button>
    &nbsp;
    <button vts-button vtsType="primary" (click)="openComponent()">Use Component</button>
  `
})
export class VtsDemoDrawerServiceComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: VtsDrawerRef<string>;
  }>;
  value = 'ng';

  constructor(private drawerService: VtsDrawerService) {}

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      vtsTitle: 'Template',
      vtsFooter: 'Footer',
      vtsContent: this.drawerTemplate,
      vtsContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<
      VtsDrawerCustomComponent,
      { value: string },
      string
    >({
      vtsTitle: 'Component',
      vtsContent: VtsDrawerCustomComponent,
      vtsContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}

@Component({
  selector: 'vts-drawer-custom-component',
  template: `
    <div>
      <input vts-input [(ngModel)]="value" />
      <vts-divider></vts-divider>
      <button vtsType="primary" (click)="close()" vts-button>Confirm</button>
    </div>
  `
})
export class VtsDrawerCustomComponent {
  @Input() value = '';

  constructor(private drawerRef: VtsDrawerRef<string>) {}

  close(): void {
    this.drawerRef.close(this.value);
  }
}
