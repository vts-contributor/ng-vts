import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsSkeletonModule } from './skeleton.module';
import {
  VtsSkeletonAvatar,
  VtsSkeletonAvatarShape,
  VtsSkeletonAvatarSize,
  VtsSkeletonButtonShape,
  VtsSkeletonButtonSize,
  VtsSkeletonParagraph,
  VtsSkeletonTitle
} from './skeleton.type';

describe('skeleton', () => {
  let fixture: ComponentFixture<VtsTestSkeletonComponent>;
  let testComp: VtsTestSkeletonComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsSkeletonModule],
      declarations: [VtsTestSkeletonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(VtsTestSkeletonComponent);
    testComp = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#vtsActive', () => {
    it('should active work', () => {
      expect(dl.nativeElement.querySelector('.vts-skeleton-active')).toBeFalsy();
      testComp.vtsActive = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-active')).toBeTruthy();
    });
  });

  describe('#vtsTitle', () => {
    it('should basic width prop work', () => {
      expect(dl.nativeElement.querySelector('.vts-skeleton-title')).toBeFalsy();
      testComp.vtsTitle = true;
      testComp.vtsAvatar = false;
      testComp.vtsParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('38%');
      testComp.vtsAvatar = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('50%');
      testComp.vtsParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('');
    });
    it('should customize width props work', () => {
      testComp.vtsTitle = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('');
      testComp.vtsTitle = { width: '50%' };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('50%');
      testComp.vtsTitle = { width: 200 };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-title').style.width).toBe('200px');
    });
  });

  describe('#vtsAvatar', () => {
    it('should basic avatar props work', () => {
      testComp.vtsTitle = true;
      testComp.vtsAvatar = true;
      testComp.vtsParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-square')).toBeTruthy();
      expect(dl.nativeElement.querySelector('.vts-skeleton-with-avatar')).toBeTruthy();
      testComp.vtsParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-circle')).toBeTruthy();
    });
    for (const type of ['square', 'circle']) {
      it(`should customize shape ${type} work`, () => {
        testComp.vtsAvatar = { shape: type } as VtsSkeletonAvatar;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-skeleton-avatar-${type}`)) !== null).toBe(true);
      });
    }
    for (const type of [
      { size: 'large', cls: 'lg' },
      { size: 'small', cls: 'sm' }
    ]) {
      it(`should customize size ${type.size} work`, () => {
        testComp.vtsAvatar = { size: type.size } as VtsSkeletonAvatar;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-skeleton-avatar-${type.cls}`)) !== null).toBe(true);
      });
    }
  });

  describe('#vtsParagraph', () => {
    it('should basic rows and width work', () => {
      testComp.vtsTitle = true;
      testComp.vtsAvatar = true;
      testComp.vtsParagraph = true;
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(2);
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('');
      testComp.vtsAvatar = false;
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(3);
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('61%');
    });
    it('should width type is string or number work', () => {
      testComp.vtsParagraph = { width: 100 };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.vtsParagraph = { width: 100, rows: 3 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('100px');
    });
    it('should define width type is Array work', () => {
      testComp.vtsParagraph = { width: [200, '100px', '90%'] };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('200px');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.vtsParagraph = { width: [200, '100px', '90%'], rows: 4 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.vts-skeleton-paragraph > li');
      expect(paragraphs[2].style.width).toBe('90%');
      expect(paragraphs[3].style.width).toBe('');
    });
  });

  describe('#vtsRound', () => {
    it('should round work', () => {
      expect(dl.nativeElement.querySelector('.vts-skeleton-round')).toBeFalsy();
      testComp.vtsRound = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.vts-skeleton-round')).toBeTruthy();
    });
  });
});

describe('skeleton element', () => {
  let fixture: ComponentFixture<VtsTestSkeletonElementComponent>;
  let testComp: VtsTestSkeletonElementComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsSkeletonModule],
      declarations: [VtsTestSkeletonElementComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(VtsTestSkeletonElementComponent);
    testComp = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should vtsActive work', () => {
    expect(dl.nativeElement.querySelector('.vts-skeleton-active')).toBeFalsy();
    testComp.vtsActive = true;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-active')).toBeTruthy();
    testComp.useSuite = 4;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-active')).toBeTruthy();
  });

  it('should vtsSize work', () => {
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-lg')).toBeFalsy();
    testComp.vtsSize = 'large';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-lg')).toBeTruthy();
    testComp.vtsSize = 40;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar').style.width).toBe('40px');
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar').style.height).toBe('40px');
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar').style.lineHeight).toBe('40px');
    // number size only work in 'avatar' type
    testComp.useSuite = 2;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-button').style.width).toBeFalsy();
  });

  it('should vtsShape work', () => {
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-circle')).toBeNull();
    testComp.vtsShape = 'circle';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-circle')).toBeTruthy();
    testComp.vtsShape = 'square';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-avatar-square')).toBeTruthy();

    testComp.useSuite = 2;
    testComp.vtsShape = 'round';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.vts-skeleton-button-round')).toBeTruthy();
  });

  it('should image svg work', () => {
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('svg')).toBeNull();
    testComp.useSuite = 4;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('svg')).toBeTruthy();
  });
});

@Component({
  template: `
    <vts-skeleton
      [vtsActive]="vtsActive"
      [vtsAvatar]="vtsAvatar"
      [vtsTitle]="vtsTitle"
      [vtsParagraph]="vtsParagraph"
      [vtsRound]="vtsRound"
    ></vts-skeleton>
  `
})
export class VtsTestSkeletonComponent {
  vtsActive: boolean = false;
  vtsRound: boolean = false;
  vtsAvatar: VtsSkeletonAvatar | boolean = false;
  vtsTitle: VtsSkeletonTitle | boolean = false;
  vtsParagraph: VtsSkeletonParagraph | boolean = false;
}

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <vts-skeleton-element
        *ngSwitchCase="1"
        vtsType="avatar"
        [vtsActive]="vtsActive"
        [vtsSize]="vtsSize"
        [vtsShape]="vtsShape"
      ></vts-skeleton-element>
      <vts-skeleton-element
        *ngSwitchCase="2"
        vtsType="button"
        [vtsActive]="vtsActive"
        [vtsSize]="vtsSize"
        [vtsShape]="vtsShape"
      ></vts-skeleton-element>
      <vts-skeleton-element
        *ngSwitchCase="3"
        vtsType="input"
        [vtsActive]="vtsActive"
        [vtsSize]="vtsSize"
      ></vts-skeleton-element>
      <vts-skeleton-element
        *ngSwitchCase="4"
        vtsType="image"
        [vtsActive]="vtsActive"
      ></vts-skeleton-element>
    </ng-container>
  `
})
export class VtsTestSkeletonElementComponent {
  useSuite = 1;
  vtsActive: boolean = false;
  vtsSize: VtsSkeletonAvatarSize | VtsSkeletonButtonSize = 'default';
  vtsShape: VtsSkeletonAvatarShape | VtsSkeletonButtonShape = 'default';
}
