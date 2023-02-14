import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  DebugElement,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchFakeEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsMenuItemDirective } from './menu-item.directive';
import { VtsMenuDirective } from './menu.directive';
import { VtsMenuModule } from './menu.module';
import { VtsSubMenuComponent } from './submenu.component';

describe('menu', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsMenuModule, NoopAnimationsModule, VtsIconTestModule],
      declarations: [
        VtsTestBasicMenuHorizontalComponent,
        VtsTestBasicMenuInlineComponent,
        VtsTestMenuInlineCollapsedComponent,
        VtsTestMenuSiderCurrentComponent,
        VtsTestMenuThemeComponent,
        VtsTestMenuSwitchModeComponent,
        VtsTestMenuHorizontalComponent,
        VtsTestMenuInlineComponent,
        VtsDemoMenuNgForComponent,
        VtsTestNgIfMenuComponent,
        VtsTestSubMenuSelectedComponent,
        VtsTestMenuRtlComponent
      ]
    });

    TestBed.compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('demo', () => {
    describe('horizontal', () => {
      let fixture: ComponentFixture<VtsTestBasicMenuHorizontalComponent>;
      let items: DebugElement[];
      let submenu: DebugElement;
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestBasicMenuHorizontalComponent);
        items = fixture.debugElement.queryAll(By.directive(VtsMenuItemDirective));
        submenu = fixture.debugElement.query(By.directive(VtsSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(items.every(item => item.nativeElement.classList.contains('vts-menu-item'))).toBe(
          true
        );
        expect(items[1].nativeElement.classList.contains('vts-menu-item-disabled')).toBe(true);
        expect(submenu.nativeElement.classList.contains('vts-menu-submenu-horizontal')).toBe(true);
        expect(submenu.nativeElement.classList.contains('vts-menu-submenu')).toBe(true);
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-light vts-menu-horizontal'
        );
      });
      it('should menu item select', () => {
        fixture.detectChanges();
        items[0].nativeElement.click();
        fixture.detectChanges();
        expect(items[0].nativeElement.classList.contains('vts-menu-item-selected')).toBe(true);
      });
      it('should menu disabled work', () => {
        fixture.detectChanges();
        items[1].nativeElement.click();
        fixture.detectChanges();
        expect(items[0].nativeElement.classList.contains('vts-menu-item-selected')).toBe(false);
      });
      it('should menu danger work', () => {
        fixture.detectChanges();
        expect(items[3].nativeElement.classList.contains('vts-menu-item-danger')).toBe(true);
      });
    });
    describe('inline', () => {
      let fixture: ComponentFixture<VtsTestBasicMenuInlineComponent>;
      let items: DebugElement[];
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestBasicMenuInlineComponent);
        items = fixture.debugElement.queryAll(By.directive(VtsMenuItemDirective));
        menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
        submenus = fixture.debugElement.queryAll(By.directive(VtsSubMenuComponent));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(
          submenus.every(subitem => subitem.nativeElement.classList.contains('vts-menu-submenu'))
        ).toBe(true);
        expect(
          submenus.every(subitem =>
            subitem.nativeElement.classList.contains('vts-menu-submenu-inline')
          )
        ).toBe(true);
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-light vts-menu-inline'
        );
      });
      it('should padding left work', () => {
        fixture.detectChanges();
        const firstLevelItems = items;
        const secondLevelItems = firstLevelItems.splice(6, 2);
        expect(firstLevelItems.every(item => item.nativeElement.style.marginLeft === '48px')).toBe(
          true
        );
        expect(secondLevelItems.every(item => item.nativeElement.style.marginLeft === '72px')).toBe(
          true
        );
      });
      it('should click expand', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenus[0].nativeElement.querySelector('.vts-menu');
        const title = submenus[0].nativeElement.querySelector('.vts-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(true);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(false);
      }));
    });
    describe('inline-collapsed', () => {
      let fixture: ComponentFixture<VtsTestMenuInlineCollapsedComponent>;
      let testComponent: VtsTestMenuInlineCollapsedComponent;
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuInlineCollapsedComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenus = fixture.debugElement.queryAll(By.directive(VtsSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-dark vts-menu-inline'
        );
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-dark vts-menu-vertical vts-menu-inline-collapsed'
        );
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-dark vts-menu-inline'
        );
      });
      it('should keep open after change mode', () => {
        fixture.detectChanges();
        let ul = submenus[0].nativeElement.querySelector('.vts-menu');
        const title = submenus[0].nativeElement.querySelector('.vts-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        ul = submenus[0].nativeElement.querySelector('.vts-menu');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        expect(ul.style.height).not.toBe('0px');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        expect(ul.style.height).not.toBe('0px');
      });
    });
    describe('slider-current', () => {
      let fixture: ComponentFixture<VtsTestMenuSiderCurrentComponent>;
      let submenus: DebugElement[];
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuSiderCurrentComponent);
        submenus = fixture.debugElement.queryAll(By.directive(VtsSubMenuComponent));
      });
      it('should collapsed self work', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenus[0].nativeElement.querySelector('.vts-menu');
        const title = submenus[0].nativeElement.querySelector('.vts-menu-submenu-title');
        expect(ul.style.height).not.toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(false);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(true);
      }));
      it('should collapsed other work', fakeAsync(() => {
        fixture.detectChanges();
        const firstUl = submenus[0].nativeElement.querySelector('.vts-menu');
        const secondUl = submenus[1].nativeElement.querySelector('.vts-menu');
        const secondTitle = submenus[1].nativeElement.querySelector('.vts-menu-submenu-title');
        expect(firstUl.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(true);
        secondTitle.click();
        fixture.detectChanges();
        tick(500);
        expect(firstUl.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(false);
        expect(secondUl.style.height).not.toBe('0px');
        expect(submenus[1].nativeElement.classList.contains('vts-menu-submenu-open')).toBe(true);
      }));
    });
    describe('theme', () => {
      let fixture: ComponentFixture<VtsTestMenuThemeComponent>;
      let testComponent: VtsTestMenuThemeComponent;
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuThemeComponent);
        testComponent = fixture.debugElement.componentInstance;
        menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-dark vts-menu-inline'
        );
        testComponent.theme = false;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-inline vts-menu-light'
        );
      });
    });
    describe('swich-mode', () => {
      let fixture: ComponentFixture<VtsTestMenuSwitchModeComponent>;
      let testComponent: VtsTestMenuSwitchModeComponent;
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuSwitchModeComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenus = fixture.debugElement.queryAll(By.directive(VtsSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-light vts-menu-inline'
        );
        expect(
          submenus.every(submenu =>
            submenu.nativeElement.classList.contains('vts-menu-submenu-inline')
          )
        ).toBe(true);
        testComponent.mode = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'vts-menu vts-menu-root vts-menu-light vts-menu-vertical'
        );
        expect(
          submenus.every(submenu =>
            submenu.nativeElement.classList.contains('vts-menu-submenu-inline')
          )
        ).toBe(false);
        expect(
          submenus.every(submenu =>
            submenu.nativeElement.classList.contains('vts-menu-submenu-vertical')
          )
        ).toBe(true);
      });
    });
  });
  describe('coverage', () => {
    describe('horizontal submenu', () => {
      let fixture: ComponentFixture<VtsTestMenuHorizontalComponent>;
      let testComponent: VtsTestMenuHorizontalComponent;
      let submenu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuHorizontalComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenu = fixture.debugElement.query(By.directive(VtsSubMenuComponent));
      });
      it('should overlay work', fakeAsync(() => {
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('');
        testComponent.open = true;
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).not.toBe('');
      }));
      it('should submenu mouseenter work', () => {
        fixture.detectChanges();
        const mouseenterCallback = jasmine.createSpy('mouseenter callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.vts-menu-submenu-title');
        // tslint:disable-next-line:no-any
        (subs[0].vtsSubmenuService as any).isMouseEnterTitleOrOverlay$.subscribe(
          mouseenterCallback
        );
        dispatchFakeEvent(title, 'mouseenter');
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledWith(true);
        expect(mouseenterCallback).toHaveBeenCalledTimes(1);
      });
      it('should submenu mouseleave work', () => {
        fixture.detectChanges();
        const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.vts-menu-submenu-title');
        // tslint:disable-next-line:no-any
        (subs[0].vtsSubmenuService as any).isMouseEnterTitleOrOverlay$.subscribe(
          mouseleaveCallback
        );
        dispatchFakeEvent(title, 'mouseleave');
        fixture.detectChanges();
        expect(mouseleaveCallback).toHaveBeenCalledWith(false);
        expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
      });
      it('should nested submenu work', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        // tslint:disable-next-line:no-any
        (subs[0].vtsSubmenuService as any).isChildSubMenuOpen$.subscribe(nestedCallback);
        subs[1].vtsOpen = true;
        subs[1].vtsSubmenuService.isCurrentSubMenuOpen$.next(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledWith(false);
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });
      it('should nested submenu disabled work', () => {
        testComponent.open = true;
        testComponent.disabled = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        // tslint:disable-next-line:no-any
        (subs[0].vtsSubmenuService as any).isChildSubMenuOpen$.subscribe(nestedCallback);
        subs[1].vtsOpen = true;
        subs[1].vtsSubmenuService.isCurrentSubMenuOpen$.next(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });
      it('should click menu and other submenu menu not active', fakeAsync(() => {
        testComponent.open = true;
        fixture.detectChanges();
        const subs = testComponent.subs.toArray();
        dispatchFakeEvent(testComponent.menuitem1.nativeElement, 'mouseenter');
        fixture.detectChanges();
        testComponent.menuitem1.nativeElement.click();
        fixture.detectChanges();
        tick(500);
        expect(subs[1].isActive).toBe(false);
      }));
      it('should click submenu menu item close', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        subs[1].vtsOpen = true;
        fixture.detectChanges();
        // tslint:disable-next-line:no-any
        (subs[1].vtsSubmenuService as any).isChildSubMenuOpen$.subscribe(nestedCallback);
        testComponent.menuitem.nativeElement.click();
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledWith(false);
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });
      it('should click submenu disabled menu item not close', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        // tslint:disable-next-line:no-any
        (subs[1].vtsSubmenuService as any).isMouseEnterTitleOrOverlay$.subscribe(nestedCallback);
        subs[1].vtsOpen = true;
        testComponent.disableditem.nativeElement.click();
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledTimes(0);
      });
      it('should width change correct', () => {
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        const overlayPane = overlayContainerElement.querySelector(
          '.cdk-overlay-pane'
        ) as HTMLElement;
        expect(overlayPane.style.width).toBe('200px');
        testComponent.open = false;
        fixture.detectChanges();
        testComponent.width = 300;
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        expect(overlayPane.style.width).toBe('300px');
      });
      it('should position change correct', () => {
        const fakeLeftTopEvent = {
          connectionPair: {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        const fakeRightTopEvent = {
          connectionPair: {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        fixture.detectChanges();
        testComponent.open = true;
        const subs = testComponent.subs.toArray();
        subs[1].vtsOpen = true;
        fixture.detectChanges();
        subs[1].onPositionChange(fakeLeftTopEvent);
        fixture.detectChanges();
        expect(subs[1].position).toBe('left');
        subs[1].onPositionChange(fakeRightTopEvent);
        fixture.detectChanges();
        expect(subs[1].position).toBe('right');
      });
      it('should `vtsMenuClassName` work', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        expect(
          (overlayContainerElement.querySelector('.submenu') as HTMLUListElement).classList
        ).toContain('vts-menu-sub');
      }));
      it('should nested submenu `vtsMenuClassName` work', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const subs = testComponent.subs.toArray();
        subs[0].vtsOpen = true;
        subs[1].vtsOpen = true;
        // tslint:disable-next-line:no-any
        (subs[1] as any).cdr.markForCheck();
        fixture.detectChanges();
        expect(
          (overlayContainerElement.querySelector('.nested-submenu') as HTMLUListElement).classList
        ).toContain('vts-menu-sub');
      });
    });
    describe('inline submenu', () => {
      let fixture: ComponentFixture<VtsTestMenuInlineComponent>;
      let testComponent: VtsTestMenuInlineComponent;
      let submenu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestMenuInlineComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenu = fixture.debugElement.query(By.directive(VtsSubMenuComponent));
      });
      it('should click expand', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenu.nativeElement.querySelector('.vts-menu');
        const title = submenu.nativeElement.querySelector('.vts-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenu.nativeElement.classList.contains('vts-menu-submenu-open')).toBe(true);
      }));
      it('should `vtsMenuClassName` work', fakeAsync(() => {
        fixture.detectChanges();
        expect(submenu.nativeElement.querySelector('.vts-menu-sub').className).toContain('submenu');
      }));
      it('should `vtsMenuClassName` multi class names work', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.submenuClassName = 'submenu submenu-1';
        fixture.detectChanges();
        expect(submenu.nativeElement.querySelector('.vts-menu-sub').className).toContain('submenu');
        expect(submenu.nativeElement.querySelector('.vts-menu-sub').className).toContain(
          'submenu-1'
        );
      }));
      it('should disabled work', fakeAsync(() => {
        testComponent.disabled = true;
        fixture.detectChanges();
        const ul = submenu.nativeElement.querySelector('.vts-menu');
        const title = submenu.nativeElement.querySelector('.vts-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenu.nativeElement.classList.contains('vts-menu-submenu-open')).toBe(false);
      }));
    });
    describe('ng-for', () => {
      it('should ng for works fine', () => {
        expect(() => {
          TestBed.createComponent(VtsDemoMenuNgForComponent).detectChanges();
        }).not.toThrowError();
      });
    });
    describe('ng-if', () => {
      it('should ng if works fine', () => {
        expect(() => {
          TestBed.createComponent(VtsTestNgIfMenuComponent).detectChanges();
        }).not.toThrowError();
      });
    });
    describe('submenu default selected', () => {
      it('should default selected active submenu', () => {
        const fixture = TestBed.createComponent(VtsTestSubMenuSelectedComponent);
        fixture.detectChanges();
        expect(
          fixture.debugElement.nativeElement.querySelector('.vts-menu-submenu').classList
        ).toContain('vts-menu-submenu-selected');
      });
    });
  });
  describe('RTL', () => {
    let fixture: ComponentFixture<VtsTestMenuRtlComponent>;
    let testComponent: VtsTestMenuHorizontalComponent;
    let submenu: DebugElement;
    let menu: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestMenuRtlComponent);
      testComponent = fixture.debugElement.query(
        By.directive(VtsTestMenuHorizontalComponent)
      ).componentInstance;
      submenu = fixture.debugElement.query(By.directive(VtsSubMenuComponent));
      menu = fixture.debugElement.query(By.directive(VtsMenuDirective));
    });
    it('should className correct on dir change', () => {
      fixture.detectChanges();
      expect(submenu.nativeElement.classList.contains('vts-menu-submenu-rtl')).toBe(true);
      expect(menu.nativeElement.classList.contains('vts-menu-rtl')).toBe(true);

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(submenu.nativeElement.classList.contains('vts-menu-submenu-rtl')).toBe(false);
      expect(menu.nativeElement.classList.contains('vts-menu-rtl')).toBe(false);
    });

    it('should nested submenu work', () => {
      testComponent.open = true;
      fixture.detectChanges();
      const subs = testComponent.subs.toArray();
      subs[0].vtsOpen = true;
      // tslint:disable-next-line:no-any
      (subs[1] as any).cdr.markForCheck();
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-menu-submenu') as HTMLUListElement).classList
      ).toContain('vts-menu-submenu-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-menu-horizontal',
  template: `
    <ul vts-menu [vtsMode]="'horizontal'">
      <li vts-submenu vtsMenuClassName="submenu" [vtsOpen]="open" [style.width.px]="width">
        <span title>
          <i vts-icon vtsType="Setting"></i>
          Navigation Three - Submenu
        </span>
        <ul>
          <li vts-menu-group>
            <span title>Item 1</span>
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group>
            <span title>Item 2</span>
            <ul>
              <li vts-menu-item #menuitem1>Option 3</li>
              <li vts-menu-item>Option 4</li>
              <li vts-submenu vtsMenuClassName="nested-submenu" [vtsDisabled]="disabled">
                <span title>Sub Menu</span>
                <ul>
                  <li vts-menu-item #menuitem>Option 5</li>
                  <li vts-menu-item #disableditem vtsDisabled>Option 6</li>
                </ul>
              </li>
              <li vts-submenu vtsDisabled>
                <span title>Disabled Sub Menu</span>
                <ul>
                  <li vts-menu-item>Option 5</li>
                  <li vts-menu-item>Option 6</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestMenuHorizontalComponent {
  width = 200;
  open = false;
  disabled = false;
  @ViewChildren(VtsSubMenuComponent) subs!: QueryList<VtsSubMenuComponent>;
  @ViewChild('menuitem', { static: false, read: ElementRef })
  menuitem!: ElementRef;
  @ViewChild('menuitem1', { static: false, read: ElementRef })
  menuitem1!: ElementRef;
  @ViewChild('disableditem', { static: false, read: ElementRef })
  disableditem!: ElementRef;
}

@Component({
  template: `
    <ul vts-menu [vtsMode]="'inline'" [vtsInlineCollapsed]="collapse">
      <li vts-submenu [vtsMenuClassName]="submenuClassName" [vtsDisabled]="disabled">
        <span title>
          <i vts-icon vtsType="Mail"></i>
          Navigation One
        </span>
        <ul>
          <li vts-menu-item style="padding-left:0px;">Option 1</li>
          <li vts-menu-item>Option 2</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestMenuInlineComponent {
  disabled = false;
  collapse = false;
  submenuClassName = 'submenu';
  @ViewChild(VtsSubMenuComponent, { static: true })
  subsmenu!: VtsSubMenuComponent;
  @ViewChild('menuitem', { static: false, read: ElementRef })
  menuitem!: ElementRef;
}

@Component({
  template: `
    <ul vts-menu [vtsMode]="'inline'" style="width: 240px;">
      <li *ngFor="let l1 of menus" vts-submenu>
        <span title>
          <i vts-icon vtsType="ViewModule"></i>
          {{ l1.text }}
        </span>
        <ul>
          <li *ngFor="let l2 of l1.children" vts-submenu>
            <span title>{{ l2.text }}</span>
            <ul>
              <li *ngFor="let l3 of l2.children" vts-menu-item>
                {{ l3.text }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsDemoMenuNgForComponent {
  menus = [
    {
      text: 'level1',
      children: [
        {
          text: 'level2',
          children: [{ text: 'level3' }]
        }
      ]
    }
  ];
}

@Component({
  template: `
    <ul vts-menu vtsMode="horizontal">
      <li vts-menu-item>
        <i vts-icon vtsType="Mail"></i>
        Navigation One
      </li>
      <li vts-menu-item vtsDisabled>
        <i vts-icon vtsType="ViewModule"></i>
        Navigation Two
      </li>
      <li vts-submenu vtsTitle="Navigation Three - Submenu" vtsIcon="setting">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
              <li vts-submenu vtsTitle="Sub Menu">
                <ul>
                  <li vts-menu-item vtsDisabled>Option 5</li>
                  <li vts-menu-item>Option 6</li>
                </ul>
              </li>
              <li vts-submenu vtsDisabled vtsTitle="Disabled Sub Menu">
                <ul>
                  <li vts-menu-item>Option 5</li>
                  <li vts-menu-item>Option 6</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-menu-item>
        <a href="https://ng.ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </li>
      <li vts-menu-item vtsDanger>Navigation Five</li>
    </ul>
  `
})
export class VtsTestBasicMenuHorizontalComponent {}

@Component({
  template: `
    <ul vts-menu vtsMode="inline">
      <li vts-submenu vtsTitle="Navigation One" vtsIcon="mail">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
              <li vts-submenu vtsTitle="Submenu">
                <ul>
                  <li vts-menu-item>Option 9</li>
                  <li vts-menu-item>Option 10</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
        <ul>
          <li vts-menu-item>Option 11</li>
          <li vts-menu-item>Option 12</li>
          <li vts-menu-item>Option 13</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestBasicMenuInlineComponent {}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3023
@Component({
  template: `
    <ul vts-menu vtsMode="horizontal">
      <li *ngIf="display" vts-submenu>
        <span title>{{ text }}</span>
        <ul>
          <li vts-menu-item>item</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestNgIfMenuComponent {
  text = 'text';
  display = true;
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345
@Component({
  template: `
    <ul vts-menu vtsMode="inline" vtsInlineCollapsed>
      <li vts-menu-item>
        <i vts-icon vtsType="Mail"></i>
        <span>Navigation One</span>
      </li>
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
        <ul>
          <li vts-menu-item vtsSelected>Option 5</li>
          <li vts-menu-item>Option 6</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestSubMenuSelectedComponent {}

@Component({
  template: `
    <div class="wrapper">
      <button vts-button vtsType="primary" (click)="toggleCollapsed()">
        <i vts-icon [vtsType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></i>
      </button>
      <ul vts-menu vtsMode="inline" [vtsInlineCollapsed]="isCollapsed">
        <li vts-menu-item vtsSelected>
          <i vts-icon vtsType="Mail"></i>
          <span>Navigation One</span>
        </li>
        <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
          <ul>
            <li vts-menu-item>Option 5</li>
            <li vts-menu-item>Option 6</li>
            <li vts-submenu vtsTitle="Submenu">
              <ul>
                <li vts-menu-item>Option 7</li>
                <li vts-menu-item>Option 8</li>
              </ul>
            </li>
          </ul>
        </li>
        <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
          <ul>
            <li vts-menu-item>Option 9</li>
            <li vts-menu-item>Option 10</li>
            <li vts-menu-item>Option 11</li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 240px;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsTestMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

@Component({
  template: `
    <ul vts-menu vtsMode="inline" style="width: 240px;">
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub1"
        (vtsOpenChange)="openHandler('sub1')"
        vtsTitle="Navigation One"
        vtsIcon="mail"
      >
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub2"
        (vtsOpenChange)="openHandler('sub2')"
        vtsTitle="Navigation Two"
        vtsIcon="appstore"
      >
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub3"
        (vtsOpenChange)="openHandler('sub3')"
        vtsTitle="Navigation Three"
        vtsIcon="setting"
      >
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestMenuSiderCurrentComponent {
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
}

@Component({
  template: `
    <ul vts-menu [vtsMode]="mode ? 'vertical' : 'inline'">
      <li vts-submenu vtsTitle="Navigation One" vtsIcon="mail">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `,
  styles: [
    `
      [vts-menu] {
        width: 240px;
      }
    `
  ]
})
export class VtsTestMenuSwitchModeComponent {
  mode = false;
  dark = false;
}

@Component({
  template: `
    <ul vts-menu vtsMode="inline" style="width: 240px;">
      <li vts-submenu vtsOpen vtsTitle="Navigation One" vtsIcon="mail">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item vtsSelected>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsTestMenuThemeComponent {
  theme = true;
}
@Component({
  template: `
    <div [dir]="direction">
      <vts-test-menu-horizontal></vts-test-menu-horizontal>
    </div>
  `
})
export class VtsTestMenuRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
