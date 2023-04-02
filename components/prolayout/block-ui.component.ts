import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VtsBlockUIService } from './block-ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'block-ui',
    templateUrl: 'block-ui.component.html'
})

export class VtsBlockUIComponent implements OnInit, OnDestroy {
    constructor(
        private blockUIService: VtsBlockUIService
    ) { }

    isShowInput: boolean = false;
    /**
     *  currently locked if true, otherwise not locked
     * */ 
    isLockOrUnlock: boolean = false;
    form: FormGroup = new FormGroup({
        password: new FormControl("", Validators.required)
    });

    private lockStateSubscription = Subscription.EMPTY;
    private visibleInputPassSubscription = Subscription.EMPTY;

    ngOnDestroy(): void {
        this.lockStateSubscription.unsubscribe();
        this.visibleInputPassSubscription.unsubscribe();
    }

    ngOnInit() { 
        this.lockStateSubscription = this.blockUIService.lockUIStateChange$.subscribe((isLocked: boolean) => {
            if(isLocked){
                this.isShowInput = false;
                this.isLockOrUnlock = true;
            }
            else {
                this.isShowInput = false;
                this.isLockOrUnlock = false;
            }
        })
        this.visibleInputPassSubscription = this.blockUIService.showInputChange$.subscribe((isShow: boolean) => {
            this.isShowInput = isShow;
        })
    }

    showInput(){
        this.isShowInput = true;
    }

    submit(){
        if(this.isLockOrUnlock){
            this.blockUIService.unlockScreen(this.form.get('password')?.value);
        }
        else this.blockUIService.lockScreen(this.form.get('password')?.value);
    }
}