import { OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';
import { Component, Provider, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { Subject } from 'rxjs';
import { VtsContextMenuService } from './context-menu.service';
import { VtsDropdownMenuComponent } from './dropdown-menu.component';
import { VtsDropDownModule } from './dropdown.module';

describe('context-menu', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  function createComponent<T>(
    component: Type<T>,
    providers: Provider[] = [],
    // tslint:disable-next-line:no-any
    declarations: any[] = []
  ): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [VtsDropDownModule, VtsMenuModule, NoopAnimationsModule],
      declarations: [component, ...declarations],
      providers
    })
      .compileComponents()
      .then();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    return TestBed.createComponent<T>(component);
  }
  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  it('should create dropdown', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      const component = fixture.componentInstance;
      component.vtsContextMenuService.create(fakeEvent, component.vtsDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should only one dropdown exist', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      let fakeEvent = createMouseEvent('contextmenu', 0, 0);
      const component = fixture.componentInstance;
      component.vtsContextMenuService.create(fakeEvent, component.vtsDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      fakeEvent = createMouseEvent('contextmenu', window.innerWidth, window.innerHeight);
      component.vtsContextMenuService.create(fakeEvent, component.vtsDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should dropdown close when scroll', fakeAsync(() => {
    const scrolledSubject = new Subject();
    const fixture = createComponent(
      VtsTestDropdownContextMenuComponent,
      [
        {
          provide: ScrollDispatcher,
          useFactory: () => ({ scrolled: () => scrolledSubject })
        }
      ],
      []
    );
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 0, 0);
      const component = fixture.componentInstance;
      component.vtsContextMenuService.create(fakeEvent, component.vtsDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      scrolledSubject.next();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));
  it('should backdrop work with click', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      const component = fixture.componentInstance;
      component.vtsContextMenuService.create(fakeEvent, component.vtsDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      document.body.click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));
});

@Component({
  template: `
    <vts-dropdown-menu>
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-item>3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsTestDropdownContextMenuComponent {
  @ViewChild(VtsDropdownMenuComponent, { static: true })
  vtsDropdownMenuComponent!: VtsDropdownMenuComponent;

  constructor(public vtsContextMenuService: VtsContextMenuService) {}
}
