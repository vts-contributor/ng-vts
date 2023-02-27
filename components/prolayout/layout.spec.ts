import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsContentComponent } from './content.component';
import { VtsFooterComponent } from './footer.component';
import { VtsHeaderComponent } from './header.component';
import { VtsProLayoutComponent } from './pro-layout.component';
import { VtsProLayoutModule } from './layout.module';
import { VtsSiderComponent } from './sider.component';

declare const viewport: VtsSafeAny;

describe('layout', () => {
  describe('basic', () => {
    let testBed: ComponentBed<VtsLayoutBasicComponent>;
    let headers: DebugElement[];
    let contents: DebugElement[];
    let footers: DebugElement[];
    let siders: DebugElement[];
    let layouts: DebugElement[];

    beforeEach(waitForAsync(() => {
      testBed = createComponentBed(VtsLayoutBasicComponent, {
        imports: [VtsProLayoutModule]
      });
      headers = testBed.fixture.debugElement.queryAll(By.directive(VtsHeaderComponent));
      contents = testBed.fixture.debugElement.queryAll(By.directive(VtsContentComponent));
      footers = testBed.fixture.debugElement.queryAll(By.directive(VtsFooterComponent));
      siders = testBed.fixture.debugElement.queryAll(By.directive(VtsSiderComponent));
      layouts = testBed.fixture.debugElement.queryAll(By.directive(VtsProLayoutComponent));
    }));

    it('should have correct class', () => {
      expect(
        headers.every(header => header.nativeElement.classList.contains('vts-layout-header'))
      ).toBe(true);
      expect(layouts.every(layout => layout.nativeElement.classList.contains('vts-layout'))).toBe(
        true
      );
      expect(
        contents.every(content => content.nativeElement.classList.contains('vts-layout-content'))
      ).toBe(true);
      expect(
        footers.every(footer => footer.nativeElement.classList.contains('vts-layout-footer'))
      ).toBe(true);
      expect(
        siders.every(sider => sider.nativeElement.classList.contains('vts-prolayout-sider'))
      ).toBe(true);
      expect(
        siders.every(
          sider =>
            sider.nativeElement.style.cssText ===
            'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
        )
      ).toBe(true);
      expect(layouts[2].nativeElement.classList.contains('vts-layout-has-sider')).toBe(true);
      expect(layouts[4].nativeElement.classList.contains('vts-layout-has-sider')).toBe(true);
      expect(layouts[5].nativeElement.classList.contains('vts-layout-has-sider')).toBe(true);
    });
  });
  describe('side', () => {
    let testBed: ComponentBed<VtsLayoutSideComponent>;
    let testComponent: VtsLayoutSideComponent;
    let sider: DebugElement;
    let trigger: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsLayoutSideComponent, {
        imports: [VtsProLayoutModule]
      });
      testComponent = testBed.component;
      sider = testBed.fixture.debugElement.query(By.directive(VtsSiderComponent));
    });

    it('should vtsCollapsed work', () => {
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.vts-prolayout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
    });
    it('should vtsWidth work', () => {
      testComponent.isCollapsed = false;
      testComponent.width = 300;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.vts-prolayout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText ===
          'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
    });

    it('should vtsReverseArrow work', () => {
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.vts-prolayout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild!.classList.contains('vtsicon-left')).toBe(
        true
      );
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('vtsicon-right')).toBe(
        true
      );
      testComponent.isReverseArrow = true;
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('vtsicon-right')).toBe(
        true
      );
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('vtsicon-left')).toBe(
        true
      );
    });
  });
  describe('custom-trigger', () => {
    let testBed: ComponentBed<VtsLayoutCustomTriggerComponent>;
    let testComponent: VtsLayoutCustomTriggerComponent;

    beforeEach(() => {
      testBed = createComponentBed(VtsLayoutCustomTriggerComponent, {
        imports: [VtsProLayoutModule, VtsIconTestModule]
      });
      testComponent = testBed.component;
    });
    it('should not display trigger', () => {
      testBed.fixture.detectChanges();
      const trigger = testBed.fixture.debugElement.query(By.css('.vts-prolayout-sider-trigger'));
      expect(trigger).toBeNull();
    });
    it('should display trigger', () => {
      testComponent.changeTrigger();
      testBed.fixture.detectChanges();
      const trigger = testBed.fixture.debugElement.query(By.css('.vts-prolayout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild!.classList.contains('vtsicon-up')).toBe(true);
      expect(trigger).not.toBeNull();
    });
  });
  describe('responsive', () => {
    let testBed: ComponentBed<VtsLayoutResponsiveComponent>;
    let sider: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsLayoutResponsiveComponent, {
        imports: [VtsProLayoutModule]
      });
      sider = testBed.fixture.debugElement.query(By.directive(VtsSiderComponent));
    });

    it('should responsive work', fakeAsync(() => {
      viewport.set(500);
      window.dispatchEvent(new Event('resize'));
      testBed.fixture.detectChanges();
      tick(1000);
      testBed.fixture.detectChanges();
      discardPeriodicTasks();
      testBed.fixture.detectChanges();
      expect(sider.nativeElement.style.cssText).toBe(
        'flex: 0 0 0px; max-width: 0px; min-width: 0px; width: 0px;'
      );
      expect(
        sider.nativeElement
          .querySelector('.vts-prolayout-sider-zero-width-trigger')
          .firstElementChild.getAttribute('vtsType')
      ).toBe('menu-fold');
      viewport.reset();
    }));
  });
  describe('RTL', () => {
    let testBed: ComponentBed<VtsTestLayoutRtlComponent>;
    let layouts: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestLayoutRtlComponent, {
        imports: [BidiModule, VtsProLayoutModule],
        declarations: [VtsLayoutBasicComponent]
      });
      layouts = testBed.fixture.debugElement.queryAll(By.directive(VtsProLayoutComponent));
    });

    it('should className correct on dir change', fakeAsync(() => {
      testBed.fixture.detectChanges();
      expect(
        layouts.every(layout => layout.nativeElement.classList.contains('vts-layout-rtl'))
      ).toBe(true);

      testBed.fixture.componentInstance.direction = 'ltr';
      testBed.fixture.detectChanges();

      expect(
        layouts.every(layout => layout.nativeElement.classList.contains('vts-layout-rtl'))
      ).toBe(false);
    }));
  });
});

