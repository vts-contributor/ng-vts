import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-descriptions-basic',
  template: `
    <vts-descriptions vtsTitle="User Info">
      <vts-descriptions-item vtsTitle="UserName">Zhou Maomao</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Telephone">18100000000</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Live">Hangzhou, Zhejiang</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Remark">Empty</vts-descriptions-item>
      <vts-descriptions-item vtsTitle="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </vts-descriptions-item>
    </vts-descriptions>
  `
})
export class VtsDemoDescriptionsBasicComponent {}
