import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injector,
  Input,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';

import {
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent
} from '@ui-vts/ng-vts/core/testing';

import { VtsModalRef, VtsModalState } from './modal-ref';
import { VtsModalComponent } from './modal.component';
import { VtsModalModule } from './modal.module';
import { VtsModalService } from './modal.service';

describe('Animation', () => {
  let modalService: VtsModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<TestWithServiceComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsModalModule, TestModalModule, BrowserAnimationsModule]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject(
    [VtsModalService, OverlayContainer],
    (m: VtsModalService, oc: OverlayContainer) => {
      modalService = m;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
    fixture.detectChanges();
  });

  it('should apply animations class', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    fixture.detectChanges();
    flushMicrotasks();

    const modalContentElement = overlayContainerElement.querySelector('.vts-modal');
    expect(modalContentElement!.classList).toContain('zoom-enter');
    expect(modalContentElement!.classList).toContain('zoom-enter-active');
    tick(500);

    modalRef.close();
    fixture.detectChanges();
    flushMicrotasks();
    expect(modalContentElement!.classList).toContain('zoom-leave');
    expect(modalContentElement!.classList).toContain('zoom-leave-active');
    flush();
  }));
});

describe('VtsModal', () => {
  let modalService: VtsModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let configService: VtsConfigService;
  let fixture: ComponentFixture<TestWithServiceComponent>;
  let mockLocation: SpyLocation;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsModalModule, TestModalModule, NoopAnimationsModule, FormsModule],
      providers: [{ provide: Location, useClass: SpyLocation }]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject(
    [VtsModalService, Location, OverlayContainer, VtsConfigService],
    (m: VtsModalService, l: Location, oc: OverlayContainer, cs: VtsConfigService) => {
      modalService = m;
      configService = cs;
      mockLocation = l as SpyLocation;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithServiceComponent);
    fixture.detectChanges();
  });

  it('should open modal with component', () => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsComponentParams: {
        value: 'Modal'
      }
    });

    fixture.detectChanges();

    const modalContentElement = overlayContainerElement.querySelector('.modal-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
    expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
    modalRef.close();
  });

  it('should open modal with template', () => {
    fixture.componentInstance.value = 'Modal';
    fixture.detectChanges();
    const modalRef = modalService.create({
      vtsContent: fixture.componentInstance.templateRef
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-template-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    expect(fixture.componentInstance.modalRef).toBe(modalRef);
    modalRef.close();
  });

  it('should be thrown when attaching repeatedly', () => {
    const modalRefComponent = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsComponentParams: {
        value: 'Modal'
      }
    });

    expect(() => {
      modalRefComponent.containerInstance.attachComponentPortal(
        new ComponentPortal(TestWithModalContentComponent)
      );
    }).toThrowError('Attempting to attach modal content after content is already attached');

    const modalRefTemplate = modalService.create({
      vtsContent: fixture.componentInstance.templateRef
    });

    expect(() => {
      modalRefTemplate.containerInstance.attachTemplatePortal(
        new TemplatePortal(fixture.componentInstance.templateRef, null!)
      );
    }).toThrowError('Attempting to attach modal content after content is already attached');
  });

  it('should open modal with HTML string', () => {
    const modalRef = modalService.create({
      vtsContent: `<span class="modal-html-content">Hello Modal</span>`
    });
    fixture.detectChanges();
    const modalContentElement = overlayContainerElement.querySelector('.modal-html-content');
    expect(modalContentElement).toBeTruthy();
    expect(modalContentElement!.textContent).toBe('Hello Modal');
    modalRef.close();
  });

  it('should emit when modal opening animation is complete', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterOpen spy');

    modalRef.afterOpen.subscribe(spy);
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();

    flushMicrotasks();
    expect(spy).toHaveBeenCalled();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should emit when modal closing animation is complete', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterClose spy');

    modalRef.afterClose.subscribe(spy);

    fixture.detectChanges();

    modalRef.close();
    expect(spy).not.toHaveBeenCalled();

    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should close and get the result', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    modalRef.afterClose.subscribe(afterCloseCallback);
    modalRef.close('Hello Modal');
    fixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledWith('Hello Modal');
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
  }));

  it('should destroy and get the result', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    modalRef.afterClose.subscribe(afterCloseCallback);
    modalRef.destroy('Hello Modal');
    fixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledWith('Hello Modal');
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
  }));

  it('should dispose of modal if view container is destroyed while animating', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    modalRef.close();
    fixture.detectChanges();
    fixture.destroy();
    flush();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
  }));

  it('should close a modal via the escape key', fakeAsync(() => {
    modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
    expect(event.defaultPrevented).toBe(true);
  }));

  it('should not close a modal via the escape key with a modifier', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    const event = createKeyboardEvent('keydown', ESCAPE);
    Object.defineProperty(event, 'altKey', { get: () => true });
    dispatchEvent(document.body, event);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();
    expect(event.defaultPrevented).toBe(false);

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should not close a modal when the vtsKeyboard is false', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsKeyboard: false
    });

    fixture.detectChanges();
    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should not close a modal when the vtsOkLoading is true', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    modalRef.updateConfig({
      vtsOkLoading: true
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

    modalRef.updateConfig({
      vtsOkLoading: false
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
  }));

  it('should not close a modal when the vtsCancelLoading is true', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    modalRef.updateConfig({
      vtsCancelLoading: true
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

    modalRef.updateConfig({
      vtsCancelLoading: false
    });
    fixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
  }));

  it('should close when clicking on the modal wrap', fakeAsync(() => {
    modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    const modalWrapElement = overlayContainerElement.querySelector(
      'vts-modal-container'
    ) as HTMLElement;
    const modalElement = overlayContainerElement.querySelector(
      'vts-modal-container .vts-modal'
    ) as HTMLElement;
    dispatchMouseEvent(modalElement, 'mousedown');
    fixture.detectChanges();
    dispatchMouseEvent(modalWrapElement, 'mouseup');
    flush();
    modalWrapElement.click();
    fixture.detectChanges();
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeFalsy();
  }));

  it("should close when clicking on the modal's close button", fakeAsync(() => {
    modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

    (overlayContainerElement.querySelector('button[vts-modal-close]') as HTMLElement).click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeFalsy();
  }));

  it('should not close when mouseup on the modal wrap and mousedown on the modal body', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    const modalWrap = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;
    const modalBody = overlayContainerElement.querySelector('.vts-modal-body') as HTMLElement;

    dispatchMouseEvent(modalBody, 'mousedown');
    fixture.detectChanges();

    dispatchMouseEvent(modalWrap, 'mouseup');
    flush();
    expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should global config work', fakeAsync(() => {
    configService.set('modal', { vtsMask: false });

    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList).not.toContain(
      'vts-modal-mask',
      'should use global config'
    );

    configService.set('modal', { vtsMask: true });
    fixture.detectChanges();

    expect(modalRef.getBackdropElement()?.classList).toContain(
      'vts-modal-mask',
      'should add class when global config changed'
    );

    configService.set('modal', { vtsMask: false });
    fixture.detectChanges();
    expect(modalRef.getBackdropElement()?.classList).not.toContain(
      'vts-modal-mask',
      'should remove class when global config changed'
    );

    configService.set('modal', { vtsMask: true }); // reset
    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it(
    'should not close when clicking on the modal wrap and ' + 'vtsMaskClosable or vtsMask is false',
    fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsMaskClosable: false
      });

      fixture.detectChanges();

      const modalWrap = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;
      dispatchMouseEvent(modalWrap, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalWrap, 'mouseup');
      flush();
      expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

      modalRef.updateConfig({
        vtsMaskClosable: true,
        vtsMask: false
      });

      fixture.detectChanges();

      dispatchMouseEvent(modalWrap, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalWrap, 'mouseup');
      flush();
      expect(overlayContainerElement.querySelector('vts-modal-container')).toBeTruthy();

      modalRef.close();
      fixture.detectChanges();
      flush();
    })
  );

  it('should notify the observers if all open modals have finished closing', fakeAsync(() => {
    const ref1 = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const ref2 = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterAllClose spy');

    modalService.afterAllClose.subscribe(spy);

    ref1.close();
    fixture.detectChanges();
    flush();

    expect(spy).not.toHaveBeenCalled();

    ref2.close();
    fixture.detectChanges();
    flush();

    expect(spy).toHaveBeenCalled();
  }));

  it('should emit the afterAllClose stream on subscribe if there are no open modals', () => {
    const spy = jasmine.createSpy('afterAllClose spy');

    modalService.afterAllClose.subscribe(spy);

    expect(spy).toHaveBeenCalled();
  });

  it('should set and update the width of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsWidth: 500
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.vts-modal') as HTMLElement;

    expect(modal.style.width).toBe('500px');

    modalRef.updateConfig({
      vtsWidth: 300
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.width).toBe('300px');

    modalRef.updateConfig({
      vtsWidth: '100%'
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.width).toBe('100%');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set and update the z-index of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsZIndex: 1001
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;
    const mask = overlayContainerElement.querySelector('.vts-modal-mask') as HTMLElement;

    expect(modal.style.zIndex).toBe('1001');
    expect(mask.style.zIndex).toBe('1001');

    console.log(mask);
    modalRef.updateConfig({
      vtsZIndex: 1100
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modal.style.zIndex).toBe('1100');
    expect(mask.style.zIndex).toBe('1100');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsWrapClassName of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsWrapClassName: 'test-wrap-class'
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;

    expect(modal.classList).toContain('test-wrap-class');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsCentered of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsCentered: true,
      vtsContent: TestWithModalContentComponent
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;

    expect(modal.classList).toContain('vts-modal-centered');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsClassName of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsClassName: 'test-class-name'
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.vts-modal') as HTMLElement;

    expect(modal.classList).toContain('test-class-name');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.vts-modal') as HTMLElement;

    expect(modal.style.color).toContain('rgb(0, 0, 0)');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsBodyStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsBodyStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();

    const modal = overlayContainerElement.querySelector('.vts-modal-body') as HTMLElement;

    expect(modal.style.color).toContain('rgb(0, 0, 0)');

    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should set the vtsMaskStyle of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsMaskStyle: {
        color: 'rgb(0, 0, 0)'
      }
    });
    fixture.detectChanges();
    flushMicrotasks();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(0, 0, 0)');

    modalRef.updateConfig({
      vtsMaskStyle: {
        color: 'rgb(255, 0, 0)'
      }
    });

    fixture.detectChanges();
    flushMicrotasks();

    expect(modalRef.getBackdropElement()!.style.color).toBe('rgb(255, 0, 0)');
    modalRef.close();
    fixture.detectChanges();
    flush();
  }));

  it('should close all of the modals', fakeAsync(() => {
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({ vtsContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(3);

    modalService.closeAll();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
  }));

  it('should close all open modals when the user goes forwards/backwards in history', fakeAsync(() => {
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({ vtsContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
  }));

  it('should close all open modals when the location hash changes', fakeAsync(() => {
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({ vtsContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(2);

    mockLocation.simulateHashChange('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
  }));

  it('should close all of the modals when the injectable is destroyed', fakeAsync(() => {
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({ vtsContent: TestWithModalContentComponent });

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(2);

    modalService.ngOnDestroy();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
  }));

  it('should complete close streams when the injectable is destroyed', fakeAsync(() => {
    const afterAllCloseSpy = jasmine.createSpy('after all closed spy');
    const afterAllCloseSubscription = modalService.afterAllClose.subscribe({
      complete: afterAllCloseSpy
    });

    modalService.ngOnDestroy();

    expect(afterAllCloseSpy).toHaveBeenCalled();

    afterAllCloseSubscription.unsubscribe();
  }));

  it('should allow the consumer to disable modals a modal on navigation', fakeAsync(() => {
    modalService.create({ vtsContent: TestWithModalContentComponent });
    modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsCloseOnNavigation: false
    });

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(2);

    mockLocation.simulateUrlPop('');
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
  }));

  it('should have the componentInstance available in the afterClose callback', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });
    const spy = jasmine.createSpy('afterClose spy');

    flushMicrotasks();
    fixture.detectChanges();
    flushMicrotasks();

    modalRef.afterClose.subscribe(() => {
      spy();
      expect(modalRef.componentInstance).toBeTruthy();
    });

    modalRef.close();

    flushMicrotasks();
    fixture.detectChanges();
    tick(500);

    expect(spy).toHaveBeenCalled();
  }));

  it('should return the current state of the modal', fakeAsync(() => {
    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent
    });

    expect(modalRef.getState()).toBe(VtsModalState.OPEN);
    modalRef.close();
    fixture.detectChanges();

    expect(modalRef.getState()).toBe(VtsModalState.CLOSING);
    flush();

    expect(modalRef.getState()).toBe(VtsModalState.CLOSED);
  }));

  it('should use injector from viewContainerRef', () => {
    const viewContainerFixture = TestBed.createComponent(TestWithChildViewContainerComponent);
    viewContainerFixture.detectChanges();
    const viewContainerRef = viewContainerFixture.componentInstance.childViewContainer;

    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsViewContainerRef: viewContainerRef
    });

    viewContainerFixture.detectChanges();

    const modalInjector = modalRef.componentInstance!.modalInjector;

    expect(modalRef.componentInstance!.modalRef).toBe(modalRef);
    expect(
      modalInjector.get<TestWithViewContainerDirective>(TestWithViewContainerDirective)
    ).toBeTruthy();

    modalRef.close();
    viewContainerFixture.detectChanges();
  });

  it('should close from a ViewContainerRef with OnPush change detection', fakeAsync(() => {
    const onPushFixture = TestBed.createComponent(TestWithOnPushViewContainerComponent);

    onPushFixture.detectChanges();

    const modalRef = modalService.create({
      vtsContent: TestWithModalContentComponent,
      vtsViewContainerRef: onPushFixture.componentInstance.viewContainerRef
    });

    flushMicrotasks();
    onPushFixture.detectChanges();
    flushMicrotasks();

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

    modalRef.close();
    flushMicrotasks();
    onPushFixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
  }));

  describe('VtsModalRef', () => {
    it('should getElement work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      const container = overlayContainerElement.querySelector('vts-modal-container') as HTMLElement;
      expect(modalRef.getElement()).toBe(container);
      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should triggerOk work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should triggerCancel work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      modalRef.triggerCancel();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should not close the modal when loading', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      modalRef.updateConfig({
        vtsOkLoading: true
      });
      fixture.detectChanges();
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      modalRef.updateConfig({
        vtsOkLoading: false
      });
      fixture.detectChanges();
      modalRef.triggerOk();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should set loading state when the callback is promise', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOnOk: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 200);
          });
        }
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().vtsOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should not close when the callback is return false', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOnOk: () => {
          return false;
        }
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should not close when the callback is return Promise<false>', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOnOk: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(false);
            }, 200);
          });
        }
      });
      fixture.detectChanges();

      modalRef.triggerOk();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().vtsOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));
    it('should not close when the callback is return Promise.reject', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOnOk: () => {
          return new Promise((_, reject) => {
            setTimeout(() => {
              reject('Promise.reject');
            }, 200);
          });
        }
      });
      fixture.detectChanges();

      expectAsync(modalRef.triggerOk()).toBeRejectedWith('Promise.reject');
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsOkLoading).toBe(true);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);
      tick(200);
      fixture.detectChanges();
      flush();
      expect(modalRef.getConfig().vtsOkLoading).toBe(false);
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      modalRef.close();
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));
  });

  describe('focus management', () => {
    // When testing focus, all of the elements must be in the DOM.
    beforeEach(() => document.body.appendChild(overlayContainerElement));
    afterEach(() => document.body.removeChild(overlayContainerElement));

    it('should focus the first tabbable element of the modal on open', fakeAsync(() => {
      modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsClosable: false,
        vtsFooter: null
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).toBe(
        'INPUT',
        'Expected first tabbable element (input) in the modal to be focused.'
      );
    }));

    it('should focus the first tabbable element when content is string type', fakeAsync(() => {
      const modalRef = modalService.confirm({
        vtsContent: 'confirm content'
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(modalRef.containerInstance.getNativeElement().contains(document.activeElement)).toBe(
        true
      );
    }));

    it('should allow disabling focus of the first tabbable element', fakeAsync(() => {
      modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsClosable: false,
        vtsFooter: null,
        vtsAutofocus: null
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).not.toBe('INPUT');
    }));

    it('should re-focus trigger element when modal closes', fakeAsync(() => {
      // Create a element that has focus before the modal is opened.
      const button = document.createElement('button');
      button.id = 'modal-trigger';
      document.body.appendChild(button);
      button.focus();

      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });

      flushMicrotasks();
      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.id).not.toBe(
        'modal-trigger',
        'Expected the focus to change when modal was opened.'
      );

      modalRef.close();
      expect(document.activeElement!.id).not.toBe(
        'modal-trigger',
        'Expcted the focus not to have changed before the animation finishes.'
      );

      flushMicrotasks();
      fixture.detectChanges();
      tick(500);

      expect(document.activeElement!.id).toBe(
        'modal-trigger',
        'Expected that the trigger was refocused after the modal is closed.'
      );

      document.body.removeChild(button);
    }));

    it('should move focus to the container if there are no focusable elements in the modal', fakeAsync(() => {
      modalService.create({
        vtsContent: TestModalWithoutFocusableElementsComponent,
        vtsClosable: false,
        vtsFooter: null
      });

      fixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).toBe(
        'VTS-MODAL-CONTAINER',
        'Expected modal container to be focused.'
      );
    }));
  });

  describe('footer component', () => {
    it('should the ok button work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const okButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      expect(okButton).toBeTruthy();

      okButton.click();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      flush();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should the cancel button work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent
      });
      fixture.detectChanges();
      const spy = jasmine.createSpy('afterClose spy');
      modalRef.afterClose.subscribe(spy);

      const cancelButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(cancelButton).toBeTruthy();

      cancelButton.click();
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();

      flush();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should loading work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOkLoading: true,
        vtsCancelLoading: true
      });
      fixture.detectChanges();

      const okButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      const cancelButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(okButton.classList).toContain('vts-btn-loading');
      expect(cancelButton.classList).toContain('vts-btn-loading');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should loading work', fakeAsync(() => {
      const modalRef = modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsOkDisabled: true,
        vtsCancelDisabled: true
      });
      fixture.detectChanges();

      const okButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      const cancelButton = overlayContainerElement.querySelector(
        'div[vts-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      expect(okButton.disabled).toBe(true);
      expect(cancelButton.disabled).toBe(true);

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set buttons', fakeAsync(() => {
      modalService.create({
        vtsContent: TestWithModalContentComponent,
        vtsFooter: [
          {
            label: 'Test Button0',
            onClick: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(null);
                }, 200);
              });
            }
          },
          {
            label: 'Test Button1',
            loading: () => true
          },
          {
            label: 'Test Button2',
            autoLoading: false,
            onClick: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(null);
                }, 200);
              });
            }
          }
        ]
      });
      fixture.detectChanges();

      const buttons = overlayContainerElement.querySelectorAll(
        'div[vts-modal-footer] button'
      ) as NodeListOf<HTMLButtonElement>;
      expect(buttons[0].textContent!.trim()).toBe('Test Button0');
      expect(buttons[1].textContent!.trim()).toBe('Test Button1');
      expect(buttons[2].textContent!.trim()).toBe('Test Button2');

      expect(buttons[1].classList).toContain('vts-btn-loading');

      buttons[2].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).not.toContain('vts-btn-loading');

      buttons[0].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).toContain('vts-btn-loading');
      buttons[0].click();
      fixture.detectChanges();
      tick();
      expect(buttons[0].classList).toContain('vts-btn-loading');
      flush();
      fixture.detectChanges();
      expect(buttons[0].classList).not.toContain('vts-btn-loading');
    }));
  });

  describe('confirm', () => {
    it('should set default option', () => {
      const modalRef = modalService.confirm({
        vtsContent: 'Test Content',
        vtsTitle: 'Test Title',
        vtsFooter: [{ label: 'Test Footer' }]
      });
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.vts-modal') as HTMLDivElement).style.width
      ).toBe('416px');
      expect(modalRef.getConfig().vtsMaskClosable).toBe(false);
      expect(modalRef.getConfig().vtsCentered).toBe(false);
      expect(overlayContainerElement.querySelectorAll('vts-modal-confirm-container').length).toBe(
        1
      );
      expect(overlayContainerElement.querySelector('.vts-modal-confirm-title')!.textContent).toBe(
        'Test Title'
      );
      expect(overlayContainerElement.querySelector('.vts-modal-confirm-content')!.textContent).toBe(
        'Test Content'
      );
      expect(
        overlayContainerElement.querySelectorAll('.vts-modal-confirm-btns button').length
      ).toBe(2);

      modalRef.close();
    });

    it('should the ok button work', fakeAsync(() => {
      modalService.confirm();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelectorAll('vts-modal-confirm-container').length).toBe(
        1
      );
      const okButton = overlayContainerElement.querySelector(
        '.vts-modal-confirm-btns button:nth-child(2)'
      ) as HTMLButtonElement;
      okButton.click();

      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-confirm-container').length).toBe(
        0
      );
    }));

    it('should the cancel button work', fakeAsync(() => {
      modalService.confirm();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelectorAll('vts-modal-confirm-container').length).toBe(
        1
      );
      const cancelButton = overlayContainerElement.querySelector(
        '.vts-modal-confirm-btns button:nth-child(1)'
      ) as HTMLButtonElement;
      cancelButton.click();

      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('vts-modal-confirm-container').length).toBe(
        0
      );
    }));

    it('should info type work', fakeAsync(() => {
      const modalRef = modalService.info();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsIconType).toBe('info-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should success type work', fakeAsync(() => {
      const modalRef = modalService.success();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsIconType).toBe('check-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should error type work', fakeAsync(() => {
      const modalRef = modalService.error();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsIconType).toBe('Close');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should warning type work', fakeAsync(() => {
      const modalRef = modalService.warning();
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsIconType).toBe('exclamation-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set vtsIconType', fakeAsync(() => {
      const modalRef = modalService.warning({
        vtsIconType: 'info-circle'
      });
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsIconType).toBe('info-circle');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set vtsCancelText', fakeAsync(() => {
      const modalRef = modalService.warning({
        vtsCancelText: 'cancel'
      });
      fixture.detectChanges();
      expect(modalRef.getConfig().vtsCancelText).toBe('cancel');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should set vtsCentered', fakeAsync(() => {
      const modalRef = modalService.confirm({
        vtsCentered: true
      });
      fixture.detectChanges();

      expect(modalRef.getConfig().vtsCentered).toBe(true);

      const modal = overlayContainerElement.querySelector(
        'vts-modal-confirm-container'
      ) as HTMLElement;
      expect(modal.classList).toContain('vts-modal-centered');

      modalRef.close();
      fixture.detectChanges();
      flush();
    }));

    it('should open confirm with component', () => {
      const modalRef = modalService.confirm({
        vtsContent: TestWithModalContentComponent,
        vtsComponentParams: {
          value: 'Confirm'
        }
      });

      fixture.detectChanges();

      const modalContentElement = overlayContainerElement.querySelector('.modal-content');
      expect(modalContentElement).toBeTruthy();
      expect(modalContentElement!.textContent).toBe('Hello Confirm');
      expect(modalRef.getContentComponent() instanceof TestWithModalContentComponent).toBe(true);
      expect(modalRef.getContentComponent().modalRef).toBe(modalRef);
      modalRef.close();
    });
  });

  describe('vts-modal component', () => {
    let componentFixture: ComponentFixture<TestModalComponent>;
    let componentInstance: TestModalComponent;

    beforeEach(() => {
      componentFixture = TestBed.createComponent(TestModalComponent);
      componentFixture.detectChanges();
      componentInstance = componentFixture.componentInstance;
    });

    it('should vtsVisible work', fakeAsync(() => {
      const openSpy = jasmine.createSpy('open spy');
      const closeSpy = jasmine.createSpy('close spy');

      componentInstance.vtsModalComponent.afterClose.subscribe(closeSpy);
      componentInstance.vtsModalComponent.afterOpen.subscribe(openSpy);

      expect(openSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();

      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(openSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      componentInstance.isVisible = false;
      componentFixture.detectChanges();
      flush();

      expect(closeSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should vtsOnCancel work', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'vts-modal-container div[vts-modal-footer] button:nth-child(1)'
      ) as HTMLButtonElement;
      button.click();
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should vtsOnOk work', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.okSpy).not.toHaveBeenCalled();

      const button = overlayContainerElement.querySelector(
        'vts-modal-container div[vts-modal-footer] button:nth-child(2)'
      ) as HTMLButtonElement;
      button.click();
      componentFixture.detectChanges();
      flush();

      expect(componentInstance.okSpy).toHaveBeenCalled();
      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);
    }));

    it('should set vtsContent whit component mode', fakeAsync(() => {
      const modalInstance = componentInstance.vtsModalComponent;

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(modalInstance.getModalRef()!.getConfig().vtsContent).not.toBe(
        componentInstance.templateRef
      );

      componentInstance.content = componentInstance.templateRef;
      componentFixture.detectChanges();

      expect(modalInstance.getModalRef()!.getConfig().vtsContent).toBe(
        componentInstance.templateRef
      );

      modalInstance.close();
      componentFixture.detectChanges();
      flush();
    }));

    it('should global config work', fakeAsync(() => {
      configService.set('modal', {
        vtsMaskClosable: false
      });
      const modalInstance = componentInstance.vtsModalComponent;

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      let modalWrapElement = overlayContainerElement.querySelector(
        'vts-modal-container'
      ) as HTMLElement;
      let modalElement = overlayContainerElement.querySelector(
        'vts-modal-container .vts-modal'
      ) as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalElement, 'mouseup');
      flush();
      modalWrapElement.click();
      fixture.detectChanges();
      flush();

      expect(componentInstance.cancelSpy).not.toHaveBeenCalled();

      configService.set('modal', {
        vtsMaskClosable: true
      });
      componentFixture.detectChanges();
      flush();

      modalWrapElement = overlayContainerElement.querySelector(
        'vts-modal-container'
      ) as HTMLElement;
      modalElement = overlayContainerElement.querySelector(
        'vts-modal-container .vts-modal'
      ) as HTMLElement;

      dispatchMouseEvent(modalWrapElement, 'mousedown');
      fixture.detectChanges();
      dispatchMouseEvent(modalElement, 'mouseup');
      flush();
      modalWrapElement.click();
      fixture.detectChanges();
      flush();
      expect(componentInstance.cancelSpy).toHaveBeenCalled();
    }));

    it('should instance API work', fakeAsync(() => {
      const modalInstance = componentInstance.vtsModalComponent;

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      modalInstance.close();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);

      expect(() => {
        modalInstance.close();
      }).not.toThrowError();

      modalInstance.open();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(1);

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeTruthy();

      modalInstance.destroy();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelectorAll('vts-modal-container').length).toBe(0);

      expect(modalInstance.getContentComponent()).toBeFalsy();
      expect(modalInstance.getElement()).toBeFalsy();

      expect(() => {
        modalInstance.triggerOk();
        modalInstance.triggerCancel();
      }).not.toThrowError();
    }));

    it('should close when the host view is destroyed', fakeAsync(() => {
      componentInstance.isVisible = true;
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('vts-modal-container')).not.toBeNull();

      componentFixture.destroy();
      componentFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('vts-modal-container')).toBeNull();
    }));
  });
});

