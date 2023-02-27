import { 
    Component, 
    Input, 
    // OnChanges, 
    OnInit, 
    // SimpleChanges 
} from '@angular/core';
import { MenuItemProLayout } from './pro-layout.types';

@Component({
    selector: 'vts-prolayout-menu-item',
    templateUrl: 'menu-item.component.html'
})

export class VtsProlayoutMenuItemComponent implements OnInit {

    @Input() menuItem: MenuItemProLayout = {
        title: '',
        children: [],
        isSelected: false
    };

    constructor() { }

    ngOnInit() { }
}