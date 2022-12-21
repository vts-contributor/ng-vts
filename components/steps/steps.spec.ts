import { BidiModule, Dir } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VtsDividerModule } from '@ui-vts/ng-vts/divider';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsDemoStepsClickableComponent } from './demo/clickable';

import { VtsDemoStepsNavComponent } from './demo/nav';
import { VtsStepComponent } from './step.component';
import { VtsStepsComponent } from './steps.component';
import { VtsStepsModule } from './steps.module';

describe('steps', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsStepsModule, VtsIconTestModule, VtsDividerModule],
      declarations: [
        VtsTestOuterStepsComponent,
        VtsDemoStepsClickableComponent,
        VtsTestInnerStepStringComponent,
        VtsTestInnerStepTemplateComponent,
        VtsTestStepForComponent,
        VtsTestStepAsyncComponent,
        VtsDemoStepsNavComponent,
        VtsTestOuterStepsRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('outer steps', () => {
    let fixture: ComponentFixture<VtsTestOuterStepsComponent>;
    let testComponent: VtsTestOuterStepsComponent;
    let outStep: DebugElement;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestOuterStepsComponent);
      testComponent = fixture.debugElement.componentInstance;
      outStep = fixture.debugElement.query(By.directive(VtsStepsComponent));
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
    });

    it('should init className correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe(
        'vts-steps vts-steps-horizontal vts-steps-label-horizontal'
      );
      expect(innerSteps[0].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-active vts-steps-item-process'
      );
      expect(innerSteps[1].nativeElement.className).toBe('vts-steps-item vts-steps-item-wait');
      expect(innerSteps[2].nativeElement.className).toBe('vts-steps-item vts-steps-item-wait');
    }));

    it('should current change correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.current = 1;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe('vts-steps-item vts-steps-item-finish');
      expect(innerSteps[1].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-process vts-steps-item-active'
      );
      expect(innerSteps[2].nativeElement.className).toBe('vts-steps-item vts-steps-item-wait');
    }));

    it('should tail display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.vts-steps-item-tail')).toBeTruthy();
      expect(innerSteps[1].nativeElement.querySelector('.vts-steps-item-tail')).toBeTruthy();
      expect(innerSteps[2].nativeElement.querySelector('.vts-steps-item-tail')).toBeFalsy();
    }));

    it('should title correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('0title');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('1title');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('2title');
    });

    it('should subtitle correct', () => {
      testComponent.subtitle = '0subtitle';
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-subtitle').innerText.trim()
      ).toBe('0subtitle');
      expect(innerSteps[1].nativeElement.querySelector('.vts-steps-item-subtitle')).toBeFalsy();
      expect(innerSteps[2].nativeElement.querySelector('.vts-steps-item-subtitle')).toBeFalsy();
      testComponent.subtitle = null;
      fixture.detectChanges();
    });

    it('should description correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('0description');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('1description');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('2description');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement
          .querySelector('.vts-steps-item-icon')
          .firstElementChild!.classList.contains('vts-steps-icon')
      ).toBe(true);
      expect(
        innerSteps[1].nativeElement
          .querySelector('.vts-steps-item-icon')
          .firstElementChild!.classList.contains('vts-steps-icon')
      ).toBe(true);
      expect(
        innerSteps[2].nativeElement
          .querySelector('.vts-steps-item-icon')
          .firstElementChild!.classList.contains('vts-steps-icon')
      ).toBe(true);
    });

    it('should size display correct', () => {
      fixture.detectChanges();
      testComponent.size = 'small';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe(
        'vts-steps vts-steps-horizontal vts-steps-label-horizontal vts-steps-small'
      );
    });

    it('should direction display correct', () => {
      fixture.detectChanges();
      testComponent.direction = 'vertical';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe(
        'vts-steps vts-steps-vertical'
      );
    });

    it('should label placement display correct', () => {
      fixture.detectChanges();
      testComponent.labelPlacement = 'vertical';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList).toContain(
        'vts-steps-label-vertical'
      );
    });

    it('should status display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.status = 'wait';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-active vts-steps-item-wait'
      );
      testComponent.status = 'finish';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-active vts-steps-item-finish'
      );
      testComponent.status = 'error';
      testComponent.current = 1;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[1].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-error vts-steps-item-active'
      );
      expect(innerSteps[0].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-finish vts-steps-next-error'
      );
    }));

    it('should processDot display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = true;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList.contains('vts-steps-dot')).toBe(
        true
      );
      expect(
        innerSteps[0].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild!.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
      expect(
        innerSteps[1].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild!.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
      expect(
        innerSteps[2].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild!.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
    }));

    it('should processDot template display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = testComponent.progressTemplate!;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList.contains('vts-steps-dot')).toBe(
        true
      );
      expect(
        innerSteps[0].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild.innerText.trim()
      ).toBe('process0');
      expect(
        innerSteps[1].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild.innerText.trim()
      ).toBe('wait1');
      expect(
        innerSteps[2].nativeElement
          .querySelector('.vts-steps-icon')
          .firstElementChild.innerText.trim()
      ).toBe('wait2');
      expect(
        innerSteps[0].nativeElement
          .querySelector('.vts-steps-icon')
          .lastElementChild.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
      expect(
        innerSteps[1].nativeElement
          .querySelector('.vts-steps-icon')
          .lastElementChild.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
      expect(
        innerSteps[2].nativeElement
          .querySelector('.vts-steps-icon')
          .lastElementChild.classList.contains('vts-steps-icon-dot')
      ).toBe(true);
    }));

    it('should support custom starting index', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.startIndex = 3;
      testComponent.current = 3;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-active vts-steps-item-process'
      );
      expect(innerSteps[1].nativeElement.className).toBe('vts-steps-item vts-steps-item-wait');
      expect(innerSteps[2].nativeElement.className).toBe('vts-steps-item vts-steps-item-wait');
      expect(innerSteps[0].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        '4'
      );
      expect(innerSteps[1].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        '5'
      );
      expect(innerSteps[2].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        '6'
      );
    }));
  });

  describe('inner step string', () => {
    let fixture: ComponentFixture<VtsTestInnerStepStringComponent>;
    let testComponent: VtsTestInnerStepStringComponent;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestInnerStepStringComponent);
      testComponent = fixture.debugElement.componentInstance;
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
    });

    it('should status display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.classList).toContain('vts-steps-item-process');
      expect(innerSteps[1].nativeElement.classList).toContain('vts-steps-item-process');
      expect(innerSteps[2].nativeElement.classList).toContain('vts-steps-item-process');
      testComponent.status = 'wait';
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.classList).toContain('vts-steps-item-wait');
      expect(innerSteps[1].nativeElement.classList).toContain('vts-steps-item-wait');
      expect(innerSteps[2].nativeElement.classList).toContain('vts-steps-item-wait');
    });

    it('should title display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('title');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('title');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('title');
    });

    it('should description display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('description');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('description');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('description');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toBe('vtsicon vtsicon-user');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toBe('vtsicon vtsicon-user');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toBe('vtsicon vtsicon-user');
    });
  });

  describe('inner step template', () => {
    let fixture: ComponentFixture<VtsTestInnerStepTemplateComponent>;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestInnerStepTemplateComponent);
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
    });

    it('should title display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('titleTemplate');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('titleTemplate');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-title').innerText.trim()
      ).toBe('titleTemplate');
    });

    it('should description display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('descriptionTemplate');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('descriptionTemplate');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-item-description').innerText.trim()
      ).toBe('descriptionTemplate');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toContain('vtsicon-smile-o');
      expect(
        innerSteps[1].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toContain('vtsicon-smile-o');
      expect(
        innerSteps[2].nativeElement.querySelector('.vts-steps-icon').firstElementChild.className
      ).toContain('vtsicon-smile-o');
    });
  });

  describe('step ng for', () => {
    it('should title display correct', () => {
      TestBed.createComponent(VtsTestStepForComponent).detectChanges();
    });

    it('should push works correct', () => {
      const comp = TestBed.createComponent(VtsTestStepForComponent);
      comp.detectChanges();
      comp.debugElement.componentInstance.updateSteps();
      comp.detectChanges();
    });
  });

  describe('step async assign steps', () => {
    it('should allow steps assigned asynchronously', fakeAsync(() => {
      const fixture: ComponentFixture<VtsTestStepAsyncComponent> =
        TestBed.createComponent(VtsTestStepAsyncComponent);
      let innerSteps: DebugElement[];

      fixture.detectChanges();
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
      expect(innerSteps.length).toBe(0);

      tick(1000);
      fixture.detectChanges();
      tick();
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
      fixture.detectChanges();
      expect(innerSteps.length).toBe(3);
      expect(innerSteps[0].nativeElement.className).toBe('vts-steps-item vts-steps-item-finish');
      expect(innerSteps[1].nativeElement.className).toBe(
        'vts-steps-item vts-steps-item-active vts-steps-item-process'
      );
      expect(innerSteps[0].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        ''
      );
      expect(innerSteps[1].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        '2'
      );
      expect(innerSteps[2].nativeElement.querySelector('.vts-steps-icon').innerText.trim()).toBe(
        '3'
      );
    }));
  });

  describe('step clickable', () => {
    let fixture: ComponentFixture<VtsDemoStepsClickableComponent>;
    let testComponent: VtsDemoStepsClickableComponent;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoStepsClickableComponent);
      testComponent = fixture.debugElement.componentInstance;
      innerSteps = fixture.debugElement.queryAll(By.directive(VtsStepComponent));
    });

    it('should clickable', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      innerSteps
        .map(step => step.nativeElement.querySelector('.vts-steps-item-container'))
        .forEach((e: HTMLElement) => {
          expect(e.getAttribute('role')).toBe('button');
        });
    }));

    it('should output work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[1].nativeElement.querySelector('.vts-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).toHaveBeenCalledWith(1);
    }));

    it('should disable work', fakeAsync(() => {
      testComponent.disable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const step = innerSteps[0].nativeElement.querySelector(
        '.vts-steps-item-container'
      ) as HTMLElement;
      expect(step.getAttribute('role')).not.toBe('button');
      spyOn(testComponent, 'onIndexChange');
      step.click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
    }));

    it("should can't click when status is process", fakeAsync(() => {
      testComponent.disable = false;
      testComponent.index = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
    }));

    it('should enable and disable work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      innerSteps[1].componentInstance.disable();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[1].nativeElement.querySelector('.vts-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
      innerSteps[1].componentInstance.enable();
      fixture.detectChanges();
      innerSteps[1].nativeElement.querySelector('.vts-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.onIndexChange).toHaveBeenCalledWith(1);
    }));
  });

  describe('navigation', () => {
    let fixture: ComponentFixture<VtsDemoStepsNavComponent>;
    let steps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoStepsNavComponent);
      steps = fixture.debugElement.queryAll(By.directive(VtsStepsComponent));
    });

    it('should clickable', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      steps
        .map(step => step.nativeElement.querySelector('.vts-steps'))
        .forEach((e: HTMLElement) => {
          expect(e.classList).toContain('vts-steps-navigation');
        });
    }));
  });
  describe('RTL', () => {
    it('should className correct on dir change', fakeAsync(() => {
      const fixture = TestBed.createComponent(VtsTestOuterStepsRtlComponent);
      const outStep = fixture.debugElement.query(By.directive(VtsStepsComponent));
      fixture.componentInstance.direction = 'rtl';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.classList).toContain('vts-steps-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.classList).not.toContain('vts-steps-rtl');
    }));
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-outer-steps',
  template: `
    <vts-steps
      [vtsCurrent]="current"
      [vtsDirection]="direction"
      [vtsLabelPlacement]="labelPlacement"
      [vtsSize]="size"
      [vtsStatus]="status"
      [vtsProgressDot]="progressDot"
      [vtsStartIndex]="startIndex"
    >
      <vts-step vtsTitle="0title" [vtsSubtitle]="subtitle" vtsDescription="0description"></vts-step>
      <vts-step vtsTitle="1title" vtsDescription="1description"></vts-step>
      <vts-step vtsTitle="2title" vtsDescription="2description"></vts-step>
    </vts-steps>
    <ng-template #progressTemplate let-dot let-status="status" let-index="index">
      <span class="insert-span">{{ status }}{{ index }}</span>
      <ng-template [ngTemplateOutlet]="dot"></ng-template>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsTestOuterStepsComponent {
  @ViewChild('progressTemplate', { static: false })
  progressTemplate?: TemplateRef<void>;
  current = 0;
  direction = 'horizontal';
  labelPlacement = 'horizontal';
  size = 'default';
  status = 'process';
  subtitle: string | null = null;
  progressDot: boolean | TemplateRef<void> = false;
  startIndex = 0;
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <vts-steps [vtsCurrent]="current">
      <vts-step
        [vtsTitle]="title"
        [vtsDescription]="description"
        [vtsIcon]="icon"
        [vtsStatus]="status"
      ></vts-step>
      <vts-step
        [vtsTitle]="title"
        [vtsDescription]="description"
        [vtsIcon]="icon"
        [vtsStatus]="status"
      ></vts-step>
      <vts-step
        [vtsTitle]="title"
        [vtsDescription]="description"
        [vtsIcon]="icon"
        [vtsStatus]="status"
      ></vts-step>
    </vts-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i vts-icon vtsType="smile-o"></i></ng-template>
  `
})
export class VtsTestInnerStepStringComponent {
  @ViewChild('titleTemplate', { static: false })
  titleTemplate?: TemplateRef<void>;
  @ViewChild('descriptionTemplate', { static: false })
  descriptionTemplate?: TemplateRef<void>;
  @ViewChild('iconTemplate', { static: false })
  iconTemplate?: TemplateRef<void>;
  status = 'process';
  current = 1;
  icon = 'user';
  title = 'title';
  description = 'description';
}

