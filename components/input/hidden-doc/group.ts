import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-group',
  template: `
    <vts-input-group [vtsSize]="'lg'">
      <div vts-row [vtsGutter]="8">
        <div vts-col vtsSpan="5">
          <input type="text" vts-input [ngModel]="'0571'" />
        </div>
        <div vts-col vtsSpan="8">
          <input type="text" vts-input [ngModel]="'26888888'" />
        </div>
      </div>
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <input type="text" vts-input [ngModel]="'0571'" style="width: 20%;" />
      <input type="text" vts-input [ngModel]="'26888888'" style="width:30%;" />
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Zhejiang'">
        <vts-option [vtsLabel]="'Zhejiang'" [vtsValue]="'Zhejiang'"></vts-option>
        <vts-option [vtsLabel]="'Jiangsu'" [vtsValue]="'Jiangsu'"></vts-option>
      </vts-select>
      <input type="text" vts-input [ngModel]="'Xihu District, Hangzhou'" style="width:50%;" />
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Option1'">
        <vts-option [vtsLabel]="'Option1'" [vtsValue]="'Option1'"></vts-option>
        <vts-option [vtsLabel]="'Option2'" [vtsValue]="'Option2'"></vts-option>
      </vts-select>
      <input type="text" vts-input [ngModel]="'input content'" style="width:50%;" />
      <vts-input-number></vts-input-number>
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <input type="text" vts-input [ngModel]="'input content'" style="width:50%;" />
      <vts-date-picker></vts-date-picker>
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Option1-1'">
        <vts-option [vtsLabel]="'Option1-1'" [vtsValue]="'Option1-1'"></vts-option>
        <vts-option [vtsLabel]="'Option1-2'" [vtsValue]="'Option1-2'"></vts-option>
      </vts-select>
      <vts-select [ngModel]="'Option2-1'">
        <vts-option [vtsLabel]="'Option2-1'" [vtsValue]="'Option2-1'"></vts-option>
        <vts-option [vtsLabel]="'Option2-2'" [vtsValue]="'Option2-2'"></vts-option>
      </vts-select>
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Between'">
        <vts-option [vtsLabel]="'Between'" [vtsValue]="'Between'"></vts-option>
        <vts-option [vtsLabel]="'Except'" [vtsValue]="'Except'"></vts-option>
      </vts-select>
      <input type="text" vts-input placeholder="Minimum" style="width:100px; text-align: center;" />
      <input
        type="text"
        disabled
        vts-input
        placeholder="~"
        class="demo-input-split"
        style="width: 30px; border-left: 0px; border-right: 0px; pointer-events: none;"
      />
      <input type="text" vts-input placeholder="Maximum" class="demo-input-right" />
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Sign Up'">
        <vts-option [vtsLabel]="'Sign Up'" [vtsValue]="'Sign Up'"></vts-option>
        <vts-option [vtsLabel]="'Sign In'" [vtsValue]="'Sign In'"></vts-option>
      </vts-select>
      <input type="email" vts-input placeholder="Email" style="width: 200px;" />
    </vts-input-group>
    <br />
    <vts-input-group vtsCompact>
      <vts-select [ngModel]="'Home'" style="width: 30%;">
        <vts-option [vtsLabel]="'Home'" [vtsValue]="'Home'"></vts-option>
        <vts-option [vtsLabel]="'Company'" [vtsValue]="'Company'"></vts-option>
      </vts-select>
      <vts-cascader [vtsOptions]="options" style="width: 70%;"></vts-cascader>
    </vts-input-group>
  `,
  styles: [
    `
      .vts-input.demo-input-right {
        width: 100px;
        text-align: center;
        border-left-width: 0px;
      }

      .vts-input.vts-input-rtl.demo-input-right {
        border-right-width: 0px;
      }
    `
  ]
})
export class VtsDemoInputGroupComponent {
  options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
              isLeaf: true
            }
          ]
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          isLeaf: true
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
}
