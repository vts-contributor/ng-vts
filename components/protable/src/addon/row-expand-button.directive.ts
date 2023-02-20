import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'button[vts-row-expand-button]',
  template: `
    <ng-container *ngIf="!!expandTemplate">
      <ng-template
        [ngTemplateOutlet]="expandTemplate"
        [ngTemplateOutletContext]="{ $implicit: expand }"
      ></ng-template>
    </ng-container>
  `,
  host: {
    '[type]': `'button'`,
    '[class.vts-protable-row-expand-icon-template]': `!!expandTemplate`,
    '[class.vts-protable-row-expand-icon-expanded]': `!expandTemplate && !spaceMode && expand === true`,
    '[class.vts-protable-row-expand-icon-collapsed]': `!expandTemplate && !spaceMode && expand === false`,
    '[class.vts-protable-row-expand-icon-spaced]': 'spaceMode',
    '(click)': 'onHostClick()'
  }
})
export class VtsRowExpandButtonComponent {
  @Input() expand = false;
  @Input() spaceMode = false;
  @Output() readonly expandChange = new EventEmitter();
  @Input() expandTemplate: TemplateRef<{
    $implicit: boolean;
  }> | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-row-expand-icon');
  }

  onHostClick(): void {
    if (!this.spaceMode) {
      this.expand = !this.expand;
      this.expandChange.next(this.expand);
    }
  }
}
