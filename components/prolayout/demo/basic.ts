import { Component } from '@angular/core';
import { MenuItemProLayout } from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout-container [menuHeader]="menuData" [menuSider]="menuData">Content</vts-prolayout-container>
  `
})
export class VtsDemoProlayoutBasicComponent {
  menuData: MenuItemProLayout[] = [
    {
      title: 'Parent 1',
      children: [
        { title: 'Child 1.1', children: [{ title: 'Child 1.1.1' }, { title: 'Child 1.1.2', isSelected: true }], isOpen: true },
        { title: 'Child 1.2' }
      ],
      isOpen: true
    },
    {
      title: 'Parent 2',
      children: [
        { title: 'Child 2.1', children: [{ title: 'Child 2.1.1' }, { title: 'Child 2.1.2' }] },
        { title: 'Child 2.2' }
      ]
    }
  ];
}
