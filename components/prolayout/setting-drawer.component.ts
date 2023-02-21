import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html'
})

export class VtsSettingDrawerComponent implements OnInit {
    open: boolean = false;
    drawerWrapClassName: string = "test-prolayout"

    ngOnInit() { }

    closeDrawer(){
        this.open = false;
    }

    openDrawer(){
        this.open = true;
    }
}