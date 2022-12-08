import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-password-input',
  template: `
    <vts-input-group [vtsSuffix]="suffixTemplate">
      <input
        [type]="passwordVisible ? 'text' : 'password'"
        vts-input
        placeholder="input password"
        [(ngModel)]="password"
      />
    </vts-input-group>
    <ng-template #suffixTemplate>
      <i
        vts-icon
        [vtsType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      ></i>
    </ng-template>
  `,
  styles: [
    `
      i {
        cursor: pointer;
      }
    `
  ]
})
export class VtsDemoInputPasswordInputComponent {
  passwordVisible = false;
  password?: string;
}
