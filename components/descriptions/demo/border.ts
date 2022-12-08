import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-descriptions-border',
  template: `
    <vts-descriptions vtsTitle="User Info" vtsBordered>
      <vts-descriptions-item vtsTitle="Product">Cloud Database</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Billing Mode">Prepaid</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Automatic Renewal">YES</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Order Time">2018-04-24 18:00:00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Usage Time" [vtsSpan]="2">
        2018-04-24 18:00:00 To 2019-04-24 18:00:00
      </vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Status" [vtsSpan]="3">
        <vts-badge vtsStatus="processing" vtsText="Running"></vts-badge>
      </vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Negotiated Amount">$80.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Discount">$20.00</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Official Receipts">$60.00</vts-descriptions-item>
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
export class VtsDemoDescriptionsBorderComponent {}
