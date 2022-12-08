import { Component, ViewChild } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { ComponentBed, createComponentBed } from '../testing/component-bed';
import { VtsElementPatchDirective } from './element-patch.directive';
import { VtsElementPatchModule } from './element-patch.module';

describe('vts-element', () => {
  let testBed: ComponentBed<VtsTestElementPatchComponent>;
  let component: VtsTestElementPatchComponent;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsTestElementPatchComponent, {
      imports: [VtsElementPatchModule, VtsButtonModule]
    });
    component = testBed.component;
  }));

  it('should getters work', () => {
    expect((component.element.nativeElement as HTMLButtonElement).tagName).toBe('BUTTON');
  });
});

@Component({
  template: `
    <button vts-button vts-element>Action</button>
  `
})
export class VtsTestElementPatchComponent {
  @ViewChild(VtsElementPatchDirective) element!: VtsElementPatchDirective;
}
