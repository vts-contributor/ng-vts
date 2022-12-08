import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeOutline } from '@ui-vts/icons-angular/icons';

import { VtsConfigService, VTS_CONFIG } from '@ui-vts/ng-vts/core/config';
import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VTS_ICONS } from '@ui-vts/ng-vts/icon';

import { VtsNotificationModule } from './notification.module';
import { VtsNotificationService } from './notification.service';

@Component({
  template: `
    <ng-template let-data="data">{{ 'test template content' }}{{ data }}</ng-template>
  `
})
export class VtsTestNotificationComponent {
  @ViewChild(TemplateRef, { static: true }) demoTemplateRef!: TemplateRef<{}>;
}

describe('VtsNotification', () => {
  let testBed: ComponentBed<VtsTestNotificationComponent>;
  let notificationService: VtsNotificationService;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<VtsTestNotificationComponent>;
  let vtsConfigService: VtsConfigService;

  function waitForNotificationToggling(): void {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
  }

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsTestNotificationComponent, {
      imports: [VtsNotificationModule, NoopAnimationsModule],
      providers: [
        {
          provide: VTS_ICONS,
          useValue: [HomeOutline]
        },
        {
          provide: VTS_CONFIG,
          useValue: {
            notification: {
              vtsMaxStack: 2
            }
          }
        }
      ]
    });

    fixture = testBed.fixture;
  }));

  beforeEach(inject(
    [VtsNotificationService, OverlayContainer],
    (n: VtsNotificationService, oc: OverlayContainer) => {
      notificationService = n;
      // need init before testing
      const notification = notificationService.success('init', 'init');
      notificationService.remove(notification.messageId);
      // @ts-ignore
      vtsConfigService = notificationService.container.vtsConfigService;
      if (!overlayContainerElement) {
        overlayContainerElement = oc.getContainerElement();
      }
    }
  ));

  afterEach(() => {
    notificationService.remove();
  });

  it('should open a message box with success', () => {
    notificationService.success('test-title', 'SUCCESS');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(
      overlayContainerElement.querySelector('.vts-notification-notice-icon-success')
    ).not.toBeNull();
  });

  it('should open a message box with error', () => {
    notificationService.error('test-title', 'ERROR');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(
      overlayContainerElement.querySelector('.vts-notification-notice-icon-error')
    ).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    notificationService.warning('test-title', 'WARNING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(
      overlayContainerElement.querySelector('.vts-notification-notice-icon-warning')
    ).not.toBeNull();
  });

  it('should open a message box with info', () => {
    notificationService.info('test-title', 'INFO');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(
      overlayContainerElement.querySelector('.vts-notification-notice-icon-info')
    ).not.toBeNull();
  });

  it('should open a message box with blank', () => {
    notificationService.blank('test-title', 'BLANK');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('BLANK');
    expect(overlayContainerElement.querySelector('.vts-notification-notice-icon')).toBeNull();
  });

  it('should auto closed by 1s', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { vtsDuration: 1000 });
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    notificationService.create('', '', 'EXISTS', { vtsDuration: 3000 });
    fixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.vts-notification-notice')!;
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(50000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = notificationService.success('title', 'SUCCESS', {
      vtsDuration: 0
    });
    fixture.detectChanges();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    notificationService.remove(filledMessage.messageId);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [1, 2, 3].forEach(id => {
      const content = `SUCCESS-${id}`;
      notificationService.success('', content);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((notificationService as any).container.instances.length).toBe(2); // tslint:disable-line:no-any
      }
    });

    notificationService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((notificationService as any).container.instances.length).toBe(0); // tslint:disable-line:no-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    notificationService.error('', 'EXISTS', {
      vtsDuration: 1000,
      vtsAnimate: false
    });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));
  it('should reset default config dynamically', fakeAsync(() => {
    vtsConfigService.set('notification', { vtsDuration: 0 });
    notificationService.create('', 'loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should show with placement of topLeft', () => {
    vtsConfigService.set('notification', { vtsPlacement: 'topLeft' });
    notificationService.create('', '', 'EXISTS');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    expect(overlayContainerElement.querySelector('.vts-notification-topLeft')).not.toBeNull();
  });
  // Should support vtsData as context.
  it('should open a message box with template ref', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, {
      vtsData: 'data'
    });
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('test template contentdata');
  });

  it('should update an existing notification with use template ref when change vtsData', () => {
    notificationService.template(fixture.componentInstance.demoTemplateRef, {
      vtsData: 'oldData',
      vtsKey: 'exists'
    });
    expect(overlayContainerElement.textContent).toContain('oldData');
    notificationService.template(fixture.componentInstance.demoTemplateRef, {
      vtsData: 'newData',
      vtsKey: 'exists'
    });
    expect(overlayContainerElement.textContent).toContain('newData');
  });

  it('should update an existing notification when keys are matched', () => {
    notificationService.create('', '', 'EXISTS', { vtsKey: 'exists' });
    expect(overlayContainerElement.textContent).toContain('EXISTS');
    notificationService.create('success', 'Title', 'SHOULD NOT CHANGE', {
      vtsKey: 'exists'
    });
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
    expect(overlayContainerElement.textContent).toContain('Title');
    expect(overlayContainerElement.textContent).toContain('SHOULD NOT CHANGE');
    expect(
      overlayContainerElement.querySelector('.vts-notification-notice-icon-success')
    ).not.toBeNull();
  });

  it('should receive `true` when it is closed by user', fakeAsync(() => {
    let onCloseFlag = false;

    notificationService.create('', '', 'close').onClose!.subscribe(user => {
      if (user) {
        onCloseFlag = true;
      }
    });

    fixture.detectChanges();
    tick(1000);
    const closeEl = overlayContainerElement.querySelector('.vts-notification-notice-close')!;
    dispatchMouseEvent(closeEl, 'click');
    tick(1000);
    expect(onCloseFlag).toBeTruthy();

    waitForNotificationToggling();
  }));

  it('should support configurable vtsTop & vtsBottom', fakeAsync(() => {
    vtsConfigService.set('notification', { vtsTop: 48 });
    notificationService.create('', '', 'TEST TOP', { vtsDuration: 3000 });
    waitForNotificationToggling();
    const notificationContainers = overlayContainerElement.querySelectorAll(
      '.vts-notification'
    ) as NodeListOf<HTMLDivElement>;
    expect(notificationContainers[0].style.top).toBe('48px');
    expect(notificationContainers[0].style.bottom).toBeFalsy();

    vtsConfigService.set('notification', {
      vtsPlacement: 'bottomLeft',
      vtsBottom: '48px'
    });
    notificationService.create('', '', 'TEST BOTTOM');
    waitForNotificationToggling();
    expect(notificationContainers[3].style.top).toBeFalsy();
    expect(notificationContainers[3].style.bottom).toBe('48px');

    waitForNotificationToggling();
  }));

  it('should support close icon', fakeAsync(() => {
    notificationService.create('', '', 'ICON', { vtsCloseIcon: 'home' });
    waitForNotificationToggling();
    expect(overlayContainerElement.querySelector('.vtsicon-home')).toBeTruthy();
  }));
});
