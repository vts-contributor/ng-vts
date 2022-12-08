import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Provider, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchFakeEvent, dispatchKeyboardEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsDropDownDirective } from './dropdown.directive';
import { VtsDropDownModule } from './dropdown.module';

describe('dropdown', () => {
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

  it('should hover correct', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownComponent, [], []);
    fixture.componentInstance.trigger = 'hover';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(
        By.directive(VtsDropDownDirective)
      ).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should click correct', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownComponent, [], []);
    fixture.componentInstance.trigger = 'click';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(
        By.directive(VtsDropDownDirective)
      ).nativeElement;
      dispatchFakeEvent(dropdownElement, 'click');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should disabled work', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownComponent, [], []);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(
        By.directive(VtsDropDownDirective)
      ).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));

  describe('when vtsHasBackdrop=true', () => {
    let fixture: ComponentFixture<VtsTestDropdownComponent>;

    beforeEach(() => {
      fixture = createComponent(VtsTestDropdownComponent, [], []);
      fixture.componentInstance.backdrop = true;
    });

    it('should disappear if invisible backdrop clicked if vtsTrigger=click', fakeAsync(() => {
      fixture.componentInstance.trigger = 'click';
      fixture.detectChanges();

      expect(() => {
        const dropdownElement = fixture.debugElement.query(
          By.directive(VtsDropDownDirective)
        ).nativeElement;
        dispatchFakeEvent(dropdownElement, 'click');

        tick(1000);
        fixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        expect(backdrop).not.toBeNull();

        dispatchFakeEvent(backdrop as Element, 'click');
        tick(1000);
        fixture.detectChanges();

        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeNull();
      }).not.toThrowError();
    }));
  });

  it('should disappear if Escape pressed', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownComponent, [], []);
    fixture.componentInstance.trigger = 'click';
    fixture.componentInstance.backdrop = true;
    fixture.detectChanges();

    expect(() => {
      const dropdownElement = fixture.debugElement.query(
        By.directive(VtsDropDownDirective)
      ).nativeElement;

      dispatchFakeEvent(dropdownElement, 'click');
      tick(1000);
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      tick(1000);
      fixture.detectChanges();

      const nullBackdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(nullBackdrop).toBeNull();
    }).not.toThrowError();
  }));
  it('should vtsOverlayClassName and vtsOverlayStyle work', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownComponent, [], []);
    fixture.detectChanges();
    expect(() => {
      const dropdownElement = fixture.debugElement.query(
        By.directive(VtsDropDownDirective)
      ).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-dropdown')!.classList).toContain(
        'custom-class'
      );
      expect(overlayContainerElement.querySelector<HTMLElement>('.vts-dropdown')!.style.color).toBe(
        'rgb(0, 0, 0)'
      );
    }).not.toThrowError();
  }));
  it('should vtsVisible & vtsClickHide work', fakeAsync(() => {
    const fixture = createComponent(VtsTestDropdownVisibleComponent, [], []);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(0);
    const dropdownElement = fixture.debugElement.query(
      By.directive(VtsDropDownDirective)
    ).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.first-menu')!, 'click');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.second-menu')!, 'click');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.close-menu')!, 'click');
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
  }));
});

@Component({
  template: `
    <a
      vts-dropdown
      [vtsDropdownMenu]="menu"
      [vtsTrigger]="trigger"
      [vtsDisabled]="disabled"
      [vtsPlacement]="placement"
      [vtsHasBackdrop]="backdrop"
      [vtsOverlayClassName]="className"
      [vtsOverlayStyle]="overlayStyle"
    >
      Trigger
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-item>3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsTestDropdownComponent {
  backdrop = false;
  trigger = 'hover';
  placement = 'bottomLeft';
  disabled = false;
  className = 'custom-class';
  overlayStyle = { color: '#000' };
}

@Component({
  template: `
    <a
      vts-dropdown
      [vtsDropdownMenu]="menu"
      [vtsClickHide]="false"
      [(vtsVisible)]="visible"
      (vtsVisibleChange)="triggerVisible($event)"
    >
      Hover me
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item class="first-menu">Clicking me will not close the menu.</li>
        <li vts-menu-item class="second-menu">Clicking me will not close the menu also.</li>
        <li vts-menu-item (click)="visible = false" class="close-menu">
          Clicking me will close the menu
        </li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsTestDropdownVisibleComponent {
  visible = false;
  triggerVisible = jasmine.createSpy('visibleChange');
}
