import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vts-search-form-protable',
  template: `
    <form vts-form [formGroup]="validateForm" class="vts-advanced-search-form">
      <div vts-row [vtsGutter]="24">
        <div vts-col [vtsSpan]="6" *ngFor="let control of controlArray" [hidden]="!control.show">
          <vts-form-item>
            <vts-form-label [vtsFor]="'property' + control.index">
              Propertie {{ control.index }}
            </vts-form-label>
            <vts-form-control>
              <input
                vts-input
                placeholder="Input propertie name"
                [formControlName]="'property' + control.index"
                [attr.id]="'property' + control.index"
              />
            </vts-form-control>
          </vts-form-item>
        </div>
        <div vts-col [vtsSpan]="6" class="search-area">
          <button vts-button [vtsType]="'primary'" [vtsSize]="'xs'" (click)="mockFn()">Search</button>
          <button vts-button [vtsSize]="'xs'" (click)="resetForm()">Reset</button>
          <button vts-button [vtsSize]="'xs'" (click)="toggleCollapse()">Collapse
            <i class="collapse-icon" vts-icon [vtsType]="vtsIsCollapse ? 'ArrowMiniDown' : 'ArrowMiniUp'"></i>
          </button>
        </div>
      </div>
    </form>
  `,

  styles: [
    `
      .vts-advanced-search-form {
        padding: 24px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 16px;
      }

      [vts-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }

      .collapse-icon {
        margin-left: 0px !important;
      }

      .search-area {
        text-align: left;
        padding: 0 0 0 4px !important;
        margin-top: -4px;
      }
    `
  ]
})
export class VtsSearchFormProTableComponent implements OnInit {
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  @Input() vtsIsCollapse = true;
  @Input() vtsNoDisplayProperties: number = 3;
  @Input() vtsTotalProperties: number = 7;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 1; i <= this.vtsTotalProperties; i++) {
      this.controlArray.push({ index: i, show: i <= this.vtsNoDisplayProperties });
      this.validateForm.addControl(`property${i}`, new FormControl());
    }
  }
  
  mockFn() {
    alert('Mock function!');
  }

  toggleCollapse(): void {
    this.vtsIsCollapse = !this.vtsIsCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.vtsIsCollapse ? index < this.vtsNoDisplayProperties : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }
}