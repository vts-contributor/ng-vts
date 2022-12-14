import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VtsCascaderOption } from '@ui-vts/ng-vts/cascader';
import { Subscription } from 'rxjs';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'vts-demo-cascader-reactive-form',
  template: `
    <form [formGroup]="form" novalidate>
      <vts-cascader [vtsOptions]="vtsOptions" [formControlName]="'name'"></vts-cascader>
    </form>
    <br />
    <button vts-button (click)="reset()">Reset</button>
    <button vts-button (click)="submit()">Submit</button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoCascaderReactiveFormComponent implements OnDestroy {
  form!: FormGroup;
  vtsOptions: VtsCascaderOption[] = options;
  changeSubscription: Subscription;
  constructor(private fb: FormBuilder) {
    this.createForm();
    const control = this.form.get('name') as FormControl;
    this.changeSubscription = control.valueChanges.subscribe(data => {
      this.onChanges(data);
    });
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required]
    });
  }

  reset(): void {
    this.form.reset();
    console.log(this.form.value);
  }

  submit(): void {
    console.log(this.form.value);
  }

  onChanges(values: string[]): void {
    console.log(values);
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }
}