@Component({
  template: `
    <vts-steps [vtsCurrent]="1">
      <vts-step
        [vtsTitle]="titleTemplate"
        [vtsDescription]="descriptionTemplate"
        [vtsIcon]="iconTemplate"
      ></vts-step>
      <vts-step
        [vtsTitle]="titleTemplate"
        [vtsDescription]="descriptionTemplate"
        [vtsIcon]="iconTemplate"
      ></vts-step>
      <vts-step
        [vtsTitle]="titleTemplate"
        [vtsDescription]="descriptionTemplate"
        [vtsIcon]="iconTemplate"
      ></vts-step>
    </vts-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i vts-icon vtsType="smile-o"></i></ng-template>
  `
})
export class VtsTestInnerStepTemplateComponent {}

@Component({
  template: `
    <vts-steps>
      <vts-step *ngFor="let step of steps; trackBy: trackById"></vts-step>
    </vts-steps>
  `
})
export class VtsTestStepForComponent {
  steps = [1, 2, 3];

  trackById(index: number): number {
    return index;
  }

  updateSteps(): void {
    this.steps.push(4);
  }
}

@Component({
  template: `
    <vts-steps [vtsCurrent]="1">
      <vts-step *ngFor="let step of steps; trackBy: trackById"></vts-step>
    </vts-steps>
  `
})
export class VtsTestStepAsyncComponent implements OnInit {
  steps: number[] = [];

  trackById(index: number): number {
    return index;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.steps = [1, 2, 3];
    }, 1000);
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-outer-steps></vts-test-outer-steps>
    </div>
  `
})
export class VtsTestOuterStepsRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
