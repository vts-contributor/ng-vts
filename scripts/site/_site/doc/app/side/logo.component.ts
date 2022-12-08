import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [routerLink]="['/']" id="logo">
      <img
        alt="logo"
        [src]="!sideCollapsed ? './assets/img/logo.svg' : './assets/img/logo-mini.svg'"
      />
    </div>
  `,
  styles: [
    `
      #logo strong {
        font-weight: 500;
      }
    `
  ]
})
export class LogoComponent {
  @Input() sideCollapsed: boolean = false;
}
