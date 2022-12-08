import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VtsAffixModule } from '@ui-vts/ng-vts/affix';
import { VtsAnchorModule } from '@ui-vts/ng-vts/anchor';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
import { VtsCodeBoxModule } from './codebox/codebox.module';
import { VtsGithubBtnModule } from './github-btn/github-btn.module';
import { VtsHighlightModule } from './highlight/highlight.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    VtsCodeBoxModule,
    VtsHighlightModule,
    VtsGithubBtnModule,
    VtsToolTipModule,
    VtsAnchorModule,
    VtsAffixModule,
    VtsGridModule,
    VtsIconModule,
    // third libs
    DragDropModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VtsCodeBoxModule,
    VtsHighlightModule,
    VtsAnchorModule,
    VtsAffixModule,
    VtsGithubBtnModule,
    VtsGridModule,
    VtsToolTipModule,
    VtsIconModule,
    // third libs
    ScrollingModule,
    DragDropModule
  ]
})
export class ShareModule {}
