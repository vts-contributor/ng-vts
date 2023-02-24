import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-advanced-search',
  template: `
    <form vts-form [formGroup]="validateForm" class="vts-advanced-search-form">
      <div vts-row [vtsGutter]="24">
        <div vts-col [vtsSpan]="8" *ngFor="let control of controlArray" [hidden]="!control.show">
          <vts-form-item>
            <vts-form-label [vtsFor]="'field' + control.index">
              Field {{ control.index }}
            </vts-form-label>
            <vts-form-control>
              <input
                vts-input
                placeholder="placeholder"
                [formControlName]="'field' + control.index"
                [attr.id]="'field' + control.index"
              />
            </vts-form-control>
          </vts-form-item>
        </div>
      </div>
      <div vts-row>
        <div vts-col [vtsSpan]="24" class="search-area">
          <button vts-button [vtsType]="'primary'">Search</button>
          <button vts-button (click)="resetForm()">Clear</button>
          <a class="collapse" (click)="toggleCollapse()">
            Collapse
            <i vts-icon [vtsType]="isCollapse ? 'down' : 'up'"></i>
          </a>
        </div>
      </div>
    </form>
    <div class="search-result-list">Search Result List</div>
  `,

  styles: [
    `
      .vts-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
      }

      .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      [vts-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }

      .collapse {
        margin-left: 8px;
        font-size: 12px;
      }

      .search-area {
        text-align: right;
      }
    `
  ]
})
export class VtsDemoFormAdvancedSearchComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new UntypedFormControl());
    }
  }
}
