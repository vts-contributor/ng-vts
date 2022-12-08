import { Component } from '@angular/core';
import { VtsDescriptionsSize } from '@ui-vts/ng-vts/descriptions';

@Component({
  selector: 'vts-demo-descriptions-custom-size',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio vtsValue="default">default</label>
      <label vts-radio vtsValue="middle">middle</label>
      <label vts-radio vtsValue="small">small</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-descriptions vtsTitle="Custom Size" [vtsExtra]="extraTpl" vtsBordered [vtsSize]="size">
      <vts-descriptions-item vtsTitle="Product">Cloud Database</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Billing">Prepaid</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="time">18:00:00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Amount">$80.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Discount">$20.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Official">$60.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication_factor:3
        <br />
        Region: East China 1
        <br />
      </vts-descriptions-item>
    </vts-descriptions>
    <br />
    <br />
    <vts-descriptions vtsTitle="Custom Size" [vtsSize]="size" [vtsExtra]="extraTpl">
      <vts-descriptions-item vtsTitle="Product">Cloud Database</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Billing">Prepaid</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Time">18:00:00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Amount">$80.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Discount">$20.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Official">$60.00</vts-descriptions-item>
    </vts-descriptions>
    <ng-template #extraTpl>
      <button vts-button vtsType="primary">Edit</button>
    </ng-template>
  `
})
export class VtsDemoDescriptionsCustomSizeComponent {
  size: VtsDescriptionsSize = 'default';
}
