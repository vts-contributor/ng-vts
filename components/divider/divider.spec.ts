import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsDividerComponent } from './divider.component';
import { VtsDividerModule } from './divider.module';

describe('divider', () => {
  let fixture: ComponentFixture<TestDividerComponent>;
  let context: TestDividerComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsDividerModule, VtsIconTestModule],
      declarations: [TestDividerComponent, TestDividerTextTemplateComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestDividerComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#vtsDashed', () => {
    for (const value of [true, false]) {
      it(`[${value}]`, () => {
        context.vtsDashed = value;
        fixture.detectChanges();
        expect(dl.query(By.css('.vts-divider-dashed')) != null).toBe(value);
      });
    }
  });

  describe('#vtsType', () => {
    for (const value of ['horizontal', 'vertical']) {
      it(`[${value}]`, () => {
        context.vtsType = value;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-divider-${value}`)) != null).toBe(true);
      });
    }
  });

  describe('#vtsText', () => {
    for (const item of [
      { text: 'with text', ret: true },
      { text: undefined, ret: false }
    ]) {
      it(`[${item.text}]`, () => {
        context.vtsText = item.text;
        fixture.detectChanges();
        expect(dl.query(By.css('.vts-divider-inner-text')) != null).toBe(item.ret);
      });
    }

    it('should be custom template', () => {
      let fixtureTemplate: ComponentFixture<TestDividerTextTemplateComponent>;
      fixtureTemplate = TestBed.createComponent(TestDividerTextTemplateComponent);
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.vtsicon-plus')) != null).toBe(true);
    });
  });

  describe('#vtsOrientation', () => {
    ['center', 'left', 'right'].forEach(type => {
      it(`with ${type}`, () => {
        context.vtsOrientation = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-divider-with-text-${type}`)) != null).toBe(true);
      });
    });
  });
});

@Component({
  template: `
    <vts-divider
      #comp
      [vtsDashed]="vtsDashed"
      [vtsType]="vtsType"
      [vtsText]="vtsText"
      [vtsOrientation]="vtsOrientation"
    ></vts-divider>
  `
})
class TestDividerComponent {
  @ViewChild('comp', { static: false }) comp!: VtsDividerComponent;
  vtsDashed = false;
  vtsType = 'horizontal';
  vtsText?: string = 'with text';
  vtsOrientation: string = '';
}

@Component({
  template: `
    <vts-divider vtsDashed [vtsText]="text">
      <ng-template #text>
        <i vts-icon vtsType="PlusOutline:antd"></i>
        Add
      </ng-template>
    </vts-divider>
  `
})
class TestDividerTextTemplateComponent { }
