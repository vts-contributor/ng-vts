import { VtsInputModule } from '@ui-vts/ng-vts/input/input.module';
import { VtsDividerModule } from './../../divider/divider.module';
import { VtsUploadModule } from '@ui-vts/ng-vts/upload';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
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
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsTableModule } from '@ui-vts/ng-vts/table';
import { VtsProTableContainerComponent } from './pro-table.component';
import { VtsProTableSearchFormComponent } from './components/search-form.component';
import { VtsProTableConfigComponent } from './components/table-config.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProtableDrawerComponent } from './components/table-drawer.component';
import { VtsInputNumberModule } from '@ui-vts/ng-vts/input-number';
import { VtsTagModule } from '@ui-vts/ng-vts/tag';

@NgModule({
  declarations: [
    VtsProTableContainerComponent,
    VtsProTableSearchFormComponent,
    VtsProTableConfigComponent,
    ProtableDrawerComponent
  ],
  exports: [
    VtsProTableContainerComponent,
    VtsProTableSearchFormComponent,
    VtsProTableConfigComponent
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
    VtsUploadModule,
    VtsTableModule,
    VtsDividerModule,
    DragDropModule,
    VtsInputNumberModule,
    VtsTagModule,
    VtsInputModule
  ]
})
export class VtsProTableModule { }
