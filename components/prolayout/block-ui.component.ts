import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VtsBlockUIService } from '@ui-vts/ng-vts/block-ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'block-ui',
    templateUrl: 'block-ui.component.html'
})

export class BlockUIComponent implements OnInit, OnDestroy {
    constructor(
        private blockUIService: VtsBlockUIService
    ) { }

    // reset to locked UI if true, otherwise show an input for user to type
    setBlockUI: boolean = false;
    form: FormGroup = new FormGroup({
        password: new FormControl("", Validators.required)
    });

    private lockStateSubscription = Subscription.EMPTY;

    ngOnDestroy(): void {
        this.lockStateSubscription.unsubscribe();
    }

    ngOnInit() { 
        this.lockStateSubscription = this.blockUIService.lockUIStateChange$.subscribe((isLocked: boolean) => {
            if(isLocked){
                this.setBlockUI = true;
            }
        })
    }

    showInput(){
        this.setBlockUI = false;
    }

    submit(){
        this.blockUIService.unlockScreen(this.form.get('password')?.value);
    }
}