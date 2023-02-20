import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html'
})

export class VtsSettingDrawerComponent implements OnInit {
    open: boolean = false;

    ngOnInit() { }

    closeDrawer(){
        this.open = false;
    }

    openDrawer(){
        this.open = true;
    }
}