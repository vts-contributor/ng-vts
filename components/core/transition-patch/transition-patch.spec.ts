/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ɵcreateComponentBed as createComponentBed } from '@ui-vts/ng-vts/core/testing';
import { VtsTransitionPatchDirective } from './transition-patch.directive';
import { VtsTransitionPatchModule } from './transition-patch.module';

describe('transition-patch', () => {
  it('should visible after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchComponent, {
      imports: [VtsTransitionPatchModule]
    });
    const buttonElement = testBed.debugElement.query(
      By.directive(VtsTransitionPatchDirective)
    ).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });
  it('should hidden after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchHiddenComponent, {
      imports: [VtsTransitionPatchModule]
    });
    const buttonElement = testBed.debugElement.query(
      By.directive(VtsTransitionPatchDirective)
    ).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });
  it('should restore after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchRestoreComponent, {
      imports: [VtsTransitionPatchModule]
    });
    const buttonElement = testBed.debugElement.query(
      By.directive(VtsTransitionPatchDirective)
    ).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBe('abc');
  });
  it('should work if hidden binding', () => {
    const testBed = createComponentBed(TestTransitionPatchHiddenBindingComponent, {
      imports: [VtsTransitionPatchModule]
    });
    const buttonElement = testBed.debugElement.query(
      By.directive(VtsTransitionPatchDirective)
    ).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
    testBed.component.hidden = true;
    testBed.fixture.detectChanges();
    expect(buttonElement.getAttribute('hidden')).toBe('');
  });
});

@Component({
  template: `
    <button vts-button></button>
  `
})
export class TestTransitionPatchComponent {}

@Component({
  template: `
    <button vts-button hidden></button>
  `
})
export class TestTransitionPatchHiddenComponent {}

@Component({
  template: `
    <button vts-button hidden="abc"></button>
  `
})
export class TestTransitionPatchRestoreComponent {}

@Component({
  template: `
    <button vts-button [hidden]="hidden"></button>
  `
})
export class TestTransitionPatchHiddenBindingComponent {
  hidden = false;
}
