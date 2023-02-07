import { Component } from "@angular/core";

@Component({
    selector: 'vts-inplaceDisplay',
    exportAs: 'vtsInplaceDisplay',
    template: '<ng-content></ng-content>',
})
export class VtsInplaceDisplayComponent {}