@Component({
  template: `
    <vts-layout>
      <vts-sider
        vtsCollapsible
        [(vtsCollapsed)]="isCollapsed"
        [vtsTrigger]="triggerTemplate"
      ></vts-sider>
      <vts-layout>
        <vts-header>
          <i
            class="trigger"
            vts-icon
            [vtsType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            (click)="isCollapsed = !isCollapsed"
          ></i>
        </vts-header>
        <vts-content>
          <div>Bill is a cat.</div>
        </vts-content>
        <vts-footer>Ant Design ©2019 Implement By Angular</vts-footer>
      </vts-layout>
    </vts-layout>
    <ng-template #trigger>
      <i vts-icon vtsType="ArrowMiniUp"></i>
    </ng-template>
  `
})
export class VtsLayoutCustomTriggerComponent {
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger', { static: true }) customTrigger!: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}

@Component({
  template: `
    <vts-layout>
      <vts-sider
        vtsCollapsible
        [(vtsCollapsed)]="isCollapsed"
        [vtsWidth]="width"
        [vtsReverseArrow]="isReverseArrow"
      ></vts-sider>
      <vts-layout>
        <vts-header></vts-header>
        <vts-content>
          <div>Bill is a cat.</div>
        </vts-content>
        <vts-footer>Ant Design ©2019 Implement By Angular</vts-footer>
      </vts-layout>
    </vts-layout>
  `
})
export class VtsLayoutSideComponent {
  isCollapsed = false;
  isReverseArrow = false;
  width: string | number = '200px';
}

@Component({
  template: `
    <vts-layout>
      <vts-sider
        vtsCollapsible
        [(vtsCollapsed)]="isCollapsed"
        [vtsBreakpoint]="'lg'"
        [vtsCollapsedWidth]="0"
        [vtsZeroTrigger]="zeroTrigger"
      ></vts-sider>
      <vts-layout>
        <vts-header></vts-header>
        <vts-content>
          <div>Content</div>
        </vts-content>
        <vts-footer>Ant Design ©2019 Implement By Angular</vts-footer>
      </vts-layout>
    </vts-layout>
    <ng-template #zeroTrigger>
      <i vts-icon vtsType="menu-fold"></i>
    </ng-template>
  `
})
export class VtsLayoutResponsiveComponent {
  isCollapsed = false;
}

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-layout-basic',
  template: `
    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-content>Content</vts-content>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-layout>
        <vts-sider>Sider</vts-sider>
        <vts-content>Content</vts-content>
      </vts-layout>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-layout>
        <vts-content>Content</vts-content>
        <vts-sider>Sider</vts-sider>
      </vts-layout>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-sider>Sider</vts-sider>
      <vts-layout>
        <vts-header>Header</vts-header>
        <vts-content>Content</vts-content>
        <vts-footer>Footer</vts-footer>
      </vts-layout>
    </vts-layout>
  `
})
export class VtsLayoutBasicComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-layout-basic></vts-test-layout-basic>
    </div>
  `
})
export class VtsTestLayoutRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
