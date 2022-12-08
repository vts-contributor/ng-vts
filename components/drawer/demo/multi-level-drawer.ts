import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-drawer-multi-level-drawer',
  template: `
    <button vts-button vtsType="primary" (click)="open()">New Cookbook</button>
    <vts-drawer
      [vtsClosable]="false"
      [vtsOffsetX]="childrenVisible ? 180 : 0"
      [vtsWidth]="320"
      [vtsVisible]="visible"
      vtsTitle="Cookbook"
      (vtsOnClose)="close()"
    >
      <form *vtsDrawerContent vts-form>
        <div vts-row>
          <div vts-col vtsSpan="24">
            <vts-form-item>
              <vts-form-label>Name</vts-form-label>
              <vts-form-control>
                <input vts-input placeholder="please enter cookbook name" />
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
        <div vts-row>
          <div vts-col vtsSpan="24">
            <vts-form-item>
              <vts-form-label>Food</vts-form-label>
              <vts-form-control>
                <vts-tag>potato</vts-tag>
                <vts-tag>eggplant</vts-tag>
                <vts-tag (click)="openChildren()">+</vts-tag>
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
      </form>
      <vts-drawer
        [vtsClosable]="false"
        [vtsVisible]="childrenVisible"
        vtsTitle="Food"
        (vtsOnClose)="closeChildren()"
      >
        <vts-list *vtsDrawerContent [vtsDataSource]="vegetables" [vtsRenderItem]="item">
          <ng-template #item let-item>
            <vts-list-item [vtsContent]="item"></vts-list-item>
          </ng-template>
        </vts-list>
      </vts-drawer>
    </vts-drawer>
  `
})
export class VtsDemoDrawerMultiLevelDrawerComponent {
  visible = false;
  childrenVisible = false;

  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }
}
