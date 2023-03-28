import { 
    Component, 
    Input, 
    // OnChanges, 
    OnInit, 
    // SimpleChanges 
} from '@angular/core';
import { VtsMenuItemProLayout } from './pro-layout.types';

@Component({
    selector: 'vts-prolayout-menu-item-horizontal',
    templateUrl: 'menu-item-horizontal.component.html'
})

export class VtsProlayoutMenuItemHorizontalComponent implements OnInit {

    @Input() vtsMenuItem: VtsMenuItemProLayout = {
        title: '',
        children: [],
        isSelected: false
    };

    constructor() { }

    ngOnInit() { }
}