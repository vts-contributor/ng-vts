import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';

import { dispatchKeyboardEvent } from '@ui-vts/ng-vts/core/testing';

import { VtsDrawerRef } from './drawer-ref';
import { VtsDrawerComponent } from './drawer.component';
import { VtsDrawerModule } from './drawer.module';
import { VtsDrawerService } from './drawer.service';

describe('VtsDrawerComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, VtsDrawerModule, NoopAnimationsModule, VtsNoAnimationModule],
        declarations: [VtsTestDrawerComponent, VtsTestDrawerRtlComponent]
      }).compileComponents();
    })
  );
  describe('default', () => {
    let component: VtsTestDrawerComponent;
    let fixture: ComponentFixture<VtsTestDrawerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let forceScrollElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestDrawerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      forceScrollElement = document.createElement('div');
      document.body.appendChild(forceScrollElement);
      forceScrollElement.style.width = '100px';
      forceScrollElement.style.height = '3000px';
      forceScrollElement.style.background = 'rebeccapurple';
    }));

    afterEach(fakeAsync(() => {
      component.close();
      document.body.removeChild(forceScrollElement);
      window.scroll(0, 0);
      overlayContainer.ngOnDestroy();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.drawerComponent.vtsVisible).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
    });

    it('should close work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      component.close();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(false);
      expect(component.drawerComponent.vtsVisible).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should block scroll', fakeAsync(() => {
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
      component.open();
      tick(300);
      fixture.detectChanges();
      expect(document.documentElement!.classList).toContain('cdk-global-scrollblock');
      component.close();
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
    }));

    it('should hied close button', () => {
      component.closable = false;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(overlayContainerElement.querySelector('.vts-drawer .vts-drawer-close')).toBe(null);
    });

    it('should open work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.drawerComponent.vtsVisible).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
    });

    it('should close work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      component.close();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(false);
      expect(component.drawerComponent.vtsVisible).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should closable', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.closable = true;
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      (
        overlayContainerElement.querySelector('.vts-drawer .vts-drawer-close') as HTMLElement
      ).click();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should set close icon work', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-drawer .vtsicon-close')).toBeDefined();

      component.closeIcon = 'Close';
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-drawer .vtsicon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.vts-drawer .vtsicon-Close')).toBeDefined();

      component.closeIcon = component.closeIconTemplateRef;
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.vts-drawer .vtsicon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.vts-drawer .vtsicon-Close')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.vts-drawer .vtsicon-close-square')
      ).toBeDefined();
    });

    it('should not close when click mask', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.maskClosable = false;
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      (
        overlayContainerElement.querySelector('.vts-drawer .vts-drawer-mask') as HTMLElement
      ).click();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
    });

    it('should be closed when ESC keydown', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should disabled ESC keydown', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      component.drawerComponent.vtsKeyboard = false;
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      component.close();
      fixture.detectChanges();
    });

    it('should close when click mask', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.maskClosable = true;
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      (
        overlayContainerElement.querySelector('.vts-drawer .vts-drawer-mask') as HTMLElement
      ).click();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should not show mask', () => {
      component.showMask = false;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('no-mask')
      ).toBe(true);
      expect(overlayContainerElement.querySelector('.vts-drawer .vts-drawer-mask')).toBe(null);
      component.showMask = true;
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('no-mask')
      ).toBe(false);
    });

    it('should set vtsMaskStyle & vtsBodyStyle', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer .vts-drawer-mask') as HTMLElement).style
          .color
      ).toBe('gray');
      expect(
        (overlayContainerElement.querySelector('.vts-drawer .vts-drawer-body') as HTMLElement).style
          .color
      ).toBe('gray');
    });

    it('should not render title', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(overlayContainerElement.querySelector('.vts-drawer .vts-drawer-title')).toBe(null);
    });

    it('should render header when is no title but is closeable', () => {
      component.closable = true;
      component.open();
      fixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(overlayContainerElement.querySelector('.vts-drawer-header-no-title')).toBeTruthy();
      expect(overlayContainerElement.querySelector('.vts-drawer .vts-drawer-title')).toBe(null);
    });

    it('should support string title', () => {
      component.title = component.stringTitle;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.vts-drawer .vts-drawer-title') as HTMLElement
        ).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef title', () => {
      component.title = component.titleTemplateRef;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer .vts-drawer-title .custom-title')
      ).not.toBe(null);
    });

    it('should support string footer', () => {
      component.footer = 'test';
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.vts-drawer .vts-drawer-footer') as HTMLElement
        ).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef footer', () => {
      component.footer = component.templateFooter;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        overlayContainerElement.querySelector('.vts-drawer .vts-drawer-footer .custom-footer')
      ).not.toBe(null);
    });

    it('should support custom width', () => {
      component.width = '500px';
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.vts-drawer .vts-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(500);
    });

    it('should support custom number type width', () => {
      component.width = 520;
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.vts-drawer .vts-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(520);
    });

    it('should support custom height', () => {
      component.height = '500px';
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector(
            '.vts-drawer .vts-drawer-content-wrapper'
          ) as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(500);
      component.placement = 'left';
      fixture.detectChanges();
    });

    it('should support custom number type height', () => {
      component.height = 520;
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector(
            '.vts-drawer .vts-drawer-content-wrapper'
          ) as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(520);
      component.placement = 'left';
      fixture.detectChanges();
    });

    it('should vtsWrapClassName work', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector(
            '.vts-drawer .vts-drawer-content-wrapper'
          ) as HTMLElement
        ).classList.contains('test-class')
      ).toBe(true);
    });

    it('should vtsZIndex work', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.zIndex
      ).toBe('1001');
    });

    it('should vtsPlacement work', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-left'
        )
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-bottom'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-top'
        )
      ).toBe(false);
      component.placement = 'right';
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-left'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-right'
        )
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-bottom'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-top'
        )
      ).toBe(false);
      component.placement = 'top';
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-left'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-right'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-bottom'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-top'
        )
      ).toBe(true);
      component.placement = 'bottom';
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-left'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-right'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-bottom'
        )
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-top'
        )
      ).toBe(false);
      component.close();
      fixture.detectChanges();
      component.placement = 'Invalid';
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-left'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-right'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-bottom'
        )
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).classList.contains(
          'vts-drawer-top'
        )
      ).toBe(false);
      component.close();
      fixture.detectChanges();
    });

    it('should disable the transition when the placement changing', fakeAsync(() => {
      component.open();
      tick(300);
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transition
      ).toBe('');
      component.placement = 'top';
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transition
      ).toBe('none 0s ease 0s');
      expect(
        (overlayContainerElement.querySelector('.vts-drawer-content-wrapper') as HTMLElement).style
          .transition
      ).toBe('none 0s ease 0s');
      component.placement = 'right';
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transition
      ).toBe('');
    }));

    it('should ignore set transition when `noAnimation` is `true` ', fakeAsync(() => {
      component.noAnimation = true;
      fixture.detectChanges();
      component.open();
      tick(300);
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transition
      ).toBe('');
      component.placement = 'top';
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transition
      ).toBe('');
      expect(
        (overlayContainerElement.querySelector('.vts-drawer-content-wrapper') as HTMLElement).style
          .transition
      ).toBe('');
      fixture.detectChanges();
      component.close();
      component.placement = 'right';
      component.noAnimation = false;
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
    }));

    it('should vtsOffsetX work', () => {
      component.open();
      component.placement = 'left';
      component.width = '300px';
      component.offsetX = 100;
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transform
      ).toBe('translateX(100px)');
      fixture.detectChanges();
      component.placement = 'right';
      component.offsetX = 100;
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transform
      ).toBe('translateX(-100px)');
      component.close();
      fixture.detectChanges();
    });

    it('should vtsOffsetY work', () => {
      component.open();
      component.placement = 'top';
      component.height = '300px';
      component.offsetY = 100;
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-open')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transform
      ).toBe('translateY(100px)');
      fixture.detectChanges();
      component.placement = 'bottom';
      component.offsetY = 100;
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-drawer') as HTMLElement).style.transform
      ).toBe('translateY(-100px)');
      component.close();
      fixture.detectChanges();
    });

    it('should allow scroll', () => {
      component.placement = 'right';
      component.open();
      fixture.detectChanges();
      expect(
        (
          overlayContainerElement.querySelector(
            '.vts-drawer .vts-drawer-wrapper-body'
          ) as HTMLElement
        ).style.height
      ).toBe('100%');
    });
  });
  describe('RTL', () => {
    let component: VtsTestDrawerRtlComponent;
    let fixture: ComponentFixture<VtsTestDrawerRtlComponent>;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestDrawerRtlComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should className correct on dir change', () => {
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-rtl')
      ).toBe(true);

      fixture.componentInstance.direction = 'ltr';
      component.close();
      fixture.detectChanges();
      component.open();
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-drawer')!.classList.contains('vts-drawer-rtl')
      ).toBe(false);
    });
  });
});