@Directive({ selector: 'test-with-view-container' })
class TestWithViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  template: `
    <test-with-view-container></test-with-view-container>
  `
})
class TestWithChildViewContainerComponent {
  @ViewChild(TestWithViewContainerDirective)
  childWithViewContainer!: TestWithViewContainerDirective;

  get childViewContainer(): ViewContainerRef {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'hello'
})
class TestWithOnPushViewContainerComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  template: `
    <ng-template let-modalRef="modalRef">
      <span class="modal-template-content">Hello {{ value }}</span>
      {{ setModalRef(modalRef) }}
    </ng-template>
  `
})
class TestWithServiceComponent {
  value?: string;
  modalRef?: VtsModalRef;
  @ViewChild(TemplateRef) templateRef!: TemplateRef<{}>;

  constructor(public vtsModalService: VtsModalService, public viewContainerRef: ViewContainerRef) {}

  setModalRef(modalRef: VtsModalRef): string {
    this.modalRef = modalRef;
    return '';
  }
}

@Component({
  template: `
    <div class="modal-content">Hello {{ value }}</div>
    <input />
    <button (click)="destroyModal()">destroy</button>
  `
})
class TestWithModalContentComponent {
  @Input() value?: string;

  constructor(public modalRef: VtsModalRef, public modalInjector: Injector) {}

