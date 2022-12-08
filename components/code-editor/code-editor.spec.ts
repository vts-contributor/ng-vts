import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { VtsCodeEditorModule } from '@ui-vts/ng-vts/code-editor';

import { VtsDemoCodeEditorBasicComponent } from './demo/basic';

// tslint:disable-next-line no-any
declare const monaco: any;

@Component({
  template: `
    <vts-code-editor
      class="editor"
      [ngModel]="code"
      [vtsFullControl]="true"
      (vtsEditorInitialized)="onEditorInit($event)"
    ></vts-code-editor>
  `
})
export class VtsTestCodeEditorFullControlComponent {
  // tslint:disable-next-line no-any
  editor: any;

  code = '';

  // tslint:disable-next-line no-any
  onEditorInit(e: any): void {
    this.editor = e;
    this.editor.setModel(
      monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript')
    );
  }
}

describe('code editor', () => {
  describe('basic', () => {
    // let fixture: ComponentFixture<VtsDemoCodeEditorBasicComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [FormsModule, VtsCodeEditorModule],
          declarations: [VtsDemoCodeEditorBasicComponent]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      // fixture = TestBed.createComponent(VtsDemoCodeEditorBasicComponent);
    });
  });

  describe('full control', () => {
    let fixture: ComponentFixture<VtsTestCodeEditorFullControlComponent>;
    let testComponent: VtsTestCodeEditorFullControlComponent;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [FormsModule, VtsCodeEditorModule],
          declarations: [VtsTestCodeEditorFullControlComponent]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCodeEditorFullControlComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    // It seems that there is no way to waiting for monaco editor to load.
    xit(
      'should raise error when user try to set value in full control mode',
      waitForAsync(() => {
        const spy = spyOn(console, 'warn');
        testComponent.code = '123';
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(
          '[NG-ZORRO]',
          'should not set value when you are using full control mode! It would result in ambiguous data flow!'
        );
      })
    );
  });
});
