import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { VtsCardComponent } from './card.component';

export type VtsCardThumbnailPosition = 'top' | 'bottom' | 'fluid' | 'left' | 'right'

@Component({
  selector: 'vts-card-thumbnail',
  exportAs: 'vtsCardThumbnail',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-thumbnail]': 'true'
  }
})
export class VtsCardThumbnailComponent implements OnInit, OnChanges {
  @Input() vtsPosition: VtsCardThumbnailPosition = 'top';

  constructor(
    @Optional() private parent: VtsCardComponent,
  ) {}

  ngOnInit(): void {
    this.setParentProperty()
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setParentProperty()
  }

  setParentProperty() {
    this.parent.vtsThumbnailPosition = this.vtsPosition
    this.parent.cdr.markForCheck()
  }
}
