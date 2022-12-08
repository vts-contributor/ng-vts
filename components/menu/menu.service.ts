/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { VtsMenuModeType, VtsMenuThemeType } from './menu.types';

@Injectable()
export class MenuService {
  /** all descendant menu click **/
  descendantMenuItemClick$ = new Subject<VtsSafeAny>();
  /** child menu item click **/
  childMenuItemClick$ = new Subject<VtsSafeAny>();
  theme$ = new BehaviorSubject<VtsMenuThemeType>('light');
  mode$ = new BehaviorSubject<VtsMenuModeType>('vertical');
  inlineIndent$ = new BehaviorSubject<number>(24);
  isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  onDescendantMenuItemClick(menu: VtsSafeAny): void {
    this.descendantMenuItemClick$.next(menu);
  }

  onChildMenuItemClick(menu: VtsSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  setMode(mode: VtsMenuModeType): void {
    this.mode$.next(mode);
  }

  setTheme(theme: VtsMenuThemeType): void {
    this.theme$.next(theme);
  }

  setInlineIndent(indent: number): void {
    this.inlineIndent$.next(indent);
  }
}
