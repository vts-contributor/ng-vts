import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createFakeEvent } from '@ui-vts/ng-vts/core/testing';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsAvatarGroupComponent } from './avatar-group.component';
import { VtsAvatarComponent } from './avatar.component';
import { VtsAvatarModule } from './avatar.module';

const imageBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) {
    return 'image';
  }
  if (el.querySelector('.vtsicon') != null) {
    return 'icon';
  }
  return el.innerText.trim().length === 0 ? '' : 'text';
}
describe('avatar group', () => {
  let fixture: ComponentFixture<TestAvatarGroupComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsAvatarModule],
      declarations: [TestAvatarGroupComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAvatarGroupComponent);
    fixture.detectChanges();
  });

  it('should avatar group work', () => {
    fixture.detectChanges();
    const avatarGroup = fixture.debugElement.query(By.directive(VtsAvatarGroupComponent));
    expect(avatarGroup.nativeElement.classList).toContain('vts-avatar-group');
  });
});
describe('avatar', () => {
  let fixture: ComponentFixture<TestAvatarComponent>;
  let context: TestAvatarComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsAvatarModule, VtsIconTestModule],
      declarations: [TestAvatarComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAvatarComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#vtsSrc', () => {
    it('#vtsSrc', () => {
      expect(context).not.toBeNull();
    });
    it('should tolerate error src', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.vtsSrc = '';
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
      expect(context.comp.hasSrc).toBe(false);
      context.vtsSrc = imageBase64;
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
    it('should prevent default fallback when error src', fakeAsync(() => {
      const event = createFakeEvent('error');
      event.preventDefault();
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.vtsSrc = 'Invalid image src';
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      context.vtsSrc = imageBase64;
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
    it('#vtsSrcSet', () => {
      context.vtsSrcSet = '1.png';
      fixture.detectChanges();
      const el = dl.query(By.css(`img`)).nativeElement as HTMLImageElement;
      expect(el.srcset).toBe(context.vtsSrcSet);
    });
    it('#vtsAlt', () => {
      context.vtsAlt = 'alt';
      fixture.detectChanges();
      const el = dl.query(By.css(`img`)).nativeElement as HTMLImageElement;
      expect(el.alt).toBe(context.vtsAlt);
    });
  });

  it('#vtsIcon', () => {
    context.vtsSrc = null;
    context.vtsText = null;
    fixture.detectChanges();
    expect(getType(dl)).toBe('icon');
  });

  describe('#vtsText', () => {
    beforeEach(() => {
      context.vtsSrc = null;
      context.vtsIcon = null;
      fixture.detectChanges();
    });
    it('property', () => {
      expect(getType(dl)).toBe('text');
    });
    it('should be normal font-size', fakeAsync(() => {
      context.vtsText = 'a';
      fixture.detectChanges();
      tick();
      const scale = getScaleFromCSSTransform(
        dl.nativeElement.querySelector('.vts-avatar-string')!.style.transform!
      );
      expect(scale).toBe(1);
    }));
    it('should be auto set font-size', fakeAsync(() => {
      context.vtsText = 'LongUsername';
      fixture.detectChanges();
      tick();
      const scale = getScaleFromCSSTransform(
        dl.nativeElement.querySelector('.vts-avatar-string')!.style.transform!
      );
      expect(scale).toBeLessThan(1);
    }));

    describe('vtsGap', () => {
      let firstScale: number;
      let avatarText: HTMLElement;
      beforeEach(fakeAsync(() => {
        context.vtsGap = 4;
        context.vtsText = 'Username';
        fixture.detectChanges();
        tick();
        avatarText = dl.nativeElement.querySelector('.vts-avatar-string')!;
        firstScale = getScaleFromCSSTransform(avatarText.style.transform);
      }));

      it('should be set gap', fakeAsync(() => {
        context.vtsGap = 8;
        fixture.detectChanges();
        tick();

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeLessThan(firstScale);

        context.vtsGap = 2;
        fixture.detectChanges();
        tick();

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeGreaterThan(firstScale);
      }));

      it('Should be set to default when the limit is exceeded', fakeAsync(() => {
        context.vtsGap = 1000;
        fixture.detectChanges();
        tick();

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(firstScale);

        context.vtsGap = -1000;
        fixture.detectChanges();
        tick();

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(1);
      }));
    });
  });

  describe('#vtsShape', () => {
    for (const type of ['square', 'circle']) {
      it(type, () => {
        context.vtsShape = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-avatar-${type}`)) !== null).toBe(true);
      });
    }
  });

  describe('#vtsSize', () => {
    for (const item of [
      { size: 'large', cls: 'lg' },
      { size: 'small', cls: 'sm' }
    ]) {
      it(item.size, () => {
        context.vtsSize = item.size;
        fixture.detectChanges();
        expect(dl.query(By.css(`.vts-avatar-${item.cls}`)) !== null).toBe(true);
      });
    }

    it('custom size', () => {
      context.vtsSize = 64;
      context.vtsIcon = null;
      context.vtsSrc = null;
      fixture.detectChanges();
      const size = `${64}px`;
      const hostStyle = dl.nativeElement.querySelector('vts-avatar').style;
      expect(hostStyle.height === size).toBe(true);
      expect(hostStyle.width === size).toBe(true);
      expect(hostStyle.lineHeight === size).toBe(true);
      expect(hostStyle.fontSize === ``).toBe(true);

      context.vtsIcon = 'user';
      fixture.detectChanges();
      expect(hostStyle.fontSize === `${context.vtsSize / 2}px`).toBe(true);
    });
  });

  describe('order: image > icon > text', () => {
    it('image priority', () => {
      expect(getType(dl)).toBe('image');
    });
    it('should be show icon when image loaded error and icon exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
    }));
    it('should be show text when image loaded error and icon not exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.vtsIcon = null;
      fixture.detectChanges();
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('text');
    }));
    it('should be show empty when image loaded error and icon & text not exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.vtsIcon = null;
      context.vtsText = null;
      fixture.detectChanges();
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('');
    }));
  });
});

function getScaleFromCSSTransform(transform: string): number {
  return +/(\w+)\(([^)]*)\)/g.exec(transform)![2];
}

@Component({
  template: `
    <vts-avatar
      #comp
      [vtsShape]="vtsShape"
      [vtsSize]="vtsSize"
      [vtsIcon]="vtsIcon"
      [vtsText]="vtsText"
      [vtsGap]="vtsGap"
      [vtsSrc]="vtsSrc"
      [vtsSrcSet]="vtsSrcSet"
      [vtsAlt]="vtsAlt"
    ></vts-avatar>
  `,
  styleUrls: ['./style/index.less']
})
class TestAvatarComponent {
  @ViewChild('comp', { static: false }) comp!: VtsAvatarComponent;
  vtsShape = 'square';
  vtsSize: string | number = 'large';
  vtsGap = 4;
  vtsIcon: string | null = 'user';
  vtsText: string | null = 'A';
  vtsSrc: string | null = imageBase64;
  vtsSrcSet?: string;
  vtsAlt?: string;
}

@Component({
  template: `
    <vts-avatar-group></vts-avatar-group>
  `
})
class TestAvatarGroupComponent {}
