import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsListComponent } from './list.component';
import { VtsListModule } from './list.module';

describe('list', () => {
  let fixture: ComponentFixture<TestListComponent>;
  let context: TestListComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsListModule, VtsIconTestModule],
      declarations: [TestListComponent, TestListWithTemplateComponent, TestListItemComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestListComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('[fields]', () => {
    describe('#vtsItemLayout', () => {
      for (const item of [
        { type: 'default', ret: false },
        { type: 'vertical', ret: true }
      ]) {
        it(`[${item.type}]`, () => {
          context.vtsItemLayout = item.type;
          fixture.detectChanges();
          expect(dl.query(By.css(`.vts-list-${item.type}`)) != null).toBe(item.ret);
        });
      }
    });

    describe('#vtsBordered', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.vtsBordered = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.vts-list-bordered')) != null).toBe(value);
        });
      }
    });

    describe('#vtsHeader', () => {
      it('with string', () => {
        expect(dl.query(By.css('.vts-list-header')) != null).toBe(true);
      });
      it('with custom template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        expect(fixtureTemp.debugElement.query(By.css('.list-header')) != null).toBe(true);
      });
    });

    describe('#vtsFooter', () => {
      it('with string', () => {
        expect(dl.query(By.css('.vts-list-footer')) != null).toBe(true);
      });
      it('with custom template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        const footerEl = fixtureTemp.debugElement.query(By.css('.vts-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(
          fixtureTemp.componentInstance.footer as string
        );
      });
      it('change string to template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        const footerEl = fixtureTemp.debugElement.query(By.css('.vts-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(
          fixtureTemp.componentInstance.footer as string
        );
        (
          fixtureTemp.debugElement.query(By.css('#change')).nativeElement as HTMLButtonElement
        ).click();
        fixtureTemp.detectChanges();
        expect(fixtureTemp.debugElement.query(By.css('.list-footer')) != null).toBe(true);
      });
    });

    describe('#vtsSize', () => {
      for (const item of [
        { type: 'default', cls: '.vts-list' },
        { type: 'small', cls: '.vts-list-sm' },
        { type: 'large', cls: '.vts-list-lg' }
      ]) {
        it(`[${item.type}]`, () => {
          context.vtsSize = item.type;
          fixture.detectChanges();
          expect(dl.query(By.css(item.cls)) != null).toBe(true);
        });
      }
    });

    describe('#vtsSplit', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.vtsSplit = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.vts-list-split')) != null).toBe(value);
        });
      }
    });

    describe('#vtsLoading', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.vtsLoading = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.vts-list-loading')) != null).toBe(value);
        });
      }

      it('should be minimum area block when data is empty', () => {
        context.vtsLoading = true;
        context.data = [];
        fixture.detectChanges();
        expect(dl.query(By.css('.vts-spin-nested-loading'))).not.toBeNull();
      });
    });

    describe('#vtsDataSource', () => {
      it('should working', () => {
        expect(dl.queryAll(By.css('vts-list-item')).length).toBe(context.data!.length);
      });

      it('should be render empty text when data source is empty', () => {
        expect(dl.queryAll(By.css('.vts-list-empty-text')).length).toBe(0);
        context.data = [];
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.vts-list-empty-text')).length).toBe(1);
      });

      it('should be ingore empty text when unspecified data source', () => {
        context.data = undefined;
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.vts-list-empty-text')).length).toBe(0);
      });
    });

    it('#vtsGrid', () => {
      const colCls = `.vts-col-${context.vtsGrid.span}`;
      expect(dl.queryAll(By.css(colCls)).length).toBe(context.data!.length);
    });

    it('#loadMore', () => {
      expect(dl.query(By.css('.loadmore')) != null).toBe(true);
    });

    it('#pagination', () => {
      expect(dl.query(By.css('.pagination')) != null).toBe(true);
    });

    it('should be use split main and extra when item layout is vertical', () => {
      context.vtsItemLayout = 'vertical';
      fixture.detectChanges();
      expect(dl.query(By.css('.vts-list-item-main')) != null).toBe(true);
      expect(dl.query(By.css('.vts-list-item-extra')) != null).toBe(true);
    });
  });

  describe('item', () => {
    let fixtureTemp: ComponentFixture<TestListItemComponent>;
    beforeEach(() => {
      fixtureTemp = TestBed.createComponent(TestListItemComponent);
      fixtureTemp.detectChanges();
    });
    it('with string', () => {
      expect(
        (
          fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item'))
            .nativeElement as HTMLElement
        ).textContent!.includes('content')
      ).toBe(true);
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-action')) != null
      ).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .extra-logo')) != null).toBe(true);
    });
    it('with custom template of [vtsContent]', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-content')) != null).toBe(
        true
      );
    });
    it('#vtsNoFlex', () => {
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-no-flex')) != null
      ).toBe(false);
      fixtureTemp.componentInstance.noFlex = true;
      fixtureTemp.detectChanges();
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-no-flex')) != null
      ).toBe(true);
    });
  });

  describe('item-meta', () => {
    let fixtureTemp: ComponentFixture<TestListItemComponent>;
    beforeEach(() => {
      fixtureTemp = TestBed.createComponent(TestListItemComponent);
      fixtureTemp.detectChanges();
    });
    it('with string', () => {
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-meta-title')) != null
      ).toBe(true);
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-meta-description')) !=
          null
      ).toBe(true);
      expect(
        fixtureTemp.debugElement.query(By.css('#item-string .vts-list-item-meta-avatar')) != null
      ).toBe(true);
    });
    it('with custom template', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-title')) != null).toBe(
        true
      );
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-desc')) != null).toBe(
        true
      );
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-avatar')) != null).toBe(
        true
      );
    });
  });
});

