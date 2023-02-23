import { VtsSearchFieldsComponent } from './../../pro-table/src/components/search-fields/search-fields.component';
import { VtsConfigFieldsComponent } from './../../pro-table/src/components/config-fields/config-fields.component';
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsResizeObserverModule } from '@ui-vts/ng-vts/cdk/resize-observer';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsPaginationModule } from '@ui-vts/ng-vts/pagination';
import { VtsRadioModule } from '@ui-vts/ng-vts/radio';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';
import { VtsFilterTriggerComponent } from './addon/filter-trigger.component';
import { VtsTableFilterComponent } from './addon/filter.component';
import { VtsRowExpandButtonComponent } from './addon/row-expand-button.directive';
import { VtsRowIndentDirective } from './addon/row-indent.directive';
import { VtsTableSelectionComponent } from './addon/selection.component';
import { VtsTableSortersComponent } from './addon/sorters.component';
import { VtsCellFixedDirective } from './cell/cell-fixed.directive';
import { VtsTableCellDirective } from './cell/cell.directive';
import { VtsTdAddOnComponent } from './cell/td-addon.component';
import { VtsThAddOnComponent } from './cell/th-addon.component';
import { VtsThMeasureDirective } from './cell/th-measure.directive';
import { VtsThSelectionComponent } from './cell/th-selection.component';
import { VtsCellAlignDirective } from './styled/align.directive';
import { VtsCellEllipsisDirective } from './styled/ellipsis.directive';
import { VtsCellBreakWordDirective } from './styled/word-break.directive';
import { VtsTableContentComponent } from './table/table-content.component';
import { VtsTableFixedRowComponent } from './table/table-fixed-row.component';
import { VtsTableInnerDefaultComponent } from './table/table-inner-default.component';
import { VtsTableInnerScrollComponent } from './table/table-inner-scroll.component';
import { VtsTableVirtualScrollDirective } from './table/table-virtual-scroll.directive';
import { VtsTableComponent } from './table/table.component';
import { VtsTbodyComponent } from './table/tbody.component';
import { VtsTheadComponent } from './table/thead.component';
import { VtsTableTitleFooterComponent } from './table/title-footer.component';
import { VtsTrExpandDirective } from './table/tr-expand.directive';
import { VtsTrMeasureComponent } from './table/tr-measure.component';
import { VtsTrDirective } from './table/tr.directive';
import { VtsFormModule } from '@ui-vts/ng-vts/form/form.module';
import { VtsModalModule } from '@ui-vts/ng-vts/modal/modal.module';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer/drawer.module';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsUploadModule } from '@ui-vts/ng-vts/upload';

@NgModule({
  declarations: [
    VtsTableComponent,
    VtsThAddOnComponent,
    VtsTableCellDirective,
    VtsThMeasureDirective,
    VtsTdAddOnComponent,
    VtsTheadComponent,
    VtsTbodyComponent,
    VtsTrDirective,
    VtsTrExpandDirective,
    VtsTableVirtualScrollDirective,
    VtsCellFixedDirective,
    VtsTableContentComponent,
    VtsTableTitleFooterComponent,
    VtsTableInnerDefaultComponent,
    VtsTableInnerScrollComponent,
    VtsTrMeasureComponent,
    VtsRowIndentDirective,
    VtsRowExpandButtonComponent,
    VtsCellBreakWordDirective,
    VtsCellAlignDirective,
    VtsTableSortersComponent,
    VtsTableFilterComponent,
    VtsTableSelectionComponent,
    VtsCellEllipsisDirective,
    VtsFilterTriggerComponent,
    VtsTableFixedRowComponent,
    VtsThSelectionComponent,
    VtsConfigFieldsComponent,
    VtsSearchFieldsComponent
  ],
  exports: [
    VtsTableComponent,
    VtsThAddOnComponent,
    VtsTableCellDirective,
    VtsThMeasureDirective,
    VtsTdAddOnComponent,
    VtsTheadComponent,
    VtsTbodyComponent,
    VtsTrDirective,
    VtsTableVirtualScrollDirective,
    VtsCellFixedDirective,
    VtsFilterTriggerComponent,
    VtsTrExpandDirective,
    VtsCellBreakWordDirective,
    VtsCellAlignDirective,
    VtsCellEllipsisDirective,
    VtsTableFixedRowComponent,
    VtsThSelectionComponent,
    VtsConfigFieldsComponent,
    VtsSearchFieldsComponent
  ],
  imports: [
    BidiModule,
    VtsMenuModule,
    FormsModule,
    VtsOutletModule,
    VtsRadioModule,
    VtsCheckboxModule,
    VtsDropDownModule,
    VtsButtonModule,
    CommonModule,
    PlatformModule,
    VtsPaginationModule,
    VtsResizeObserverModule,
    VtsSpinModule,
    VtsI18nModule,
    VtsIconModule,
    VtsEmptyModule,
    ScrollingModule,
    VtsResizeObserverModule,
    VtsFormModule,
    ReactiveFormsModule,
    VtsModalModule,
    VtsDrawerModule,
    VtsFormModule,
    VtsSelectModule,
    VtsUploadModule
  ]
})
export class VtsTableModule {}
