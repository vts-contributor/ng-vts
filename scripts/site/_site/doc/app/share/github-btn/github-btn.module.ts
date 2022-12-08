import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { VtsGithubBtnComponent } from './github-btn.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [VtsGithubBtnComponent],
  exports: [VtsGithubBtnComponent]
})
export class VtsGithubBtnModule {}
