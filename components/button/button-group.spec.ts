import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, Input, ViewChild } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ɵcreateComponentBed as createComponentBed } from '@ui-vts/ng-vts/core/testing';
import { VtsButtonGroupComponent, VtsButtonGroupSize } from './button-group.component';

describe('button-group', () => {
  it('should button group size work', () => {
    const testBed = createComponentBed(TestButtonGroupComponent, {
      declarations: [VtsButtonGroupComponent]
    });
    const buttonGroupElement = testBed.debugElement.query(
      By.directive(VtsButtonGroupComponent)
    ).nativeElement;
    expect(buttonGroupElement.className).toBe('vts-btn-group');
    testBed.component.vtsSize = 'large';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('vts-btn-group-lg');
    testBed.component.vtsSize = 'small';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('vts-btn-group-sm');
  });

  it('should RTL classname work', fakeAsync(() => {
    const testBed = createComponentBed(VtsTestButtonGroupRtlComponent, {
      declarations: [VtsButtonGroupComponent],
      imports: [BidiModule]
    });
    const buttonGroupElement = testBed.debugElement.query(
      By.directive(VtsButtonGroupComponent)
    ).nativeElement;
    expect(buttonGroupElement.className).toBe('vts-btn-group vts-btn-group-rtl');
    testBed.component.direction = 'ltr';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.className).toBe('vts-btn-group');
  }));
});

@Component({
  template: `
    <vts-button-group [vtsSize]="vtsSize"></vts-button-group>
  `
})
export class TestButtonGroupComponent {
  @Input() vtsSize: VtsButtonGroupSize = 'default';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-button-group></vts-button-group>
    </div>
  `
})
export class VtsTestButtonGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
