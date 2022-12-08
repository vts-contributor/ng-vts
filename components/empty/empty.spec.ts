import { CommonModule } from '@angular/common';
import { Component, DebugElement, Inject, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VtsConfigService, VTS_CONFIG } from '@ui-vts/ng-vts/core/config';
import { ComponentBed, createComponentBed } from '../core/testing/component-bed';
import { VtsI18nService } from '../i18n';
import en_US from '../i18n/languages/en_US';
import { VtsListModule } from '../list';
import { VTS_EMPTY_COMPONENT_NAME } from './config';
import { VtsEmbedEmptyComponent } from './embed-empty.component';
import { VtsEmptyComponent } from './empty.component';
import { VtsEmptyModule } from './empty.module';

describe('vts-empty', () => {
  describe('basic', () => {
    let testBed: ComponentBed<VtsEmptyTestBasicComponent>;
    let fixture: ComponentFixture<VtsEmptyTestBasicComponent>;
    let testComponent: VtsEmptyTestBasicComponent;
    let emptyComponent: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsEmptyTestBasicComponent, {
        imports: [VtsEmptyModule]
      });

      fixture = testBed.fixture;
      testComponent = testBed.component;
      emptyComponent = fixture.debugElement.query(By.directive(VtsEmptyComponent));

      fixture.detectChanges();
    });

    it('should render image, description on default situation', () => {
      expect(emptyComponent.nativeElement.classList.contains('vts-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;

      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('vts-empty-image')).toBe(true);
      expect(imageEl.firstElementChild.tagName).toBe('VTS-EMPTY-DEFAULT');

      const contentEl = emptyComponent.nativeElement.lastElementChild;
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText.trim()).toBe('暂无数据');
    });

    it('should render image, content and footer as template', () => {
      testComponent.image = testComponent.imageTpl;
      testComponent.content = testComponent.contentTpl;
      testComponent.footer = testComponent.footerTpl;

      fixture.detectChanges();

      expect(emptyComponent.nativeElement.classList.contains('vts-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;
      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('vts-empty-image')).toBe(true);
      expect(imageEl.innerText).toBe('Image');

      const contentEl = emptyComponent.nativeElement.querySelector('.vts-empty-description');
      expect(contentEl).not.toBeFalsy();
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText).toBe('Content');

      const footerEl = emptyComponent.nativeElement.lastElementChild;
      expect(footerEl.tagName).toBe('DIV');
      expect(footerEl.classList.contains('vts-empty-footer')).toBe(true);
      expect(footerEl.innerText).toBe('Footer');
    });

    it('should render image, content and footer as string and change `alt`', () => {
      testComponent.image = 'https://ng.ant.design/assets/img/logo.svg';
      testComponent.content = 'zorro icon';
      testComponent.footer = 'Footer';
      fixture.detectChanges();

      expect(emptyComponent.nativeElement.classList.contains('vts-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;
      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('vts-empty-image')).toBe(true);
      expect(imageEl.firstElementChild.tagName).toBe('IMG');
      expect(imageEl.firstElementChild.getAttribute('alt')).toBe('zorro icon');
      expect(imageEl.firstElementChild.src).toContain('ng.ant.design');

      const contentEl = emptyComponent.nativeElement.querySelector('.vts-empty-description');
      expect(contentEl).not.toBeFalsy();
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText).toBe('zorro icon');

      const footerEl = emptyComponent.nativeElement.lastElementChild;
      expect(footerEl.tagName).toBe('DIV');
      expect(footerEl.classList.contains('vts-empty-footer')).toBe(true);
      expect(footerEl.innerText).toBe('Footer');
    });

    it('should render empty string as content', () => {
      testComponent.content = '';
      fixture.detectChanges();

      const contentEl = emptyComponent.nativeElement.querySelector('.vts-empty-description');
      expect(contentEl).not.toBeFalsy();
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText).toBe('');
    });

    it('i18n', () => {
      const contentEl = emptyComponent.nativeElement.lastElementChild;
      expect(contentEl.innerText.trim()).toBe('暂无数据');

      testBed.bed.inject(VtsI18nService).setLocale(en_US);
      fixture.detectChanges();
      expect(contentEl.innerText.trim()).toBe('No Data');
    });
  });

  /**
   * Config default empty content via `VtsEmptyService`'s `setDefaultEmptyContent` method.
   */
  describe('embed', () => {
    let fixture: ComponentFixture<VtsEmptyTestServiceComponent>;
    let testComponent: VtsEmptyTestServiceComponent;
    let embedComponent: DebugElement;
    let emptyComponent: DebugElement;

    describe('service method', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [VtsEmptyTestServiceModule]
        }).compileComponents();

        fixture = TestBed.createComponent(VtsEmptyTestServiceComponent);
        testComponent = fixture.debugElement.componentInstance;
      });

      it("should components' prop has priority", fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(VtsEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(VtsEmptyComponent));
        };

        refresh();

        // Default.
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeTruthy();
        expect(emptyComponent.nativeElement.classList.contains('vts-empty')).toBe(true);
        expect(emptyComponent.nativeElement.classList.contains('vts-empty-normal')).toBe(true);
        const imageEl = emptyComponent.nativeElement.firstChild;
        expect(imageEl.tagName).toBe('DIV');
        expect(imageEl.classList.contains('vts-empty-image')).toBe(true);
        expect(imageEl.firstElementChild.tagName).toBe('VTS-EMPTY-SIMPLE');

        // Prop.
        testComponent.noResult = 'list';
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('list');

        // Null.
        testComponent.noResult = null;
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('');
      }));

      it('should support string, template and component', fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(VtsEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(VtsEmptyComponent));
        };

        // String.
        testComponent.configService.set('empty', {
          vtsDefaultEmptyContent: 'empty'
        });
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('empty');

        // Template.
        testComponent.changeToTemplate();
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        const divEl = embedComponent.nativeElement.firstElementChild;
        expect(divEl).toBeTruthy();
        expect(divEl.tagName).toBe('DIV');
        expect(divEl.innerText).toBe('I am in template list');

        // FIXME: This is not supported yet, see https://github.com/angular/angular/issues/15634.
        // Component.
        // testComponent.changeToComponent();
        // refresh();
        // expect(embedComponent).toBeTruthy();
        // expect(emptyComponent).toBeFalsy();
        // const componentEl = embedComponent.nativeElement.nextSibling;
        // expect(componentEl).toBeTruthy();
        // expect(componentEl.tagName).toBe('VTS-EMPTY-TEST-CUSTOM');
        // expect(componentEl.innerText).toBe(`I'm in component list`);

        // Reset.
        testComponent.reset();
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeTruthy();
        expect(emptyComponent.nativeElement.classList.contains('vts-empty')).toBe(true);
        expect(emptyComponent.nativeElement.classList.contains('vts-empty-normal')).toBe(true);
        const imageEl = emptyComponent.nativeElement.firstChild;
        expect(imageEl.tagName).toBe('DIV');
        expect(imageEl.classList.contains('vts-empty-image')).toBe(true);
        expect(imageEl.firstElementChild.tagName).toBe('VTS-EMPTY-SIMPLE');
      }));
    });

    /**
     * Config default empty content via injection.
     */
    describe('service injection', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [VtsEmptyTestInjectionModule]
        }).compileComponents();

        fixture = TestBed.createComponent(VtsEmptyTestServiceComponent);
        testComponent = fixture.debugElement.componentInstance;
      });

      it('should support injection', fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick(100);
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(VtsEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(VtsEmptyComponent));
        };

        refresh();

        // Component.
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        const componentEl = embedComponent.nativeElement.firstElementChild;
        expect(componentEl).toBeTruthy();
        expect(componentEl.tagName).toBe('VTS-EMPTY-TEST-CUSTOM');
        expect(componentEl.innerText).toBe(`I'm in component list`);
      }));
    });
  });
});

