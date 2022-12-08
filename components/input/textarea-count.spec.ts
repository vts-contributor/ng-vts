import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { VtsInputModule } from '@ui-vts/ng-vts/input/input.module';
import { VtsTextareaCountComponent } from '@ui-vts/ng-vts/input/textarea-count.component';

describe('textarea-count', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VtsInputModule, FormsModule, ReactiveFormsModule],
        declarations: [
          VtsTestInputTextareaCountWithoutMaxComponent,
          VtsTestInputTextareaCountWithMaxComponent
        ],
        providers: []
      }).compileComponents();
    })
  );
  describe('without-max-length', () => {
    let fixture: ComponentFixture<VtsTestInputTextareaCountWithoutMaxComponent>;
    let testComponent: VtsTestInputTextareaCountWithoutMaxComponent;
    let textareaCountElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestInputTextareaCountWithoutMaxComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      textareaCountElement = fixture.debugElement.query(
        By.directive(VtsTextareaCountComponent)
      ).nativeElement;
    });
    it('should count work', () => {
      expect(textareaCountElement.getAttribute('data-count')).toBe('0');
    });
    it('should count update work', fakeAsync(() => {
      testComponent.inputValue = 'test';
      fixture.detectChanges();
      flush();

      expect(textareaCountElement.getAttribute('data-count')).toBe('4');
    }));
  });
  describe('with-max-length', () => {
    let fixture: ComponentFixture<VtsTestInputTextareaCountWithMaxComponent>;
    let testComponent: VtsTestInputTextareaCountWithMaxComponent;
    let textareaCountElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestInputTextareaCountWithMaxComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      textareaCountElement = fixture.debugElement.query(
        By.directive(VtsTextareaCountComponent)
      ).nativeElement;
    });
    it('should count with max length work', () => {
      expect(textareaCountElement.getAttribute('data-count')).toBe('0/100');
    });
    it('should count update with max length work', fakeAsync(() => {
      testComponent.inputValue = 'test';
      fixture.detectChanges();
      flush();

      expect(textareaCountElement.getAttribute('data-count')).toBe('4/100');
    }));
  });
});

@Component({
  template: `
    <vts-textarea-count>
      <textarea rows="4" vts-input [(ngModel)]="inputValue"></textarea>
    </vts-textarea-count>
  `
})
export class VtsTestInputTextareaCountWithoutMaxComponent {
  inputValue = '';
}

@Component({
  template: `
    <vts-textarea-count [vtsMaxCharacterCount]="100">
      <textarea rows="4" vts-input [(ngModel)]="inputValue"></textarea>
    </vts-textarea-count>
  `
})
export class VtsTestInputTextareaCountWithMaxComponent {
  inputValue = '';
}
