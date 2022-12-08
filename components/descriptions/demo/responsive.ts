import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-descriptions-responsive',
  template: `
    <vts-descriptions
      vtsTitle="Responsive Descriptions"
      vtsBordered
      [vtsColumn]="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
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
  `
})
export class VtsDemoDescriptionsResponsiveComponent {}
