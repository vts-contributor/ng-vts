import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-descriptions-vertical',
  template: `
    <vts-descriptions vtsTitle="User Info" vtsLayout="vertical">
      <vts-descriptions-item vtsTitle="UserName">Zhou Maomao</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Telephone">1810000000</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Live">Hangzhou, Zhejiang</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Address" [vtsSpan]="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Remark">empty</vts-descriptions-item>
    </vts-descriptions>
  `
})
export class VtsDemoDescriptionsVerticalComponent {}
