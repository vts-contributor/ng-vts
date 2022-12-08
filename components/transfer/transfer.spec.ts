// tslint:disable:no-any no-parameter-reassignment
import { BidiModule, Dir } from '@angular/cdk/bidi';
import {
  Component,
  DebugElement,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import en_US from '../i18n/languages/en_US';
import { VtsI18nService } from '../i18n/vts-i18n.service';
import { VtsTransferComponent, VtsTransferModule } from './index';
import { TransferCanMove, TransferDirection, TransferItem } from './interface';

const COUNT = 21;
const LEFTCOUNT = 2;
const DISABLED = 1;

describe('transfer', () => {
  let injector: Injector;
  let fixture: ComponentFixture<
    | TestTransferComponent
    | TestTransferCustomRenderComponent
    | Test996Component
    | VtsTestTransferRtlComponent
  >;
  let dl: DebugElement;
  let instance: TestTransferComponent;
  let pageObject: TransferPageObject;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [BidiModule, NoopAnimationsModule, VtsTransferModule, VtsIconTestModule],
      declarations: [
        TestTransferComponent,
        TestTransferCustomRenderComponent,
        Test996Component,
        VtsTestTransferRtlComponent
      ]
    });
    fixture = TestBed.createComponent(TestTransferComponent);
    dl = fixture.debugElement;
    instance = dl.componentInstance;
    pageObject = new TransferPageObject();
    fixture.detectChanges();
  });

  describe('[default]', () => {
    it('should be from left to right when via vtsTargetKeys property', () => {
      instance.vtsTargetKeys = ['0', '1'];
      fixture.detectChanges();

      const leftKeys = instance.comp.leftDataSource.map(e => e.key);
      const rightKeys = instance.comp.rightDataSource.map(e => e.key);

      expect(rightKeys).toContain('0');
      expect(leftKeys).not.toContain('0');

      expect(rightKeys).toContain('1');
      expect(leftKeys).not.toContain('1');
    });

    it('should be from left to right when via vtsSelectedKeys property', () => {
      instance.vtsSelectedKeys = ['0', '1', '2'];
      fixture.detectChanges();

      expect(
        instance.comp.vtsSelectedKeys.every(e => {
          const data = instance.comp.vtsDataSource.find(d => d.key === e);
          return !!data?.checked;
        })
      ).toBe(true);
    });

    it('should be from left to right', () => {
      pageObject
        .expectLeft(LEFTCOUNT)
        .transfer('right', 0)
        .expectLeft(LEFTCOUNT - 1)
        .expectRight(COUNT - LEFTCOUNT + 1);
    });

    it('should be from right to left', () => {
      pageObject
        .expectRight(COUNT - LEFTCOUNT)
        .transfer('left', [0, 1])
        .expectRight(COUNT - LEFTCOUNT - 2)
        .expectLeft(LEFTCOUNT + 2);
    });

    it('should be from left to right when via search found items', () => {
      pageObject
        .expectLeft(LEFTCOUNT)
        .search('left', '1')
        .transfer('right', 0)
        .expectLeft(LEFTCOUNT - 1)
        .expectRight(COUNT - LEFTCOUNT + 1);
      expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        0
      );
    });

    it('should be from right to left when via search found items', () => {
      pageObject
        .expectRight(COUNT - LEFTCOUNT)
        .search('right', '2')
        .transfer('left', [0, 1])
        .expectLeft(LEFTCOUNT + 2)
        .expectRight(COUNT - LEFTCOUNT - 2);
      expect(pageObject.rightList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        DISABLED
      );
    });

    it('should be forced to display when the original item is hidden', () => {
      pageObject.checkItem('left', 0).search('left', '1');
      pageObject.rightBtn.click();
      fixture.detectChanges();
      expect(instance.comp.rightDataSource.filter(w => !w.hide).length).toBe(COUNT - LEFTCOUNT + 1);
    });

    it('should be custom filter option', () => {
      instance.vtsCustomFilterFn = (inputValue: string, item: any): boolean => {
        return item.description.indexOf(inputValue) > -1;
      };
      fixture.detectChanges();
      pageObject.expectLeft(LEFTCOUNT).search('left', 'description of content1');
      expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        1
      );
      (
        pageObject.leftList.querySelector('.vts-transfer-list-search-action') as HTMLElement
      ).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        LEFTCOUNT
      );
    });

    it('should be clear search keywords', () => {
      pageObject.expectLeft(LEFTCOUNT).search('left', '1');
      expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        1
      );
      (
        pageObject.leftList.querySelector('.vts-transfer-list-search-action') as HTMLElement
      ).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
        LEFTCOUNT
      );
    });

    it('should be checkbox is toggle select', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(1);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select by blank area', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0, '.vts-transfer-list-content-item');
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(1);
    });

    it('should be checkbox is disabled toggle select when setting disabled prop', () => {
      instance.vtsDataSource = [{ title: `content`, disabled: true }];
      fixture.detectChanges();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in left', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      const btn = pageObject.leftList.querySelector(
        '.vts-transfer-list-header .vts-checkbox'
      ) as HTMLElement;
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(LEFTCOUNT);
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in right', () => {
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
      const btn = pageObject.rightList.querySelector(
        '.vts-transfer-list-header .vts-checkbox'
      ) as HTMLElement;
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(
        COUNT - LEFTCOUNT - DISABLED
      );
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
    });

    describe('#notFoundContent', () => {
      it('should be the left and right list have data', () => {
        instance.vtsDataSource = [{ title: `content0`, direction: 'right' }, { title: `content1` }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('vts-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('vts-embed-empty')).toBeFalsy();
      });
      it('should be the right list is no data', () => {
        instance.vtsDataSource = [{ title: `content0` }, { title: `content1` }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('vts-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('vts-embed-empty')).toBeFalsy();
      });
      it('should be the left list is no data', () => {
        instance.vtsDataSource = [{ title: `content0`, direction: 'right' }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('vts-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('vts-embed-empty')).toBeTruthy();
      });
      it('should be the left and right list is no data', () => {
        instance.vtsDataSource = [];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('vts-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('vts-embed-empty')).toBeTruthy();
      });
    });

    describe('#vtsDisabled', () => {
      it('should working', () => {
        instance.vtsDisabled = true;
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.vts-transfer-disabled')).length).toBe(1);
        // All operation buttons muse be disabled
        expect(dl.queryAll(By.css('.vts-transfer-operation .vts-btn[disabled]')).length).toBe(2);
        // All search input muse be disabled
        expect(dl.queryAll(By.css('.vts-input-disabled')).length).toBe(2);
        // All item muse be disabled
        expect(dl.queryAll(By.css('.vts-transfer-list-content-item-disabled')).length).toBe(COUNT);
        // All checkbox (include 2 checkall) muse be disabled
        expect(dl.queryAll(By.css('.vts-checkbox-disabled')).length).toBe(COUNT + 2);
      });
      it('should be disabled clear', () => {
        pageObject.expectLeft(LEFTCOUNT).search('left', '1');
        expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
          1
        );
        instance.vtsDisabled = true;
        fixture.detectChanges();
        (
          pageObject.leftList.querySelector('.vts-transfer-list-search-action') as HTMLElement
        ).click();
        fixture.detectChanges();
        expect(pageObject.leftList.querySelectorAll('.vts-transfer-list-content-item').length).toBe(
          1
        );
      });
      it('should be disabled check all when search result is empty', () => {
        pageObject.expectLeft(LEFTCOUNT).search('left', '模拟');
        const selectorPath =
          '[data-direction="left"] .vts-transfer-list-header .vts-checkbox-disabled';
        expect(pageObject.leftList.querySelectorAll(selectorPath).length).toBe(1);
      });
    });

    it('#vtsShowSelectAll', () => {
      const cls = `[data-direction="left"] .vts-transfer-list-header .vts-checkbox`;
      expect(dl.queryAll(By.css(cls)).length).toBe(1);
      instance.vtsShowSelectAll = false;
      fixture.detectChanges();
      expect(dl.queryAll(By.css(cls)).length).toBe(0);
    });

    it('#vtsRenderList', () => {
      instance.vtsRenderList = [instance.renderListTpl, instance.renderListTpl];
      fixture.detectChanges();
      expect(dl.queryAll(By.css('.vts-transfer-customize-list')).length).toBe(1);
      expect(dl.queryAll(By.css('.transfer-renderList')).length).toBe(2);
    });

    it('should be uncheck all when two verification error', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> => {
        return of(arg.list).pipe(
          map(() => {
            throw new Error('error');
          })
        );
      };
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFTCOUNT)
        .transfer('right', [0, 1])
        .expectLeft(LEFTCOUNT)
        .expectRight(COUNT - LEFTCOUNT);
    });

    it('should be custom render item', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      const leftList = tempFixture.debugElement.query(By.css('[data-direction="left"]'))
        .nativeElement as HTMLElement;
      expect(leftList.querySelectorAll('.vtsicon-frown-o').length).toBe(LEFTCOUNT);
    });

    it('should be custom footer', () => {
      expect(pageObject.leftList.querySelector('#transfer-footer') != null).toBe(true);
    });

    it('#i18n', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      injector.get(VtsI18nService).setLocale(en_US);
      tempFixture.detectChanges();
      const searchPhText = (
        tempFixture.debugElement.query(By.css('.vts-transfer-list-search'))
          .nativeElement as HTMLElement
      ).attributes.getNamedItem('placeholder')!.textContent;
      expect(searchPhText).toBe(en_US.Transfer.searchPlaceholder);
    });
  });

  describe('#canMove', () => {
    it('default', () => {
      fixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      pageObject = new TransferPageObject();
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFTCOUNT)
        .transfer('right', 0)
        .expectLeft(LEFTCOUNT - 1)
        .expectRight(COUNT - LEFTCOUNT + 1);
    });
    it('should be from left to right when two verification', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> => {
        if (arg.direction === 'right' && arg.list.length > 0) {
          arg.list.splice(0, 1);
        }
        return of(arg.list);
      };
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFTCOUNT)
        .transfer('right', [0, 1])
        .expectLeft(LEFTCOUNT - 1)
        .expectRight(COUNT - LEFTCOUNT + 1);
    });
  });

  describe('#issues', () => {
    it('#996', fakeAsync(() => {
      fixture = TestBed.createComponent(Test996Component);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      pageObject = new TransferPageObject();
      fixture.detectChanges();
      expect(
        pageObject.getEl('[data-direction="right"] .vts-transfer-list-header .vts-checkbox')
          .classList
      ).not.toContain('vts-checkbox-checked');
      pageObject.checkItem('right', 1);
      tick(50);
      fixture.detectChanges();
      expect(
        pageObject.getEl('[data-direction="right"] .vts-transfer-list-header .vts-checkbox')
          .classList
      ).toContain('vts-checkbox-checked');
    }));
  });

  describe('RTL', () => {
    let componentElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTransferRtlComponent);
      componentElement = fixture.debugElement.query(
        By.directive(VtsTransferComponent)
      ).nativeElement;
      fixture.detectChanges();
    });

    it('should className correct on dir change', fakeAsync(() => {
      expect(componentElement.classList).toContain('vts-transfer-rtl');
      fixture.debugElement.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('vts-transfer-rtl');
    }));
  });

  class TransferPageObject {
    [key: string]: any;

    getEl(cls: string): HTMLElement {
      return dl.query(By.css(cls)).nativeElement as HTMLElement;
    }

    get leftBtn(): HTMLButtonElement {
      return dl.query(By.css('.vts-transfer-operation .vtsicon-left'))
        .nativeElement as HTMLButtonElement;
    }

    get rightBtn(): HTMLButtonElement {
      return dl.query(By.css('.vts-transfer-operation .vtsicon-right'))
        .nativeElement as HTMLButtonElement;
    }

    get leftList(): HTMLElement {
      return dl.query(By.css('[data-direction="left"]')).nativeElement as HTMLElement;
    }

    get rightList(): HTMLElement {
      return dl.query(By.css('[data-direction="right"]')).nativeElement as HTMLElement;
    }

    transfer(direction: TransferDirection, index: number | number[]): this {
      if (!Array.isArray(index)) {
        index = [index];
      }
      this.checkItem(direction === 'left' ? 'right' : 'left', index);
      (direction === 'left' ? this.leftBtn : this.rightBtn).click();
      fixture.detectChanges();
      return this;
    }

    checkItem(
      direction: TransferDirection,
      index: number | number[],
      cls: string = '.vts-transfer-list-content-item label'
    ): this {
      if (!Array.isArray(index)) {
        index = [index];
      }
      const items = (direction === 'left' ? this.leftList : this.rightList).querySelectorAll(cls);
      for (const idx of index) {
        (items[idx] as HTMLElement).click();
        fixture.detectChanges();
      }
      fixture.detectChanges();
      return this;
    }

    search(direction: TransferDirection, value: string): this {
      const ipt = (direction === 'left' ? this.leftList : this.rightList).querySelector(
        '.vts-transfer-list-search'
      ) as HTMLInputElement;
      ipt.value = value;
      ipt.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return this;
    }

    expectLeft(count: number): this {
      expect(instance.comp.leftDataSource.length).toBe(count);
      return this;
    }

    expectRight(count: number): this {
      expect(instance.comp.rightDataSource.length).toBe(count);
      return this;
    }
  }
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-transfer',
  template: `
    <vts-transfer
      #comp
      [vtsDataSource]="vtsDataSource"
      [vtsRenderList]="vtsRenderList"
      [vtsShowSelectAll]="vtsShowSelectAll"
      [vtsDisabled]="vtsDisabled"
      [vtsTitles]="['Source', 'Target']"
      [vtsOperations]="['to right', 'to left']"
      [vtsItemUnit]="vtsItemUnit"
      [vtsItemsUnit]="vtsItemsUnit"
      [vtsListStyle]="vtsListStyle"
      [vtsShowSearch]="vtsShowSearch"
      [vtsCustomFilterFn]="vtsCustomFilterFn"
      [vtsSearchPlaceholder]="vtsSearchPlaceholder"
      [vtsNoResult]="vtsNoResult"
      [vtsCanMove]="canMove"
      [vtsFooter]="footer"
      [vtsTargetKeys]="vtsTargetKeys"
      (vtsSearchChange)="search($event)"
      (vtsSelectChange)="select($event)"
      (vtsChange)="change($event)"
    ></vts-transfer>
    <ng-template #renderList>
      <p class="transfer-renderList">renderList</p>
    </ng-template>
    <ng-template #footer>
      <p id="transfer-footer">footer</p>
    </ng-template>
  `,
  styleUrls: ['./style/index.less'],
  encapsulation: ViewEncapsulation.None
})
class TestTransferComponent implements OnInit {
  @ViewChild('comp', { static: false }) comp!: VtsTransferComponent;
  @ViewChild('renderList', { static: false }) renderListTpl!: TemplateRef<void>;
  vtsDataSource: any[] = [];
  vtsRenderList: Array<TemplateRef<void> | null> = [null, null];
  vtsDisabled = false;
  vtsShowSelectAll = true;
  vtsTitles = ['Source', 'Target'];
  vtsSelectedKeys = ['0', '1', '2'];
  vtsTargetKeys: string[] = [];
  vtsOperations = ['to right', 'to left'];
  vtsItemUnit = 'item';
  vtsItemsUnit = 'items';
  vtsListStyle = { 'width.px': 300, 'height.px': 300 };
  vtsShowSearch = true;
  vtsCustomFilterFn: null | ((inputValue: string, item: any) => boolean) = null;
  vtsSearchPlaceholder = '请输入搜索内容';
  vtsNoResult = '列表为空';

