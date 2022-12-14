import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, ViewChild } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsColDirective } from './col.directive';
import { VtsGridModule } from './grid.module';
import { VtsRowDirective } from './row.directive';

const setWindowWidth = (width: number) => {
  viewport.set(width);
  window.dispatchEvent(new Event('resize'));
  tick(100);
};

describe('grid', () => {
  describe('row', () => {
    let rowElement: HTMLElement;
    let colElement: HTMLElement;
    let testBed: ComponentBed<TestGridComponent>;
    beforeEach(() => {
      testBed = createComponentBed(TestGridComponent, {
        imports: [VtsGridModule]
      });
      rowElement = testBed.debugElement.query(By.directive(VtsRowDirective)).nativeElement;
      colElement = testBed.debugElement.query(By.directive(VtsColDirective)).nativeElement;
    });
    it('should apply className', () => {
      expect(rowElement.className).toBe('vts-row');
    });
    it('should apply className according to align', () => {
      const listOfAlign = ['top', 'middle', 'bottom'];
      listOfAlign.forEach(align => {
        testBed.component.align = align;
        testBed.fixture.detectChanges();
        expect(rowElement.classList).toContain(`vts-row-${align}`);
      });
    });
    it('should apply className according to justify', () => {
      const listOfJustify = ['start', 'end', 'center', 'space-around', 'space-between'];
      listOfJustify.forEach(justify => {
        testBed.component.justify = justify;
        testBed.fixture.detectChanges();
        expect(rowElement.classList).toContain(`vts-row-${justify}`);
      });
    });
    it('should gutter number work', () => {
      expect(rowElement.style.cssText).toBe('');
      expect(colElement.style.cssText).toBe('');
      testBed.component.gutter = 16;
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
    });
    it('should gutter string work', () => {
      expect(rowElement.style.cssText).toBe('');
      expect(colElement.style.cssText).toBe('');
      testBed.component.gutter = '16';
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
    });
    it('should gutter number array work', () => {
      testBed.component.gutter = [16, 16];
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -8px;');
      expect(colElement.style.cssText).toBe('padding: 8px;');
    });
    it('should gutter responsive work', fakeAsync(() => {
      testBed.component.gutter = { xs: 8, sm: 16, md: 24 };
      setWindowWidth(480);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -4px; margin-right: -4px;');
      expect(colElement.style.cssText).toBe('padding-left: 4px; padding-right: 4px;');
      setWindowWidth(600);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -8px; margin-right: -8px;');
      expect(colElement.style.cssText).toBe('padding-left: 8px; padding-right: 8px;');
      setWindowWidth(800);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin-left: -12px; margin-right: -12px;');
      expect(colElement.style.cssText).toBe('padding-left: 12px; padding-right: 12px;');
    }));
    it('should gutter responsive array work', fakeAsync(() => {
      testBed.component.gutter = [
        { xs: 8, sm: 16, md: 24 },
        { xs: 4, sm: 8, md: 12 }
      ];
      setWindowWidth(480);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -2px -4px;');
      expect(colElement.style.cssText).toBe('padding: 2px 4px;');
      setWindowWidth(600);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -4px -8px;');
      expect(colElement.style.cssText).toBe('padding: 4px 8px;');
      setWindowWidth(800);
      testBed.fixture.detectChanges();
      expect(rowElement.style.cssText).toBe('margin: -6px -12px;');
      expect(colElement.style.cssText).toBe('padding: 6px 12px;');
    }));
  });
  describe('col', () => {
    let colElement: HTMLElement;
    let testBed: ComponentBed<TestColComponent>;
    const sizeMatch = (name: string, count: number, size?: string): boolean => {
      const middle = size ? `-${size}-` : '-';
      if (name === 'span') {
        return colElement.classList.contains(`vts-col${middle}${count}`);
      } else {
        return colElement.classList.contains(`vts-col${middle}${name}-${count}`);
      }
    };
    beforeEach(() => {
      testBed = createComponentBed(TestColComponent, {
        imports: [VtsGridModule]
      });
      colElement = testBed.debugElement.query(By.directive(VtsColDirective)).nativeElement;
    });
    it('should apply className', () => {
      expect(colElement.className).toBe('vts-col');
    });
    it('should apply style according to flex', () => {
      testBed.component.flex = 1;
      testBed.fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 1 1 auto;');
      testBed.component.flex = '100px';
      testBed.fixture.detectChanges();
      expect(colElement.style.cssText).toBe('flex: 0 0 100px;');
    });
    it('should apply className according to property', () => {
      const propertySizeMatch = (name: keyof TestColComponent, count: number): boolean => {
        testBed.component[name] = count;
        testBed.fixture.detectChanges();
        return sizeMatch(name, count);
      };
      expect(propertySizeMatch('span', 8)).toBe(true);
      expect(propertySizeMatch('offset', 8)).toBe(true);
      expect(propertySizeMatch('order', 8)).toBe(true);
      expect(propertySizeMatch('pull', 8)).toBe(true);
      expect(propertySizeMatch('push', 8)).toBe(true);
      expect(propertySizeMatch('xs', 8)).toBe(true);
      expect(propertySizeMatch('sm', 8)).toBe(true);
      expect(propertySizeMatch('md', 8)).toBe(true);
      expect(propertySizeMatch('lg', 8)).toBe(true);
      expect(propertySizeMatch('xl', 8)).toBe(true);
      expect(propertySizeMatch('xxl', 8)).toBe(true);
    });
    it('should apply className according to responsive size object', () => {
      const batchSizeMatch = (count: number, size: string): boolean => {
        return (
          sizeMatch('span', count, size) &&
          sizeMatch('offset', count, size) &&
          sizeMatch('order', count, size) &&
          sizeMatch('pull', count, size) &&
          sizeMatch('push', count, size)
        );
      };
      testBed.component.xs = { span: 1, offset: 1, order: 1, pull: 1, push: 1 };
      testBed.component.sm = { span: 2, offset: 2, order: 2, pull: 2, push: 2 };
      testBed.component.md = { span: 3, offset: 3, order: 3, pull: 3, push: 3 };
      testBed.component.lg = { span: 4, offset: 4, order: 4, pull: 4, push: 4 };
      testBed.component.xl = { span: 5, offset: 5, order: 5, pull: 5, push: 5 };
      testBed.component.xxl = {
        span: 6,
        offset: 6,
        order: 6,
        pull: 6,
        push: 6
      };
      testBed.fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(true);
      expect(batchSizeMatch(2, 'sm')).toBe(true);
      expect(batchSizeMatch(3, 'md')).toBe(true);
      expect(batchSizeMatch(4, 'lg')).toBe(true);
      expect(batchSizeMatch(5, 'xl')).toBe(true);
      expect(batchSizeMatch(6, 'xxl')).toBe(true);
      testBed.component.xs = { span: 2, offset: 2, order: 2, pull: 2, push: 2 };
      testBed.fixture.detectChanges();
      expect(batchSizeMatch(1, 'xs')).toBe(false);
    });
  });
  describe('RTL', () => {
    let rowElement: HTMLElement;
    let colElement: HTMLElement;
    let testBed: ComponentBed<VtsTestGridRtlComponent>;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestGridRtlComponent, {
        imports: [BidiModule, VtsGridModule]
      });
      rowElement = testBed.debugElement.query(By.directive(VtsRowDirective)).nativeElement;
      colElement = testBed.debugElement.query(By.directive(VtsColDirective)).nativeElement;
    });
    describe('row', () => {
      it('should className correct on dir change', () => {
        expect(rowElement.className).toBe('vts-row vts-row-rtl');

        testBed.fixture.componentInstance.direction = 'ltr';
        testBed.fixture.detectChanges();

        expect(rowElement.className).toBe('vts-row');
      });
    });
    describe('col', () => {
      it('should className correct on dir change', () => {
        expect(colElement.className).toBe('vts-col vts-col-rtl');

        testBed.fixture.componentInstance.direction = 'ltr';
        testBed.fixture.detectChanges();

        expect(colElement.className).toBe('vts-col');
      });
    });
  });
});

