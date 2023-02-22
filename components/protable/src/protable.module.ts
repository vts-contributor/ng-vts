import { VtsUploadModule } from './../../upload/upload.module';
import { VtsSelectModule } from './../../select/select.module';
import { VtsDrawerModule } from './../../drawer/drawer.module';
import { VtsModalModule } from '@ui-vts/ng-vts/modal';
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
import { VtsProTableFilterComponent } from './addon/filter.component';
import { VtsRowExpandButtonComponent } from './addon/row-expand-button.directive';
import { VtsRowIndentDirective } from './addon/row-indent.directive';
import { VtsProTableSelectionComponent } from './addon/selection.component';
import { VtsProTableSortersComponent } from './addon/sorters.component';
import { VtsCellFixedDirective } from './cell/cell-fixed.directive';
import { VtsProTableCellDirective } from './cell/cell.directive';
import { VtsTdAddOnComponent } from './cell/td-addon.component';
import { VtsThAddOnComponent } from './cell/th-addon.component';
import { VtsThMeasureDirective } from './cell/th-measure.directive';
import { VtsThSelectionComponent } from './cell/th-selection.component';
import { VtsCellAlignDirective } from './styled/align.directive';
import { VtsCellEllipsisDirective } from './styled/ellipsis.directive';
import { VtsCellBreakWordDirective } from './styled/word-break.directive';
import { VtsProTableContentComponent } from './protable/protable-content.component';
import { VtsProTableFixedRowComponent } from './protable/protable-fixed-row.component';
import { VtsProTableInnerDefaultComponent } from './protable/protable-inner-default.component';
import { VtsProTableInnerScrollComponent } from './protable/protable-inner-scroll.component';
import { VtsProTableVirtualScrollDirective } from './protable/protable-virtual-scroll.directive';
import { VtsTbodyComponent } from './protable/tbody.component';
import { VtsTheadComponent } from './protable/thead.component';
import { VtsProTableTitleFooterComponent } from './protable/title-footer.component';
import { VtsTrExpandDirective } from './protable/tr-expand.directive';
import { VtsTrMeasureComponent } from './protable/tr-measure.component';
import { VtsTrDirective } from './protable/tr.directive';
import { VtsProTableComponent } from './protable/protable.component';
import { VtsFormModule } from './../../form/form.module';
import { VtsSearchFieldsComponent } from './components/search-fields/search-fields.component';
import { VtsConfigFieldsComponent } from './components/config-fields/config-fields.component';
import { VtsTableDataComponent } from './components/table-data/table-data.component';
// import { VtsPaginationBarComponent } from './components/pagination-bar/pagination-bar.component';

@NgModule({
  declarations: [
    VtsProTableComponent,
    VtsThAddOnComponent,
    VtsProTableCellDirective,
    VtsThMeasureDirective,
    VtsTdAddOnComponent,
    VtsTheadComponent,
    VtsTbodyComponent,
    VtsTrDirective,
    VtsTrExpandDirective,
    VtsProTableVirtualScrollDirective,
    VtsCellFixedDirective,
    VtsProTableContentComponent,
    VtsProTableTitleFooterComponent,
    VtsProTableInnerDefaultComponent,
    VtsProTableInnerScrollComponent,
    VtsTrMeasureComponent,
    VtsRowIndentDirective,
    VtsRowExpandButtonComponent,
    VtsCellBreakWordDirective,
    VtsCellAlignDirective,
    VtsProTableSortersComponent,
    VtsProTableFilterComponent,
    VtsProTableSelectionComponent,
    VtsCellEllipsisDirective,
    VtsFilterTriggerComponent,
    VtsProTableFixedRowComponent,
    VtsThSelectionComponent,
    VtsSearchFieldsComponent,
    VtsConfigFieldsComponent,
    VtsTableDataComponent,
    // VtsPaginationBarComponent
  ],
  exports: [
    VtsProTableComponent,
    VtsThAddOnComponent,
    VtsProTableCellDirective,
    VtsThMeasureDirective,
    VtsTdAddOnComponent,
    VtsTheadComponent,
    VtsTbodyComponent,
    VtsTrDirective,
    VtsProTableVirtualScrollDirective,
    VtsCellFixedDirective,
    VtsFilterTriggerComponent,
    VtsTrExpandDirective,
    VtsCellBreakWordDirective,
    VtsCellAlignDirective,
    VtsCellEllipsisDirective,
    VtsProTableFixedRowComponent,
    VtsThSelectionComponent,
    VtsSearchFieldsComponent,
    VtsConfigFieldsComponent,
    VtsTableDataComponent,
    // VtsPaginationBarComponent
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
export class VtsProTableModule {}
