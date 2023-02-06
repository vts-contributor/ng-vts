import {
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2
} from '@angular/core';
import { VtsCardComponent } from './card.component';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsImageShape, VtsImageDirective } from '@ui-vts/ng-vts/image';

export type VtsCardThumbnailPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'vts-card-thumbnail',
  exportAs: 'vtsCardThumbnail',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="vtsTemplate; else vtsImage">
      <ng-container *vtsStringTemplateOutlet="vtsTemplate"></ng-container>
    </ng-container>
    <ng-template #vtsImage>
      <img
        vts-image
        [vtsSrc]="vtsSrc"
        [vtsPreview]="vtsPreview"
        [vtsFallback]="vtsFallback"
        [vtsPlaceholder]="vtsPlaceholder"
        [vtsShape]="vtsShape"
        [vtsFit]="vtsFit"
        [vtsThumbnail]="vtsThumbnail"
      />
    </ng-template>
  `,
  host: {
    '[class.vts-card-thumbnail]': 'true'
  }
})
export class VtsCardThumbnailComponent implements OnInit, OnChanges, AfterViewInit {
  static ngAcceptInputType_vtsPreview: BooleanInput;
  static ngAcceptInputType_vtsThumbnail: BooleanInput;

  attrs: { [key: string]: any } = {};

  @Input() vtsSrc = '';
  @Input() @InputBoolean() vtsPreview: boolean = false;
  @Input() vtsFallback: string | null = null;
  @Input() vtsPlaceholder: string | null = null;
  @Input() vtsShape: VtsImageShape = 'square';
  @Input() vtsFit: string | null = null;
  @Input() @InputBoolean() vtsThumbnail: boolean = false;
  @Input() vtsPosition: VtsCardThumbnailPosition = 'top';
  @Input() vtsTemplate?: TemplateRef<any>;

  @ViewChild(VtsImageDirective) imageRef?: TemplateRef<any>;

  constructor(
    @Optional() private parent: VtsCardComponent,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setParentProperty();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setParentProperty();
  }

  ngAfterViewInit(): void {
    this.transferAttribute();
  }

  transferAttribute() {
    const host = this.imageRef?.elementRef;
    if (!host) return;

    const props = Object.keys(this).map(k => k.toLocaleLowerCase());
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    const attrs = nativeElement.attributes;
    const filter = Array.from(attrs).filter(
      attr =>
        !['class', 'style'].includes(attr.nodeName) &&
        !attr.nodeName.startsWith('ng-') &&
        !props.includes(attr.nodeName)
    );

    if (filter.length > 0) {
      const hostElement = host.nativeElement;

      Object.keys(this.attrs).forEach(attr => {
        this.renderer.removeAttribute(hostElement, attr);
      });
      this.attrs = {};

      filter.forEach(v => {
        this.renderer.setAttribute(hostElement, v.nodeName, v.value);
      });

      this.attrs = filter;
    }
  }

  setParentProperty() {
    this.parent.vtsThumbnailPosition = this.vtsPosition;
    this.parent.cdr.markForCheck();
  }
}
