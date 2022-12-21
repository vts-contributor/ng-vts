import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';

import { VtsTimelineComponent } from './timeline.component';
import { VtsTimelineModule } from './timeline.module';

describe('vts-timeline', () => {
  describe('basic', () => {
    let testBed: ComponentBed<VtsTestTimelineBasicComponent>;
    let fixture: ComponentFixture<VtsTestTimelineBasicComponent>;
    let testComponent: VtsTestTimelineBasicComponent;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestTimelineBasicComponent, {
        imports: [VtsTimelineModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(VtsTimelineComponent));
      items = Array.from(
        (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.vts-timeline-item')
      );
    });

    it('should init className correct', () => {
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('vts-timeline');
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].classList).not.toContain('vts-timeline-item-last');
      expect(items[3].classList).toContain('vts-timeline-item-last');
    });

    it('should color work', () => {
      fixture.detectChanges();
      expect(items[0].querySelector('.vts-timeline-item-head')!.classList).toContain(
        'vts-timeline-item-head-blue'
      );
      testComponent.color = 'red';
      fixture.detectChanges();
      expect(items[0].querySelector('.vts-timeline-item-head')!.classList).toContain(
        'vts-timeline-item-head-red'
      );
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(items[0].querySelector('.vts-timeline-item-head')!.classList).toContain(
        'vts-timeline-item-head-green'
      );
    });

    it('should dot work', () => {
      fixture.detectChanges();
      expect((items[0].querySelector('.vts-timeline-item-head') as HTMLDivElement).innerText).toBe(
        'dot'
      );
      expect((items[1].querySelector('.vts-timeline-item-head') as HTMLDivElement).innerText).toBe(
        'template'
      );
    });

    it('should last work', () => {
      fixture.detectChanges();
      expect(items.length).toBe(4);
      testComponent.last = true;
      fixture.detectChanges();
      items = Array.from(
        (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.vts-timeline-item')
      );
      expect(items.length).toBe(5);
      expect(items[4]!.classList).toContain('vts-timeline-item-last');
    });

    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.vts-timeline-item-pending')).toBeNull();
      testComponent.pending = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.vts-timeline-item-pending').innerText).toBe('');
      testComponent.pending = 'pending';
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.vts-timeline-item-pending').innerText).toBe(
        'pending'
      );
    });

    it('should reverse work', () => {
      fixture.detectChanges();
      testComponent.pending = true;
      testComponent.reverse = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.firstElementChild!.classList).toContain(
        'vts-timeline-item-pending'
      );
      expect(items[0].classList).toContain('vts-timeline-item-last');
      expect(items[3].classList).not.toContain('vts-timeline-item-last');
    });

    it('should alternate position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'alternate';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).toContain(
        'vts-timeline-alternate'
      );
      expect(items[0].classList).toContain('vts-timeline-item-left');
      expect(items[1].classList).toContain('vts-timeline-item-right');
      expect(items[2].classList).toContain('vts-timeline-item-left');
    });

    it('should alternate right position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'right';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('vts-timeline-right');
      expect(items[0].classList).toContain('vts-timeline-item-right');
      expect(items[1].classList).toContain('vts-timeline-item-right');
      expect(items[2].classList).toContain('vts-timeline-item-right');
    });
  });

  // add another test component for simplicity
  it('should custom position work', () => {
    let testBed: ComponentBed<VtsTestTimelineCustomPositionComponent>;
    let fixture: ComponentFixture<VtsTestTimelineCustomPositionComponent>;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    testBed = createComponentBed(VtsTestTimelineCustomPositionComponent, {
      imports: [VtsTimelineModule]
    });
    fixture = testBed.fixture;

    fixture.detectChanges();

    timeline = fixture.debugElement.query(By.directive(VtsTimelineComponent));
    items = Array.from(
      (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.vts-timeline-item')
    );
    // console.log(fixture.debugElement.nativeElement.outerHTML);

    expect(timeline.nativeElement.firstElementChild!.classList).toContain('vts-timeline-alternate');
    expect(items[0].classList).toContain('vts-timeline-item-right');
  });

  describe('custom color', () => {
    let testBed: ComponentBed<VtsTestTimelineCustomColorComponent>;
    let fixture: ComponentFixture<VtsTestTimelineCustomColorComponent>;
    let items: HTMLLIElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestTimelineCustomColorComponent, {
        imports: [VtsTimelineModule]
      });
      fixture = testBed.fixture;

      fixture.detectChanges();

      items = Array.from(
        (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.vts-timeline-item')
      );
    });

    it('should support custom color', () => {
      fixture.detectChanges();
      expect(
        (items[0].querySelector('.vts-timeline-item-head') as HTMLDivElement)!.style.borderColor
      ).toBe('cyan');
      expect(
        (items[1].querySelector('.vts-timeline-item-head') as HTMLDivElement)!.style.borderColor
      ).toBe('rgb(200, 0, 0)');
      expect(
        (items[2].querySelector('.vts-timeline-item-head') as HTMLDivElement)!.style.borderColor
      ).toBe('rgb(120, 18, 65)'); // hex would be converted to rgb()
      expect(
        (items[3].querySelector('.vts-timeline-item-head') as HTMLDivElement)!.style.borderColor
      ).toBe('');
    });
  });

  describe('pending', () => {
    let testBed: ComponentBed<VtsTestTimelinePendingComponent>;
    let fixture: ComponentFixture<VtsTestTimelinePendingComponent>;
    let timeline: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsTestTimelinePendingComponent, {
        imports: [VtsTimelineModule]
      });
      fixture = testBed.fixture;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(VtsTimelineComponent));
    });

    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.vts-timeline-item-pending').innerText).toBe(
        'template'
      );
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<VtsTestTimelineRtlComponent>;
    let fixture: ComponentFixture<VtsTestTimelineRtlComponent>;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    beforeEach(waitForAsync(() => {
      testBed = createComponentBed(VtsTestTimelineRtlComponent, {
        imports: [BidiModule, VtsTimelineModule],
        declarations: [VtsTestTimelineBasicComponent]
      });

      fixture = testBed.fixture;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(VtsTimelineComponent));
      items = Array.from(
        (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.vts-timeline-item')
      );
    }));

    it('should init className correct', () => {
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('vts-timeline-rtl');
      expect(items.length).toBeGreaterThan(0);

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).not.toContain('vts-timeline-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-timeline',
  template: `
    <ng-template #dotTemplate>template</ng-template>
    <vts-timeline [vtsPending]="pending" [vtsReverse]="reverse" [vtsMode]="mode">
      <vts-timeline-item [vtsColor]="color" [vtsDot]="dot">
        Create a services site 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item [vtsDot]="dotTemplate">
        Solve initial network problems 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item>Technical testing 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Network problems being solved 2015-09-01</vts-timeline-item>
      <vts-timeline-item *ngIf="last">Network problems being solved 2015-09-01</vts-timeline-item>
    </vts-timeline>
  `
})
export class VtsTestTimelineBasicComponent {
  color = 'blue';
  dot = 'dot';
  pending: boolean | string = false;
  last = false;
  reverse = false;
  mode = 'left';
}

