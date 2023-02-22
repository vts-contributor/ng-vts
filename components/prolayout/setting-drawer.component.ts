import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'vts-setting-drawer',
    templateUrl: './setting-drawer.component.html'
})

export class VtsSettingDrawerComponent implements OnInit {
    open: boolean = false;
    drawerWrapClassName: string = "test-prolayout"

    @Input() isFixedHeader: boolean = false;
    @Input() isFixedSider: boolean = false;

    @Output() setFixedHeader: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() setFixedSider: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    ngOnInit() { }

    closeDrawer(){
        this.open = false;
    }

    openDrawer(){
        this.open = true;
    }

    onChangeFixedSider(){
        this.setFixedSider.emit(!this.isFixedSider);
    }

    onChangeFixedHeader(){
        this.setFixedSider.emit(!this.isFixedHeader);
    }
}