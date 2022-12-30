import { Component } from "@angular/core";

@Component({
    selector: 'vts-inplace-content',
    exportAs: 'vtsInplaceContent',
    template: '<ng-content></ng-content>',
})
export class VtsInplaceContentComponent {}