@Component({
  template: `
    <vts-timeline>
      <vts-timeline-item [vtsColor]="'cyan'">Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item [vtsColor]="'rgb(200, 0, 0)'">
        Solve initial network problems 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item [vtsColor]="'#781241'">Technical testing 2015-09-01</vts-timeline-item>
      <vts-timeline-item [vtsColor]="'red'">
        Network problems being solved 2015-09-01
      </vts-timeline-item>
    </vts-timeline>
  `
})
export class VtsTestTimelineCustomColorComponent {}

@Component({
  template: `
    <ng-template #pendingTemplate>template</ng-template>
    <vts-timeline [vtsPending]="pendingTemplate">
      <vts-timeline-item>Technical testing 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Network problems being solved 2015-09-01</vts-timeline-item>
    </vts-timeline>
  `
})
export class VtsTestTimelinePendingComponent {}

@Component({
  template: `
    <vts-timeline vtsMode="custom">
      <vts-timeline-item vtsPosition="right">Right</vts-timeline-item>
      <vts-timelint-item vtsPosition="left">Left</vts-timelint-item>
    </vts-timeline>
  `
})
export class VtsTestTimelineCustomPositionComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-timeline></vts-test-basic-timeline>
    </div>
  `
})
export class VtsTestTimelineRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
