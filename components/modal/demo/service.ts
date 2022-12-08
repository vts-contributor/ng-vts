/* declarations: VtsModalCustomComponent */

import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { VtsModalRef, VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-service',
  template: `
    <button vts-button vtsType="primary" (click)="createModal()">
      <span>String</span>
    </button>

    <button vts-button vtsType="primary" (click)="createTplModal(tplTitle, tplContent, tplFooter)">
      <span>Template</span>
    </button>
    <ng-template #tplTitle>
      <span>Title Template</span>
    </ng-template>
    <ng-template #tplContent let-params>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>{{ params.value }}</p>
    </ng-template>
    <ng-template #tplFooter let-ref="modalRef">
      <button vts-button (click)="ref.destroy()">Destroy</button>
      <button
        vts-button
        vtsType="primary"
        (click)="destroyTplModal(ref)"
        [vtsLoading]="tplModalButtonLoading"
      >
        Close after submit
      </button>
    </ng-template>

    <br />
    <br />

    <button vts-button vtsType="primary" (click)="createComponentModal()">
      <span>Use Component</span>
    </button>

    <button vts-button vtsType="primary" (click)="createCustomButtonModal()">Custom Button</button>

    <br />
    <br />

    <button vts-button vtsType="primary" (click)="openAndCloseAll()">
      Open more modals then close all after 2s
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoModalServiceComponent {
  tplModalButtonLoading = false;
  disabled = false;

  constructor(private modal: VtsModalService, private viewContainerRef: ViewContainerRef) {}

  createModal(): void {
    this.modal.create({
      vtsTitle: 'Modal Title',
      vtsContent: 'string, will close after 1 sec',
      vtsClosable: false,
      vtsOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>
  ): void {
    this.modal.create({
      vtsTitle: tplTitle,
      vtsContent: tplContent,
      vtsFooter: tplFooter,
      vtsMaskClosable: false,
      vtsClosable: false,
      vtsComponentParams: {
        value: 'Template Context'
      },
      vtsOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(modelRef: VtsModalRef): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      modelRef.destroy();
    }, 1000);
  }

  createComponentModal(): void {
    const modal = this.modal.create({
      vtsTitle: 'Modal Title',
      vtsContent: VtsModalCustomComponent,
      vtsViewContainerRef: this.viewContainerRef,
      vtsComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      vtsOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      vtsFooter: [
        {
          label: 'change component title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'title in inner component is changed';
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  createCustomButtonModal(): void {
    const modal: VtsModalRef = this.modal.create({
      vtsTitle: 'custom button demo',
      vtsContent: 'pass array of button config to vtsFooter to create multiple buttons',
      vtsFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () =>
            this.modal.confirm({
              vtsTitle: 'Confirm Modal Title',
              vtsContent: 'Confirm Modal Content'
            })
        },
        {
          label: 'Change Button Status',
          type: 'primary',
          danger: true,
          loading: false,
          onClick(): void {
            this.loading = true;
            setTimeout(() => (this.loading = false), 1000);
            setTimeout(() => {
              this.loading = false;
              this.disabled = true;
              this.label = 'can not be clicked！';
            }, 2000);
          }
        },
        {
          label: 'async load',
          type: 'dashed',
          onClick: () => new Promise(resolve => setTimeout(resolve, 2000))
        }
      ]
    });
  }

  openAndCloseAll(): void {
    let pos = 0;

    ['create', 'info', 'success', 'error'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        vtsMask: false,
        vtsTitle: `Test ${method} title`,
        vtsContent: `Test content: <b>${method}</b>`,
        vtsStyle: {
          position: 'absolute',
          top: `${pos * 70}px`,
          left: `${pos++ * 300}px`
        }
      })
    );

    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));

    setTimeout(() => this.modal.closeAll(), 2000);
  }
}

@Component({
  selector: 'vts-modal-custom-component',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <h4>{{ subtitle }}</h4>
      <p>
        <span>Get Modal instance in component</span>
        <button vts-button [vtsType]="'primary'" (click)="destroyModal()">
          destroy modal in the component
        </button>
      </p>
    </div>
  `
})
export class VtsModalCustomComponent {
  @Input() title?: string;
  @Input() subtitle?: string;

  constructor(private modal: VtsModalRef) {}

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }
}