describe('list RTL', () => {
  let testBed: ComponentBed<VtsTestListRtlComponent>;
  let fixture: ComponentFixture<VtsTestListRtlComponent>;
  let componentElement: HTMLElement;

  beforeEach(() => {
    testBed = createComponentBed(VtsTestListRtlComponent, {
      declarations: [TestListComponent, VtsTestListRtlComponent],
      imports: [VtsListModule, VtsIconTestModule, BidiModule]
    });
    componentElement = testBed.debugElement.query(By.directive(VtsListComponent)).nativeElement;
    fixture = testBed.fixture;
    fixture.detectChanges();
  });

  it('should className correct on dir change', () => {
    expect(componentElement.classList).toContain('vts-list-rtl');
    fixture.componentInstance.direction = 'ltr';
    fixture.detectChanges();
    expect(componentElement.classList).not.toContain('vts-list-rtl');
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-list',
  template: `
    <vts-list
      #comp
      [vtsDataSource]="data"
      [vtsItemLayout]="vtsItemLayout"
      [vtsBordered]="vtsBordered"
      [vtsFooter]="vtsFooter"
      [vtsHeader]="vtsHeader"
      [vtsLoading]="vtsLoading"
      [vtsSize]="vtsSize"
      [vtsSplit]="vtsSplit"
      [vtsGrid]="vtsGrid"
      [vtsRenderItem]="item"
      [vtsLoadMore]="loadMore"
      [vtsPagination]="pagination"
    >
      <ng-template #item let-item>
        <vts-list-item [vtsExtra]="extra">
          <vts-list-item-meta
            vtsTitle="title"
            vtsAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            vtsDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
          ></vts-list-item-meta>
        </vts-list-item>
      </ng-template>
      <ng-template #loadMore>
        <div class="loadmore">loadmore</div>
      </ng-template>
      <ng-template #pagination>
        <div class="pagination">pagination</div>
      </ng-template>
      <ng-template #extra>
        <span class="extra-content">extra content</span>
      </ng-template>
    </vts-list>
  `
})
class TestListComponent {
  @ViewChild('comp', { static: false }) comp!: VtsListComponent;
  vtsItemLayout = 'horizontal';
  vtsBordered = false;
  vtsFooter = 'footer';
  vtsHeader = 'header';
  vtsLoading = false;
  vtsSize = 'default';
  vtsSplit = true;
  data?: string[] = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.'
  ];
  // tslint:disable-next-line:no-any
  vtsGrid: any = { gutter: 16, span: 12 };
}

@Component({
  template: `
    <button (click)="footer = vtsFooter" id="change">change</button>
    <vts-list [vtsFooter]="footer" [vtsHeader]="vtsHeader">
      <ng-template #vtsFooter><p class="list-footer">footer</p></ng-template>
      <ng-template #vtsHeader><p class="list-header">header</p></ng-template>
    </vts-list>
  `
})
class TestListWithTemplateComponent {
  @ViewChild('vtsFooter', { static: false }) vtsFooter!: TemplateRef<void>;

  footer: string | TemplateRef<void> = 'footer with string';
}

@Component({
  template: `
    <vts-list id="item-string">
      <vts-list-item
        [vtsContent]="'content'"
        [vtsActions]="[action]"
        [vtsExtra]="extra"
        [vtsNoFlex]="noFlex"
      >
        <ng-template #action>
          <i vts-icon vtsType="star-o" style="margin-right: 8px;"></i>
          156
        </ng-template>
        <ng-template #extra>
          <img
            width="272"
            class="extra-logo"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </ng-template>
        <vts-list-item-meta
          vtsTitle="title"
          vtsAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          vtsDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
        ></vts-list-item-meta>
      </vts-list-item>
    </vts-list>
    <vts-list id="item-template">
      <vts-list-item [vtsContent]="vtsContent">
        <ng-template #vtsContent>
          <p class="item-content">vtsContent</p>
        </ng-template>
        <vts-list-item-meta
          [vtsTitle]="vtsTitle"
          [vtsAvatar]="vtsAvatar"
          [vtsDescription]="vtsDescription"
        >
          <ng-template #vtsTitle>
            <p class="item-title">vtsTitle</p>
          </ng-template>
          <ng-template #vtsAvatar>
            <p class="item-avatar">vtsAvatar</p>
          </ng-template>
          <ng-template #vtsDescription>
            <p class="item-desc">vtsDescription</p>
          </ng-template>
        </vts-list-item-meta>
      </vts-list-item>
    </vts-list>
  `
})
class TestListItemComponent {
  noFlex = false;
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-list></vts-test-list>
    </div>
  `
})
export class VtsTestListRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
