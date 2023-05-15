import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VtsBlockUIService {
  // scrren lock state change
  lockUIStateChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  // show input password change
  showInputChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  // UI lock password
  private lockPassword: string | null = '';
  private storage = localStorage;

  // lock screen
  lockScreen(pass: string): void {
    this.lockPassword = pass;
    this.storage.setItem('lockUI', this.lockPassword);
    this.lockUIStateChange$.next(true);
  }

  // unlock screen with a password
  unlockScreen(pass: string): void {
    let storedPass: string | null = this.storage.getItem('lockUI');
    // reload page will clear lockPassword
    if (!this.lockPassword && storedPass) {
      this.lockPassword = storedPass;
    }
    if (pass === this.lockPassword) {
      this.lockUIStateChange$.next(false);
      this.storage.removeItem('lockUI');
    } else {
      this.lockUIStateChange$.next(true);
    }
  }

  // show input password
  showInputPassword() {
    this.showInputChange$.next(true);
  }

  // hide input password
  hideInputPassword() {
    this.showInputChange$.next(false);
  }

  // get current lock state
  // fire lock stream if needed because reloading page clears lockPassword
  getLockState() {
    if (!this.lockPassword && this.storage.getItem('lockUI')) {
      this.lockPassword = this.storage.getItem('lockUI');
      this.lockUIStateChange$.next(true);
      return true;
    }
    return false;
  }
}
