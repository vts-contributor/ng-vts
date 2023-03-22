import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProlayoutService {
    
    fixedSiderChange$: Subject<boolean> = new Subject<boolean>();
    fixedHeaderChange$: Subject<boolean> = new Subject<boolean>();
    visibilitySiderChange$: Subject<boolean> = new Subject<boolean>();
    visibilityHeaderChange$: Subject<boolean> = new Subject<boolean>();
    visibilityFooterChange$: Subject<boolean> = new Subject<boolean>();
    useSplitMenuChange$: Subject<boolean> = new Subject<boolean>();

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