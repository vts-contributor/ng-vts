import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class VtsBlockUIService {
    
    // scrren lock state change
    lockUIStateChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    // show input password 
    showInputChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    // UI lock password
    private lockPassword: string = "";

    // lock screen 
    lockScreen(pass: string): void {
        this.lockPassword = pass;
        this.lockUIStateChange$.next(true);
    }

    // unlock screen with a password
    unlockScreen(pass: string): void {
        if(pass === this.lockPassword){
            this.lockUIStateChange$.next(false);
        }
        else {
            this.lockUIStateChange$.next(true);
        }
    }

    // show input password
    showInputPassword(){
        this.showInputChange$.next(true);
    }

    // hide input password
    hideInputPassword(){
        this.showInputChange$.next(false);
    }

    // get current lock state
    getLockState(){
        return this.lockPassword ? true: false;
    }
    
}