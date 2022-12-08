import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-list-simple',
  template: `
    <h3 [ngStyle]="{ 'margin-bottom.px': 16 }">Default Size</h3>
    <vts-list vtsBordered vtsHeader="Header" vtsFooter="Footer">
      <vts-list-item *ngFor="let item of data">
        <span><mark>[ITEM]</mark></span>
        {{ item }}
      </vts-list-item>
    </vts-list>

    <h3 [ngStyle]="{ margin: '16px 0' }">Small Size</h3>
    <vts-list vtsBordered vtsSize="sm">
      <vts-list-header>Header</vts-list-header>
      <vts-list-item *ngFor="let item of data">item</vts-list-item>
      <vts-list-footer>Footer</vts-list-footer>
    </vts-list>

    <h3 [ngStyle]="{ margin: '16px 0' }">Large Size</h3>
    <ul vts-list [vtsDataSource]="data" vtsBordered vtsSize="lg">
      <vts-list-header>Header</vts-list-header>
      <li vts-list-item *ngFor="let item of data" vtsNoFlex>
        <ul vts-list-item-actions>
          <vts-list-item-action>
            <a (click)="msg.info('edit')">edit</a>
          </vts-list-item-action>
        </ul>
        {{ item }}
      </li>
      <vts-list-footer>Footer</vts-list-footer>
    </ul>
  `
})
export class VtsDemoListSimpleComponent {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  constructor(public msg: VtsMessageService) {}
}
