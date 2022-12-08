import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsButtonComponent, VtsButtonShape, VtsButtonSize, VtsButtonType } from './index';

describe('button', () => {
  describe('className', () => {
    let testBed: ComponentBed<TestButtonComponent>;
    let buttonElement: HTMLButtonElement;
    beforeEach(() => {
      testBed = createComponentBed(TestButtonComponent, {
        declarations: [VtsButtonComponent]
      });
      buttonElement = testBed.debugElement.query(By.directive(VtsButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      expect(buttonElement.className).toBe('vts-btn');
    });
    it('should apply classname based on vtsGhost', () => {
      expect(buttonElement.classList).not.toContain('vts-btn-background-ghost');
      testBed.component.vtsGhost = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-background-ghost');
    });
    it('should apply classname based on vtsSearch', () => {
      expect(buttonElement.classList).not.toContain('vts-input-search-button');
      testBed.component.vtsSearch = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-input-search-button');
    });
    it('should apply classname based on vtsLoading', () => {
      expect(buttonElement.classList).not.toContain('vts-btn-loading');
      testBed.component.vtsLoading = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-loading');
    });
    it('should apply classname based on vtsBlock', () => {
      expect(buttonElement.classList).not.toContain('vts-btn-block');
      testBed.component.vtsBlock = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-block');
    });
    it('should apply classname based on vtsType', () => {
      testBed.component.vtsType = 'primary';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-primary');
      testBed.component.vtsType = 'link';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-link');
      // testBed.component.vtsType = 'dashed';
      // testBed.fixture.detectChanges();
      // expect(buttonElement.classList).toContain('vts-btn-dashed');
      testBed.component.vtsType = null;
      testBed.fixture.detectChanges();
      expect(buttonElement.className).toBe('vts-btn');
    });
    it('should apply classname based on vtsShape', () => {
      testBed.component.vtsShape = 'round';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-round');
      testBed.component.vtsShape = 'circle';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-circle');
    });
    it('should apply classname based on vtsSize', () => {
      testBed.component.vtsSize = 'large';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-lg');
      testBed.component.vtsSize = 'small';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-sm');
      testBed.component.vtsSize = 'default';
      testBed.fixture.detectChanges();
      expect(buttonElement.className).toBe('vts-btn');
    });
  });
  describe('loading icon', () => {
    it('should hide icon when loading correct', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonBindingComponent, {
        imports: [VtsIconTestModule],
        declarations: [VtsButtonComponent]
      });
      const buttonElement = testBed.debugElement.query(
        By.directive(VtsButtonComponent)
      ).nativeElement;
      expect(buttonElement.classList.contains('vts-btn-loading')).toBe(false);
      expect(buttonElement.classList).not.toContain('vts-btn-icon-only');
      expect(buttonElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(buttonElement.firstElementChild!.classList.contains('vtsicon-poweroff')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('vtsicon-loading')).toBe(false);
      buttonElement.click();
      testBed.fixture.detectChanges();
      expect(buttonElement.classList.contains('vts-btn-loading')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('vtsicon-loading')).toBe(true);
      expect(buttonElement.querySelector('.vtsicon-poweroff').style.cssText).toBe('display: none;');
      tick(5000);
      testBed.fixture.detectChanges();
      expect(buttonElement.classList.contains('vts-btn-loading')).toBe(false);
      expect(buttonElement.firstElementChild!.classList.contains('vtsicon-loading')).toBe(false);
      expect(buttonElement.querySelector('.vtsicon-poweroff').style.cssText).toBe('');
    }));
  });
  describe('insert span', () => {
    it('should insert span correctly', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonWithIconComponent, {
        imports: [VtsIconTestModule],
        declarations: [VtsButtonComponent]
      });
      const buttonElement = testBed.debugElement.query(
        By.directive(VtsButtonComponent)
      ).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.firstElementChild.tagName).toBe('SPAN');
      tick(5000);
      testBed.fixture.detectChanges();
      expect(buttonElement.firstElementChild.innerText).toContain('button');
    }));
  });
  describe('icon only', () => {
    it('should icon only works correctly', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonIconOnlyComponent, {
        imports: [VtsIconTestModule],
        declarations: [VtsButtonComponent]
      });
      const buttonElement = testBed.debugElement.query(
        By.directive(VtsButtonComponent)
      ).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-icon-only');
    }));
    it('should icon only loading works correctly', () => {
      const testBed = createComponentBed(TestButtonIconOnlyLoadingComponent, {
        imports: [VtsIconTestModule],
        declarations: [VtsButtonComponent]
      });
      testBed.fixture.detectChanges();
      const buttonElement = testBed.debugElement.query(
        By.directive(VtsButtonComponent)
      ).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-icon-only');
    });
  });
  describe('RTL', () => {
    let testBed: ComponentBed<TestButtonRtlComponent>;
    let buttonElement: HTMLButtonElement;
    beforeEach(() => {
      testBed = createComponentBed(TestButtonRtlComponent, {
        declarations: [VtsButtonComponent],
        imports: [BidiModule]
      });
      buttonElement = testBed.debugElement.query(By.directive(VtsButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('vts-btn-rtl');

      testBed.fixture.componentInstance.direction = 'ltr';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('vts-btn-rtl');
    });
  });
});

@Component({
  template: `
    <button
      vts-button
      [vtsType]="vtsType"
      [vtsGhost]="vtsGhost"
      [vtsSearch]="vtsSearch"
      [vtsLoading]="vtsLoading"
      [vtsShape]="vtsShape"
      [vtsBlock]="vtsBlock"
      [vtsSize]="vtsSize"
    >
      button
    </button>
  `
})
export class TestButtonComponent {
  @Input() vtsBlock: boolean = false;
  @Input() vtsGhost: boolean = false;
  @Input() vtsSearch: boolean = false;
  @Input() vtsLoading: boolean = false;
  @Input() vtsType: VtsButtonType = null;
  @Input() vtsShape: VtsButtonShape = null;
  @Input() vtsSize: VtsButtonSize = 'default';
}
// https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191
@Component({
  template: `
    <button vts-button vtsType="primary" (click)="load()" [vtsLoading]="loading">
      <i vts-icon vtsType="SettingsPower"></i>
      {{ 'Click me!' }}
    </button>
  `
})
export class TestButtonBindingComponent {
  loading = false;
  load(): void {
    this.loading = true;
    setTimeout(() => (this.loading = false), 5000);
  }
}
// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079
@Component({
  template: `
    <button vts-button>
      {{ title }}
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </button>
  `
})
export class TestButtonWithIconComponent implements OnInit {
  title?: string;
  ngOnInit(): void {
    setTimeout(() => (this.title = 'button'), 5000);
  }
}

@Component({
  template: `
    <button vts-button>
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </button>
  `
})
export class TestButtonIconOnlyComponent {}

@Component({
  template: `
    <button vts-button vtsLoading>
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </button>
  `
})
export class TestButtonIconOnlyLoadingComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <button
        vts-button
        [vtsType]="vtsType"
        [vtsGhost]="vtsGhost"
        [vtsSearch]="vtsSearch"
        [vtsLoading]="vtsLoading"
        [vtsShape]="vtsShape"
        [vtsBlock]="vtsBlock"
        [vtsSize]="vtsSize"
      >
        button
      </button>
    </div>
  `
})
export class TestButtonRtlComponent extends TestButtonComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
