import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsSpinComponent } from './spin.component';
import { VtsSpinModule } from './spin.module';

describe('spin', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsSpinModule, VtsIconTestModule],
      declarations: [VtsTestSpinBasicComponent, VtsTestSpinRtlComponent]
    });
    TestBed.compileComponents();
  }));

  describe('spin basic', () => {
    let fixture: ComponentFixture<VtsTestSpinBasicComponent>;
    let testComponent: VtsTestSpinBasicComponent;
    let spin: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestSpinBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      spin = fixture.debugElement.query(By.directive(VtsSpinComponent));
    });

    it('should className correct', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').firstElementChild!.classList).toContain(
        'vts-spin-dot'
      );
    }));

    it('should size work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').classList).toContain('vts-spin-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').classList).toContain('vts-spin-lg');
    }));

    it('should spinning work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.spinning = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin')).toBeNull();
      testComponent.spinning = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin')).toBeDefined();
    }));

    it('should indicator work', () => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-dot')).toBeDefined();

      testComponent.indicator = testComponent.indicatorTemplate;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.vtsicon-loading')).toBeDefined();
    });

    it('should global config indicator work', () => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-dot')).toBeDefined();

      testComponent.vtsConfigService.set('spin', {
        vtsIndicator: testComponent.indicatorTemplate
      });
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.vtsicon-loading')).toBeDefined();
    });

    it('should delay work', fakeAsync(() => {
      testComponent.delay = 500;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // true -> false
      // This should work immediately
      testComponent.spinning = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin')).toBeNull();

      // false -> true
      // This should be debounced
      testComponent.spinning = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin')).toBeNull();

      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin')).toBeDefined();
    }));

    it('should wrapper work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').classList).toContain(
        'vts-spin-spinning'
      );
      expect(spin.nativeElement.querySelector('.vts-spin-container')).toBeDefined();
      testComponent.simple = true;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-container')).toBeNull();
    }));

    it('should tip work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-text')).toBeNull();
      testComponent.tip = 'tip';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin-text').innerText).toBe('tip');
    }));
  });

  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestSpinRtlComponent);
      const spin = fixture.debugElement.query(By.directive(VtsSpinComponent));
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').classList).toContain('vts-spin-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.vts-spin').classList).not.toContain('vts-spin-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-spin',
  template: `
    <ng-template #indicatorTemplate>
      <i vts-icon vtsType="Sync" style="font-size: 24px;"></i>
    </ng-template>
    <vts-spin
      [vtsTip]="tip"
      [vtsSize]="size"
      [vtsDelay]="delay"
      [vtsSpinning]="spinning"
      [vtsSimple]="simple"
      [vtsIndicator]="indicator"
    >
      <div>test</div>
    </vts-spin>
  `
})
export class VtsTestSpinBasicComponent {
  @ViewChild('indicatorTemplate', { static: false })
  indicatorTemplate!: TemplateRef<void>;

  size = 'default';
  delay = 0;
  spinning = true;
  indicator?: TemplateRef<void>;
  tip?: string;
  simple = false;

  constructor(public vtsConfigService: VtsConfigService) {}
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-spin></vts-test-basic-spin>
    </div>
  `
})
export class VtsTestSpinRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
