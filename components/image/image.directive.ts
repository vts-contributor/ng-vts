/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsImageGroupComponent } from './image-group.component';
import { VtsImageService } from './image.service';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'image';

export type ImageStatusType = 'error' | 'loading' | 'normal';
export type VtsImageShape = 'rounded' | 'circle' | 'square';

@Directive({
  selector: 'img[vts-image]',
  exportAs: 'vtsImage',
  host: {
    '(click)': 'onPreview()',
    '[class.vts-image]': 'true',
    '[class.vts-image-square]': 'vtsShape === "square"',
    '[class.vts-image-circle]': 'vtsShape === "circle"',
    '[class.vts-image-rounded]': 'vtsShape === "rounded"',
    '[class.vts-image-thumbnail]': 'vtsThumbnail',
    '[style.objectFit]': 'vtsFit'
  }
})
export class VtsImageDirective implements OnInit, OnChanges, OnDestroy {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsPreview: BooleanInput;
  static ngAcceptInputType_vtsThumbnail: BooleanInput;

  @Input() vtsSrc = '';
  @Input() @InputBoolean() @WithConfig() vtsPreview: boolean = false;
  @Input() @WithConfig() vtsFallback: string | null = null;
  @Input() @WithConfig() vtsPlaceholder: string | null = null;
  @Input() vtsShape: VtsImageShape = 'square';
  @Input() vtsFit: string | null = null;
  @Input() @InputBoolean() vtsThumbnail: boolean = false;

  dir?: Direction;
  backLoadImage!: HTMLImageElement;
  private status: ImageStatusType = 'normal';
  private destroy$: Subject<void> = new Subject();

  get previewable(): boolean {
    return this.vtsPreview && this.status !== 'error';
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    public elementRef: ElementRef,
    private vtsImageService: VtsImageService,
    protected cdr: ChangeDetectorRef,
    @Optional() private parentGroup: VtsImageGroupComponent,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.backLoad();
    if (this.parentGroup) {
      this.parentGroup.addImage(this);
    }
    if (this.directionality) {
      this.directionality.change
        ?.pipe(takeUntil(this.destroy$))
        .subscribe((direction: Direction) => {
          this.dir = direction;
          this.cdr.detectChanges();
        });
      this.dir = this.directionality.value;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPreview(): void {
    if (!this.previewable) {
      return;
    }

    if (this.parentGroup) {
      // preview inside image group
      const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
      const previewImages = previewAbleImages.map(e => ({ src: e.vtsSrc }));
      const previewIndex = previewAbleImages.findIndex(el => this === el);
      const previewRef = this.vtsImageService.preview(previewImages, {
        vtsDirection: this.dir
      });
      previewRef.switchTo(previewIndex);
    } else {
      // preview not inside image group
      const previewImages = [{ src: this.vtsSrc }];
      this.vtsImageService.preview(previewImages, { vtsDirection: this.dir });
    }
  }

  getElement(): ElementRef<HTMLImageElement> {
    return this.elementRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsSrc } = changes;
    if (vtsSrc) {
      this.getElement().nativeElement.src = vtsSrc.currentValue;
      this.backLoad();
    }
  }

  /**
   * use internal Image object handle fallback & placeholder
   * @private
   */
  private backLoad(): void {
    this.backLoadImage = new Image();
    this.backLoadImage.src = this.vtsSrc;
    this.status = 'loading';

    if (this.backLoadImage.complete) {
      this.status = 'normal';
      this.getElement().nativeElement.src = this.vtsSrc;
    } else {
      if (this.vtsPlaceholder) {
        this.getElement().nativeElement.src = this.vtsPlaceholder;
      } else {
        this.getElement().nativeElement.src = this.vtsSrc;
      }

      this.backLoadImage.onload = () => {
        this.status = 'normal';
        this.getElement().nativeElement.src = this.vtsSrc;
      };

      this.backLoadImage.onerror = () => {
        this.status = 'error';
        if (this.vtsFallback) {
          this.getElement().nativeElement.src = this.vtsFallback;
        }
      };
    }
  }
}