  destroyModal(): void {
    this.modalRef.destroy();
  }
}

@Component({
  template: `
    <vts-modal
      [(vtsVisible)]="isVisible"
      [vtsContent]="content"
      vtsTitle="Test Title"
      (vtsOnCancel)="handleCancel()"
      (vtsOnOk)="handleOk()"
    >
      Test Content
    </vts-modal>
    <ng-template>
      <span class="template-test">Test Template Content</span>
    </ng-template>
  `
})
class TestModalComponent {
  isVisible = false;
  cancelSpy = jasmine.createSpy('cancel spy');
  okSpy = jasmine.createSpy('ok spy');
  @ViewChild(VtsModalComponent) vtsModalComponent!: VtsModalComponent;
  @ViewChild(TemplateRef) templateRef!: TemplateRef<{}>;
  content: TemplateRef<{}> = this.templateRef;

  constructor() {}

  handleCancel(): void {
    this.isVisible = false;
    this.cancelSpy();
  }

  handleOk(): void {
    this.isVisible = false;
    this.okSpy();
  }
}

@Component({ template: '<p>Modal</p>' })
class TestModalWithoutFocusableElementsComponent {}

const TEST_DIRECTIVES = [
  TestWithServiceComponent,
  TestWithModalContentComponent,
  TestWithChildViewContainerComponent,
  TestWithViewContainerDirective,
  TestWithOnPushViewContainerComponent,
  TestModalWithoutFocusableElementsComponent,
  TestModalComponent
];

@NgModule({
  imports: [VtsModalModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES
})
class TestModalModule {}