@Component({
  template: `
    <div vts-row [vtsGutter]="gutter" [vtsJustify]="justify" [vtsAlign]="align">
      <div vts-col></div>
    </div>
  `
})
export class TestGridComponent {
  gutter:
    | string
    | number
    | null
    | [number, number]
    | { [key: string]: number }
    | [{ [key: string]: number }, { [key: string]: number }] = null;
  flex: string | null = null;
  justify: string | null = null;
  align: string | null = null;
}

@Component({
  template: `
    <div vts-row>
      <div
        vts-col
        [vtsSpan]="span"
        [vtsFlex]="flex"
        [vtsOffset]="offset"
        [vtsOrder]="order"
        [vtsPull]="pull"
        [vtsPush]="push"
        [vtsXs]="xs"
        [vtsSm]="sm"
        [vtsMd]="md"
        [vtsLg]="lg"
        [vtsXl]="xl"
      ></div>
    </div>
  `
})
export class TestColComponent {
  span: number | null = null;
  flex: string | null | number = null;
  offset: number | null = null;
  order: number | null = null;
  pull: number | null = null;
  push: number | null = null;
  xs: number | null | { [key: string]: number } = null;
  sm: number | null | { [key: string]: number } = null;
  md: number | null | { [key: string]: number } = null;
  lg: number | null | { [key: string]: number } = null;
  xl: number | null | { [key: string]: number } = null;
  xxl: number | null | { [key: string]: number } = null;
}

@Component({
  template: `
    <div [dir]="direction">
      <div vts-row>
        <div vts-col></div>
      </div>
    </div>
  `
})
export class VtsTestGridRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
