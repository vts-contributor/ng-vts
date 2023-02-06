/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ESCAPE, hasModifierKey, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs/operators';

import { VtsImagePreviewOptions } from './image-preview-options';
import { VtsImagePreviewComponent } from './image-preview.component';

export class VtsImagePreviewRef {
  constructor(
    public previewInstance: VtsImagePreviewComponent,
    private config: VtsImagePreviewOptions,
    private overlayRef: OverlayRef
  ) {
    overlayRef
      .keydownEvents()
      .pipe(
        filter(
          event =>
            (this.config.vtsKeyboard as boolean) &&
            (event.keyCode === ESCAPE ||
              event.keyCode === LEFT_ARROW ||
              event.keyCode === RIGHT_ARROW) &&
            !hasModifierKey(event)
        )
      )
      .subscribe(event => {
        event.preventDefault();
        if (event.keyCode === ESCAPE) {
          this.close();
        }
        if (event.keyCode === LEFT_ARROW) {
          this.prev();
        }
        if (event.keyCode === RIGHT_ARROW) {
          this.next();
        }
      });

    overlayRef.detachments().subscribe(() => {
      this.overlayRef.dispose();
    });

    previewInstance.containerClick.pipe(take(1)).subscribe(() => {
      this.close();
    });

    previewInstance.closeClick.pipe(take(1)).subscribe(() => {
      this.close();
    });

    previewInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'leave'),
        take(1)
      )
      .subscribe(() => {
        this.dispose();
      });
  }

  switchTo(index: number): void {
    this.previewInstance.switchTo(index);
  }

  next(): void {
    this.previewInstance.next();
  }

  prev(): void {
    this.previewInstance.prev();
  }

  close(): void {
    this.previewInstance.startLeaveAnimation();
  }

  private dispose(): void {
    this.overlayRef.dispose();
  }
}
