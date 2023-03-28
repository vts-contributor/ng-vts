import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';

@Component({
    selector: 'vts-prolayout-breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})

export class VtsProlayoutBreadCrumbComponent implements OnInit {
    constructor(
    ) { }

    @Input() vtsBreadcrumbArray: VtsBreadcrumbItem[] = [];
    @Input() vtsSeparator: string | TemplateRef<void> | null = '❯';

    ngOnInit() { 
        
    }
}