  canMove(arg: TransferCanMove): Observable<TransferItem[]> {
    // if (arg.direction === 'right' && arg.list.length > 0) arg.list.splice(0, 1);
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return of(arg.list);
  }

  ngOnInit(): void {
    const ret: Array<{
      key: string;
      title: string;
      description: string;
      direction: TransferDirection;
      icon: string;
      disabled: boolean;
    }> = [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: i >= LEFTCOUNT ? 'right' : 'left',
        icon: `frown-o`,
        disabled: i === 20
      });
    }
    this.vtsDataSource = ret;
  }

  search(): void {}

  select(): void {}

  change(): void {}
}

@Component({
  template: `
    <vts-transfer #comp vtsShowSearch [vtsRender]="render" [vtsDataSource]="vtsDataSource">
      <ng-template #render let-item>
        <i vts-icon vtsType="{{ item.icon }}"></i>
        {{ item.title }}
      </ng-template>
    </vts-transfer>
  `
})
class TestTransferCustomRenderComponent implements OnInit {
  @ViewChild('comp', { static: false }) comp?: VtsTransferComponent;
  vtsDataSource: Array<{
    key: string;
    title: string;
    description: string;
    direction: TransferDirection;
    icon: string;
  }> = [];

  ngOnInit(): void {
    const ret: Array<{
      key: string;
      title: string;
      description: string;
      direction: TransferDirection;
      icon: string;
    }> = [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: i >= LEFTCOUNT ? 'right' : 'left',
        icon: `frown-o`
      });
    }
    this.vtsDataSource = ret;
  }
}

@Component({
  template: `
    <vts-transfer [vtsDataSource]="list"></vts-transfer>
  `
})
class Test996Component implements OnInit {
  // tslint:disable-next-line:no-any
  list: any[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    [0, 1].forEach(idx => (this.list[idx].direction = 'right'));
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-transfer></vts-test-transfer>
    </div>
  `
})
export class VtsTestTransferRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
