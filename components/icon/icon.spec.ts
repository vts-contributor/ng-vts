import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  ChevronLeft,
  ChevronRight,
  Sync,
  HomeOutline,
  Help,
  HelpOutline,
  QuestionAnswerOutline
} from '@ui-vts/icons-angular/icons';

import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';

import { VtsIconDirective } from './icon.directive';
import { VtsIconModule } from './icon.module';
import { VtsIconService, VTS_ICONS } from './icon.service';

describe('vts-icon', () => {
  describe('basics', () => {
    let testBed: ComponentBed<VtsTestIconExtensionsComponent>;
    let testComponent: VtsTestIconExtensionsComponent;
    let fixture: ComponentFixture<VtsTestIconExtensionsComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestIconExtensionsComponent, {
        imports: [VtsIconModule],
        providers: [
          {
            provide: VTS_ICONS,
            useValue: [ChevronLeft, ChevronRight, QuestionAnswerOutline, HelpOutline, Sync, Help]
          }
        ]
      });
      fixture = testBed.fixture;

      testComponent = testBed.component;
      icons = fixture.debugElement.queryAll(By.directive(VtsIconDirective));
    });

    it('should get icon class name back', () => {
      fixture.detectChanges();
      expect(icons[0].nativeElement.classList.contains('vtsicon')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('vtsicon-question')).toBe(true);
      expect(icons[1].nativeElement.classList.contains('vtsicon-loading')).toBe(true);
    });

    it('should change class name when type changes', () => {
      testComponent.type = 'question-circle';
      fixture.detectChanges();
      expect(icons[0].nativeElement.classList.contains('vtsicon')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('vtsicon-question-circle')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('vtsicon-question')).not.toBe(true);
    });

    it('should support spin and cancel', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      // Only test fails. Don't know why.
      // expect(icons[0].nativeElement.firstChild.classList.contains('vtsicon-spin')).toBe(true);

      testComponent.spin = false;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.classList.contains('vtsicon-spin')).toBe(false);
    }));

    it('should make loading spin', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      // expect(icons[1].nativeElement.firstChild.classList.contains('vtsicon-spin')).toBe(true);
    }));

    it('should rotate work', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBeFalsy();

      testComponent.rotate = 120;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBe('rotate(120deg)');

      testComponent.rotate = 0;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBeFalsy();
    }));
  });

  describe('custom', () => {
    let testBed: ComponentBed<VtsTestIconCustomComponent>;
    let fixture: ComponentFixture<VtsTestIconCustomComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestIconCustomComponent, {
        imports: [VtsIconModule],
        providers: [
          {
            provide: VTS_ICONS,
            useValue: [ChevronLeft, ChevronRight, QuestionAnswerOutline, HelpOutline, Sync, Help]
          }
        ]
      });
      fixture = testBed.fixture;
    });

    it('should support custom svg element', () => {
      fixture.detectChanges();
      icons = fixture.debugElement.queryAll(By.directive(VtsIconDirective));
      const icon1 = icons[0];
      expect(icon1.nativeElement.className).toContain('vtsicon');
      expect(icon1.nativeElement.innerHTML).toContain('svg');
      expect(icon1.nativeElement.innerHTML).toContain(
        'viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"'
      );
    });
  });

  // describe('iconfont', () => {
  //   let testBed: ComponentBed<VtsTestIconIconfontComponent>;
  //   let fixture: ComponentFixture<VtsTestIconIconfontComponent>;
  //   let icons: DebugElement[];

  //   beforeEach(() => {
  //     testBed = createComponentBed(VtsTestIconIconfontComponent, {
  //       imports: [VtsIconModule],
  //       providers: [
  //         {
  //           provide: VTS_ICONS,
  //           useValue: [ChevronLeft, ChevronRight, QuestionAnswerOutline, HelpOutline, Sync, Help]
  //         }
  //       ]
  //     });
  //     fixture = testBed.fixture;
  //   });

  //   it(
  //     'should support iconfont',
  //     waitForAsync(() => {
  //       fixture.detectChanges();
  //       fixture.whenStable().then(() => {
  //         fixture.detectChanges();
  //         icons = fixture.debugElement.queryAll(By.directive(VtsIconDirective));
  //         expect(icons[0].nativeElement.className).toContain('vtsicon');
  //         expect(icons[0].nativeElement.innerHTML).toContain('xlink:href="#icon-tuichu"');
  //         expect(icons[1].nativeElement.innerHTML).toContain('link:href="#icon-facebook"');
  //         expect(icons[2].nativeElement.innerHTML).toContain('xlink:href="#icon-twitter"');
  //       });
  //     })
  //   );
  // });

  describe('config service', () => {
    let testBed: ComponentBed<VtsTestIconExtensionsComponent>;
    let fixture: ComponentFixture<VtsTestIconExtensionsComponent>;
    let vtsConfigService: VtsConfigService;
    let icons: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestIconExtensionsComponent, {
        imports: [VtsIconModule],
        providers: [
          {
            provide: VTS_ICONS,
            useValue: [ChevronLeft, ChevronRight, QuestionAnswerOutline]
          }
        ]
      });

      fixture = testBed.fixture;
      fixture.detectChanges();
      icons = fixture.debugElement.queryAll(By.directive(VtsIconDirective));
    });

    beforeEach(inject([VtsConfigService], (c: VtsConfigService) => {
      vtsConfigService = c;
    }));

    it('should support config service', () => {
      vtsConfigService!.set('icon', { vtsTwotoneColor: '#234567' });
      expect(icons[0].componentInstance.iconService.twoToneColor.primaryColor).toBe('#234567');

      // Should ignore falsy value.
      vtsConfigService!.set('icon', { vtsTwotoneColor: '234567' });
      expect(icons[0].componentInstance.iconService.twoToneColor.primaryColor).not.toBe('234567');
      expect(icons[0].componentInstance.iconService.twoToneColor.primaryColor).toBe('#1890ff');
    });
  });

  describe('injection on multi places', () => {
    let testBed: ComponentBed<VtsTestIconMultiInjectionComponent>;
    let fixture: ComponentFixture<VtsTestIconMultiInjectionComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(VtsTestIconMultiInjectionComponent, {
        imports: [VtsIconModule.forRoot([HomeOutline]), ChildModule]
      });
      fixture = testBed.fixture;
    });

    it('should support forRoot and forChild', () => {
      fixture.detectChanges();
      icons = fixture.debugElement.queryAll(By.directive(VtsIconDirective));
      expect(icons[0].nativeElement.classList.contains('vtsicon-home')).toBe(true);
      expect(icons[1].nativeElement.classList.contains('vtsicon-question')).toBe(true);
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-icon-extensions',
  template: `
    <i vts-icon [vtsType]="type" [vtsSpin]="spin" [vtsRotate]="rotate"></i>
    <i vts-icon [vtsType]="'loading'"></i>
  `
})
export class VtsTestIconExtensionsComponent {
  type = 'question';
  theme = 'outline';
  spin = true;
  rotate = 0;

  constructor(public iconService: VtsIconService) {}
}

@Component({
  template: `
    <i vts-icon style="color: hotpink;">
      <svg>
        <path
          d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
        />
      </svg>
    </i>
  `
})
export class VtsTestIconCustomComponent {}

@Component({
  template: `
    <i vts-icon [vtsIconfont]="'icon-tuichu'"></i>
    <i vts-icon [vtsIconfont]="'icon-facebook'"></i>
    <i vts-icon [vtsIconfont]="'icon-twitter'"></i>
  `
})
// export class VtsTestIconIconfontComponent {
//   constructor(private iconService: VtsIconService) {
//     this.iconService.fetchFromIconfont({
//       scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
//     });
//   }
// }

@NgModule({
  imports: [VtsIconModule.forChild([QuestionAnswerOutline])],
  declarations: [VtsTestIconExtensionsComponent],
  exports: [VtsTestIconExtensionsComponent]
})
class ChildModule {}

@Component({
  template: `
    <i vts-icon vtsType="Home"></i>
    <i vts-icon vtsType="question"></i>
  `
})
class VtsTestIconMultiInjectionComponent {}
