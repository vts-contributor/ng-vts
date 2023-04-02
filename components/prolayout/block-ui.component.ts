import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { VtsBlockUIService } from './block-ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VtsBlockUIConfig } from './pro-layout.types';

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
    modalTitle: string = "";
    submitText: string = "";
    inputType: "password" | "text" = "password";

    
    @Input() vtsBlockUIConfig: VtsBlockUIConfig = {
        isEnabled: true,
        modalLockTitle: "Khóa màn hình",
        modalUnlockTitle: "Mở khóa màn hình",
        cancelText: "Hủy",
        locktext: "Khóa",
        unlockText: "Mở khóa"
    }

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
            if(isShow){
                let modalTitle = this.isLockOrUnlock ? this.vtsBlockUIConfig.modalUnlockTitle : this.vtsBlockUIConfig.modalLockTitle;
                let submitText = this.isLockOrUnlock ? this.vtsBlockUIConfig.unlockText : this.vtsBlockUIConfig.locktext;
                this.modalTitle = modalTitle ? modalTitle : "";
                this.submitText = submitText ? submitText : "";
                this.form.reset();
            }
        })
    }

    showInput(){
        this.blockUIService.showInputPassword();
    }

    submit(){
        if(this.isLockOrUnlock){
            this.blockUIService.unlockScreen(this.form.get('password')?.value);
        }
        else this.blockUIService.lockScreen(this.form.get('password')?.value);
    }

    hideInput(){
        this.blockUIService.hideInputPassword();
    }

    onChangeInputType(){
        if(this.inputType == "password"){
            this.inputType = "text";
        }
        else {
            this.inputType = "password";
        }
    }
}