describe('VtsDrawerService', () => {
  let component: VtsTestDrawerWithServiceComponent;
  let fixture: ComponentFixture<VtsTestDrawerWithServiceComponent>;
  let overlayContainer: OverlayContainer;
  let drawerService: VtsDrawerService;
  let overlayContainerElement: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VtsDrawerModule, NoopAnimationsModule],
        providers: [VtsDrawerService],
        declarations: [VtsTestDrawerWithServiceComponent, VtsDrawerCustomComponent]
      });
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(VtsTestDrawerWithServiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  beforeEach(inject(
    [OverlayContainer, VtsDrawerService],
    (oc: OverlayContainer, ds: VtsDrawerService) => {
      overlayContainer = oc;
      drawerService = ds;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create template content drawer', fakeAsync(() => {
    component.openTemplate();
    fixture.detectChanges();
    tick(300);
    expect(component.templateDrawerRef?.getContentComponent()).toBeNull();
    expect(component.templateOpenSpy).toHaveBeenCalled();
    fixture.detectChanges();
    (overlayContainerElement.querySelector('.vts-drawer .vts-drawer-mask') as HTMLElement).click();
    tick(300);
    expect(component.templateCloseSpy).toHaveBeenCalled();
    fixture.detectChanges();
  }));

  it('should create component content drawer', fakeAsync(() => {
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(1);
    const drawerRef = drawerService.create({
      vtsTitle: 'Service',
      vtsFooter: 'Footer',
      vtsContent: VtsDrawerCustomComponent,
      vtsContentParams: { value: 1 }
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    expect(drawerRef.getContentComponent()).not.toBeNull();
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.vts-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(drawerRef.getContentComponent()).toBeNull();
  }));

  it('should `vtsOnCancel` work', fakeAsync(() => {
    let canClose = false;
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(1);
    const drawerRef = drawerService.create({
      vtsTitle: 'Service vtsOnCancel',
      vtsContent: VtsDrawerCustomComponent,
      vtsOnCancel: () => Promise.resolve(canClose)
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.vts-drawer .vts-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).not.toHaveBeenCalled();
    fixture.detectChanges();
    canClose = true;
    (overlayContainerElement.querySelector('.vts-drawer .vts-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
  }));
});

@Component({
  template: `
    <button (click)="open()">Open</button>
    <ng-template #closeIconTemplate>
      <i vts-icon vtsType="Close"></i>
    </ng-template>
    <ng-template #titleTemplate>
      <span class="custom-title">title</span>
      <button class="close-btn"></button>
    </ng-template>
    <ng-template #customFooter>
      <span class="custom-footer">footer</span>
      <button>Submit</button>
    </ng-template>
    <vts-drawer
      [vtsMaskStyle]="{ color: 'gray' }"
      [vtsBodyStyle]="{ color: 'gray' }"
      [vtsMaskClosable]="maskClosable"
      [vtsWrapClassName]="'test-class'"
      [vtsZIndex]="1001"
      [vtsCloseIcon]="closeIcon"
      [vtsClosable]="closable"
      [vtsMask]="showMask"
      [vtsVisible]="visible"
      [vtsWidth]="width"
      [vtsHeight]="height"
      [vtsPlacement]="placement"
      [vtsNoAnimation]="noAnimation"
      [vtsTitle]="title"
      [vtsFooter]="footer"
      [vtsOffsetX]="offsetX"
      [vtsOffsetY]="offsetY"
      (vtsOnClose)="close()"
      (vtsVisibleChange)="triggerVisible($event)"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </vts-drawer>
  `
})
class VtsTestDrawerComponent {
  visible = false;
  closable = true;
  maskClosable = true;
  showMask = true;
  title: string | TemplateRef<void> = '';
  footer: string | TemplateRef<void> = '';
  stringTitle = 'test';
  width: string | number = '300px';
  height: string | number = '300px';
  placement = 'left';
  noAnimation = false;
  closeIcon?: TemplateRef<void> | string;
  offsetX = 0;
  offsetY = 0;
  triggerVisible = jasmine.createSpy('visibleChange');

  @ViewChild('titleTemplate', { static: false })
  titleTemplateRef!: TemplateRef<void>;
  @ViewChild('closeIconTemplate', { static: false })
  closeIconTemplateRef!: TemplateRef<void>;
  @ViewChild('customFooter', { static: false })
  templateFooter!: TemplateRef<void>;
  @ViewChild(VtsDrawerComponent, { static: false })
  drawerComponent!: VtsDrawerComponent;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}

@Component({
  template: `
    <ng-template #drawerTemplate>
      <span>Template</span>
    </ng-template>
  `
})
class VtsTestDrawerWithServiceComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate!: TemplateRef<{
    $implicit: number;
    drawerRef: VtsDrawerRef;
  }>;
  templateOpenSpy = jasmine.createSpy('template afterOpen spy');
  templateCloseSpy = jasmine.createSpy('template afterClose spy');
  templateDrawerRef?: VtsDrawerRef;

  constructor(private drawerService: VtsDrawerService) {}

  openTemplate(): void {
    this.templateDrawerRef = this.drawerService.create({
      vtsTitle: 'Service',
      vtsContent: this.drawerTemplate
    });

    this.templateDrawerRef.afterOpen.subscribe(this.templateOpenSpy);
    this.templateDrawerRef.afterClose.subscribe(this.templateCloseSpy);
  }
}

@Component({
  template: `
    <div>
      <p>Custom Component</p>
      <button class="close-btn" (click)="close()" vts-button>Close</button>
    </div>
  `
})
export class VtsDrawerCustomComponent {
  @Input() value: any; // tslint:disable-line:no-any

  constructor(private drawerRef: VtsDrawerRef) {}

  close(): void {
    this.drawerRef.close(this.value);
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-drawer [vtsVisible]="visible" (vtsOnClose)="close()">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </vts-drawer>
    </div>
  `
})
export class VtsTestDrawerRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
