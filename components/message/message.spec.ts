import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VtsConfigService, VTS_CONFIG } from '@ui-vts/ng-vts/core/config';
import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';

import { VtsMessageModule } from './message.module';
import { VtsMessageService } from './message.service';

describe('message', () => {
  let testBed: ComponentBed<VtsTestMessageComponent>;
  let messageService: VtsMessageService;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<VtsTestMessageComponent>;
  let testComponent: VtsTestMessageComponent;
  let vtsConfigService: VtsConfigService;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsTestMessageComponent, {
      imports: [VtsMessageModule, NoopAnimationsModule],
      providers: [
        {
          provide: VTS_CONFIG,
          useValue: {
            message: {
              vtsMaxStack: 2,
              vtsTop: 24
            }
          }
        }
      ]
    });

    fixture = testBed.fixture;
    testComponent = testBed.component;
  }));

  beforeEach(inject(
    [VtsMessageService, OverlayContainer],
    (m: VtsMessageService, oc: OverlayContainer) => {
      messageService = m;
      // need init before testing
      const message = messageService.success('init');
      messageService.remove(message.messageId);
      // @ts-ignore
      vtsConfigService = messageService.container.vtsConfigService;
      if (!overlayContainerElement) {
        overlayContainerElement = oc.getContainerElement();
      }
    }
  ));

  afterEach(() => {
    messageService.remove();
  });

  it('should open a message box with success', () => {
    messageService.success('SUCCESS');
    fixture.detectChanges();

    expect(
      (overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement).style.zIndex
    ).toBe('1010');
    expect(overlayContainerElement.textContent).toContain('SUCCESS');
    expect(overlayContainerElement.querySelector('.vtsicon-check-circle')).not.toBeNull();
  });

  it('should open a message box with error', () => {
    messageService.error('ERROR');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toContain('ERROR');
    expect(overlayContainerElement.querySelector('.vtsicon-Close')).not.toBeNull();
  });

  it('should open a message box with warning', () => {
    messageService.warning('WARNING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('WARNING');
    expect(overlayContainerElement.querySelector('.vtsicon-exclamation-circle')).not.toBeNull();
  });

  it('should open a message box with info', () => {
    messageService.info('INFO');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('INFO');
    expect(overlayContainerElement.querySelector('.vtsicon-info-circle')).not.toBeNull();
  });

  it('should open a message box with loading', () => {
    messageService.loading('LOADING');
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('LOADING');
    expect(overlayContainerElement.querySelector('.vtsicon-loading')).not.toBeNull();
  });

  it('should support template', fakeAsync(() => {
    messageService.info(testComponent.template);
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Content in template');
    tick(10000);
  }));

  it('should auto closed by 1s', fakeAsync(() => {
    messageService.create('', 'EXISTS', { vtsDuration: 1000 });
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('EXISTS');

    tick(1200 + 10); // Wait for animation with 200ms
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroy when hovered', fakeAsync(() => {
    messageService.create('', 'EXISTS', { vtsDuration: 3000 });
    fixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.vts-message-notice')!;
    dispatchMouseEvent(messageElement, 'mouseenter');
    tick(5000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');

    dispatchMouseEvent(messageElement, 'mouseleave');
    tick(5000);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should not destroyed automatically but manually', fakeAsync(() => {
    const filledMessage = messageService.success('SUCCESS', { vtsDuration: 0 });
    fixture.detectChanges();

    tick(50000);
    expect(overlayContainerElement.textContent).toContain('SUCCESS');

    messageService.remove(filledMessage.messageId);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS');
  }));

  it('should keep the balance of messages length and then remove all', fakeAsync(() => {
    [1, 2, 3].forEach(id => {
      const content = `SUCCESS-${id}`;
      messageService.success(content);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(content);
      if (id === 3) {
        expect(overlayContainerElement.textContent).not.toContain('SUCCESS-1');
        expect((messageService as any).container.instances.length).toBe(2); // tslint:disable-line:no-any
      }
    });

    messageService.remove();
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).not.toContain('SUCCESS-3');
    expect((messageService as any).container.instances.length).toBe(0); // tslint:disable-line:no-any
  }));

  it('should destroy without animation', fakeAsync(() => {
    messageService.error('EXISTS', { vtsDuration: 1000, vtsAnimate: false });
    fixture.detectChanges();
    tick(1000 + 10);
    expect(overlayContainerElement.textContent).not.toContain('EXISTS');
  }));

  it('should reset default config from config service', fakeAsync(() => {
    vtsConfigService.set('message', { vtsDuration: 0 });
    messageService.create('loading', 'EXISTS');
    fixture.detectChanges();
    tick(10000);
    expect(overlayContainerElement.textContent).toContain('EXISTS');
  }));

  it('should emit event when message close', fakeAsync(() => {
    const closeSpy = jasmine.createSpy('message closed');
    const msg = messageService.create('loading', 'CLOSE');
    const messageId = msg.messageId;
    msg.onClose!.subscribe(closeSpy);
    fixture.detectChanges();
    messageService.remove(messageId);
    tick(2000);
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  }));

  it('should container top to configured', fakeAsync(() => {
    messageService.create('top', 'CHANGE');
    fixture.detectChanges();

    const messageContainerElement = overlayContainerElement.querySelector(
      '.vts-message'
    ) as HTMLElement;
    expect(messageContainerElement.style.top).toBe('24px');

    tick(50000);
  }));

  describe('RTL', () => {
    it('should apply classname', () => {
      vtsConfigService.set('message', { vtsDirection: 'rtl' });
      messageService.info('INFO');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('INFO');
      expect(overlayContainerElement.querySelector('.vts-message-rtl')).not.toBeNull();
    });
  });
});

@Component({
  template: `
    <ng-template #contentTemplate>Content in template</ng-template>
  `
})
export class VtsTestMessageComponent {
  @ViewChild('contentTemplate', { static: true }) template!: TemplateRef<void>;
}
