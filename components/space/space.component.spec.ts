import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsSpaceAlign } from '@ui-vts/ng-vts/space';
import { VtsSpaceComponent } from '@ui-vts/ng-vts/space/space.component';

import { VtsSpaceItemLegacyComponent } from './space-item.component';
import { VtsSpaceModule } from './space.module';

describe('Space Legacy', () => {
  let component: SpaceLegacyTestComponent;
  let fixture: ComponentFixture<SpaceLegacyTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VtsSpaceModule],
        declarations: [SpaceLegacyTestComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceLegacyTestComponent);
    component = fixture.componentInstance;
    component.size = 'small';
    component.direction = 'horizontal';
    fixture.detectChanges();
  });

  it('should render size when the items changes', () => {
    let items = fixture.debugElement.queryAll(By.directive(VtsSpaceItemLegacyComponent));
    expect(items.length).toBe(2);

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.directive(VtsSpaceItemLegacyComponent));
    expect(items.length).toBe(3);
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });
  });

  it('should render size', () => {
    const items = fixture.debugElement.queryAll(By.directive(VtsSpaceItemLegacyComponent));
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });

    component.size = 'middle';
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('16px');
    });

    component.size = 'large';
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('24px');
    });
  });

  it('should render customize size', () => {
    component.size = 36;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.directive(VtsSpaceItemLegacyComponent));
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('36px');
    });

    component.size = 18;
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('18px');
    });
  });

  it('should set direction', () => {
    const items = fixture.debugElement.queryAll(By.directive(VtsSpaceItemLegacyComponent));

    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(VtsSpaceComponent));

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('vts-space-vertical');

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBeFalsy();
      expect(element.style.marginBottom).toBeTruthy();
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain(
      'vts-space-horizontal'
    );

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBeTruthy();
      expect(element.style.marginBottom).toBeFalsy();
    });
  });
  it('should set align', () => {
    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(VtsSpaceComponent));
    const spaceNativeElement = spaceComponent.nativeElement as HTMLElement;
    expect(spaceNativeElement.classList).toContain('vts-space-vertical');

    spaceNativeElement.classList.forEach(className => {
      expect(className.indexOf('vts-space-align') === -1).toBe(true);
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('vts-space-align-center');

    component.align = 'end';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('vts-space-align-end');
  });
});

describe('Space', () => {
  let component: SpaceTestComponent;
  let fixture: ComponentFixture<SpaceTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VtsSpaceModule],
        declarations: [SpaceTestComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTestComponent);
    component = fixture.componentInstance;
    component.size = 'small';
    component.direction = 'horizontal';
    fixture.detectChanges();
  });

  it('should render size when the items changes', () => {
    let items = fixture.debugElement.queryAll(By.css('.vts-space-item'));
    expect(items.length).toBe(2);

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.css('.vts-space-item'));
    expect(items.length).toBe(3);
    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should render size', () => {
    const items = fixture.debugElement.queryAll(By.css('.vts-space-item'));
    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 'middle';
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('16px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 'large';
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('24px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should render customize size', () => {
    component.size = 36;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.vts-space-item'));

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('36px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 18;
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('18px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should set direction', () => {
    const items = fixture.debugElement.queryAll(By.css('.vts-space-item'));

    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(VtsSpaceComponent));

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('vts-space-vertical');

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeTruthy();
      } else {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeFalsy();
      }
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain(
      'vts-space-horizontal'
    );

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBeTruthy();
        expect(element.style.marginBottom).toBeFalsy();
      } else {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeFalsy();
      }
    });
  });

  it('should set align', () => {
    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(VtsSpaceComponent));
    const spaceNativeElement = spaceComponent.nativeElement as HTMLElement;
    expect(spaceNativeElement.classList).toContain('vts-space-vertical');

    spaceNativeElement.classList.forEach(className => {
      expect(className.indexOf('vts-space-align') === -1).toBe(true);
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('vts-space-align-center');

    component.align = 'end';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('vts-space-align-end');
  });

  it('should render split', () => {
    component.showSplit = true;
    fixture.detectChanges();

    let items = fixture.debugElement.queryAll(By.css('.vts-space-item'));
    let splits = fixture.debugElement.queryAll(By.css('.vts-space-split'));
    expect(items.length).toBe(2);
    expect(splits.length).toBe(1);

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('4px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    splits.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('4px');
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.css('.vts-space-item'));
    splits = fixture.debugElement.queryAll(By.css('.vts-space-split'));

    expect(items.length).toBe(3);
    expect(splits.length).toBe(2);

    splits.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('4px');
    });
  });
});

@Component({
  template: `
    <vts-space [vtsSize]="size" [vtsDirection]="direction" [vtsAlign]="align">
      <vts-space-item>
        <div>item</div>
      </vts-space-item>
      <vts-space-item>
        <div>item</div>
      </vts-space-item>
      <vts-space-item *ngIf="show">
        <div>item</div>
      </vts-space-item>
    </vts-space>
  `
})
class SpaceLegacyTestComponent {
  size: string | number = 'small';
  direction = 'horizontal';
  show = false;
  align?: VtsSpaceAlign;
}

@Component({
  template: `
    <vts-space
      [vtsSplit]="showSplit ? spaceSplit : null"
      [vtsSize]="size"
      [vtsDirection]="direction"
      [vtsAlign]="align"
    >
      <div *vtsSpaceItem>item</div>
      <div *vtsSpaceItem>item</div>
      <ng-container *ngIf="show">
        <div *vtsSpaceItem>item</div>
      </ng-container>
    </vts-space>

    <ng-template #spaceSplit>|</ng-template>
  `
})
class SpaceTestComponent {
  size: string | number = 'small';
  direction = 'horizontal';
  show = false;
  align?: VtsSpaceAlign;
  showSplit = false;
}
