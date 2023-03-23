import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProlayoutService {
    
    fixedSiderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    fixedHeaderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    visibilitySiderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    visibilityHeaderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    visibilityFooterChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    useSplitMenuChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    onChangeFixedSider(isFixed: boolean): void {
        this.fixedSiderChange$.next(isFixed);
    }

    onChangeFixedHeader(isFixed: boolean): void {
        this.fixedHeaderChange$.next(isFixed);
    }

    onChangeVisibilitySider(isShow: boolean): void {
        this.visibilitySiderChange$.next(isShow);
    }

    onChangeVisibilityHeader(isShow: boolean): void {
        this.visibilityHeaderChange$.next(isShow);
    }

    onChangeVisibilityFooter(isShow: boolean): void {
        this.visibilityFooterChange$.next(isShow);
    }

    onChangeUseSplitMenu(isMenuSplitted: boolean): void {
        this.useSplitMenuChange$.next(isMenuSplitted);
    }
    
}