@Component({
  template: `
    <vts-empty [vtsNotFoundImage]="image" [vtsNoResult]="content" [vtsNotFoundFooter]="footer">
      <ng-template #imageTpl>Image</ng-template>
      <ng-template #contentTpl>Content</ng-template>
      <ng-template #footerTpl>Footer</ng-template>
    </vts-empty>
  `
})
export class VtsEmptyTestBasicComponent {
  @ViewChild('imageTpl', { static: false }) imageTpl!: TemplateRef<void>;
  @ViewChild('contentTpl', { static: false }) contentTpl!: TemplateRef<void>;
  @ViewChild('footerTpl', { static: false }) footerTpl!: TemplateRef<void>;

  image?: TemplateRef<void> | string;
  content?: TemplateRef<void> | string;
  footer?: TemplateRef<void> | string;
}

@Component({
  template: `
    <vts-list [vtsDataSource]="[]" [vtsNoResult]="noResult"></vts-list>
    <ng-template #tpl let-component>
      <div>I am in template {{ component }}</div>
    </ng-template>
  `
})
export class VtsEmptyTestServiceComponent {
  @ViewChild('tpl', { static: false }) template!: TemplateRef<string>;

  noResult?: string | null;

  constructor(public configService: VtsConfigService) {}

  reset(): void {
    this.configService.set('empty', { vtsDefaultEmptyContent: undefined });
  }

  changeToTemplate(): void {
    this.configService.set('empty', { vtsDefaultEmptyContent: this.template });
  }
}

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-empty-test-custom',
  template: `
    <div>I'm in component {{ name }}</div>
  `
})
export class VtsEmptyTestCustomComponent {
  constructor(@Inject(VTS_EMPTY_COMPONENT_NAME) public name: string) {}
}

@NgModule({
  imports: [CommonModule, VtsEmptyModule, VtsListModule],
  declarations: [VtsEmptyTestServiceComponent, VtsEmptyTestCustomComponent],
  exports: [VtsEmptyTestServiceComponent, VtsEmptyTestCustomComponent]
})
export class VtsEmptyTestServiceModule {}

@NgModule({
  imports: [CommonModule, VtsEmptyModule, VtsListModule],
  declarations: [VtsEmptyTestServiceComponent, VtsEmptyTestCustomComponent],
  exports: [VtsEmptyTestServiceComponent, VtsEmptyTestCustomComponent],
  providers: [
    {
      provide: VTS_CONFIG,
      useValue: {
        empty: {
          vtsDefaultEmptyContent: VtsEmptyTestCustomComponent
        }
      }
    }
  ]
})
export class VtsEmptyTestInjectionModule {}
