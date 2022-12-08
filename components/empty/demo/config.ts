import { Component, TemplateRef, ViewChild } from '@angular/core';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';

@Component({
  selector: 'vts-demo-empty-config',
  template: `
    <vts-switch
      [vtsUnCheckedChildren]="'default'"
      [vtsCheckedChildren]="'customize'"
      [(ngModel)]="customize"
      (ngModelChange)="onConfigChange()"
    ></vts-switch>

    <vts-divider></vts-divider>

    <h3>Select</h3>
    <vts-select style="width: 200px"></vts-select>

    <h3>TreeSelect</h3>
    <vts-tree-select style="width: 200px;"></vts-tree-select>

    <h3>Cascader</h3>
    <vts-cascader style="width: 200px;" [vtsShowSearch]="true" [vtsOptions]="[]"></vts-cascader>

    <h3>Transfer</h3>
    <vts-transfer></vts-transfer>

    <h3>Table</h3>
    <vts-table [vtsData]="[]">
      <thead>
        <tr>
          <th>Title</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody></tbody>
    </vts-table>

    <h3>List</h3>
    <vts-list [vtsDataSource]="[]"></vts-list>

    <ng-template #customTpl let-name>
      <div style="text-align: center;">
        <i vts-icon vtsType="Face" style="font-size: 20px;"></i>
        <p>Data Not Found in {{ name }}</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      h3 {
        font-size: inherit;
        margin: 16px 0 8px 0;
      }
    `
  ]
})
export class VtsDemoEmptyConfigComponent {
  @ViewChild('customTpl', { static: false }) customTpl?: TemplateRef<any>; // tslint:disable-line:no-any

  customize = false;

  constructor(private vtsConfigService: VtsConfigService) {}

  onConfigChange(): void {
    if (this.customize) {
      this.vtsConfigService.set('empty', {
        vtsDefaultEmptyContent: this.customTpl
      });
    } else {
      this.vtsConfigService.set('empty', { vtsDefaultEmptyContent: undefined });
    }
  }
}
