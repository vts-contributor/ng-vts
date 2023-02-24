/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: 'vts-avatar[vts-comment-avatar]',
  exportAs: 'vtsCommentAvatar'
})
export class VtsCommentAvatarDirective {}

@Directive({
  selector: 'vts-comment-content, [vts-comment-content]',
  exportAs: 'vtsCommentContent',
  host: { class: 'vts-comment-content-detail' }
})
export class VtsCommentContentDirective {}

@Directive({
  selector: '[vtsCommentActionHost]',
  exportAs: 'vtsCommentActionHost'
})
export class VtsCommentActionHostDirective
  extends CdkPortalOutlet
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() vtsCommentActionHost?: TemplatePortal | null;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    this.attach(this.vtsCommentActionHost);
  }
}

@Component({
  selector: 'vts-comment-action',
  exportAs: 'vtsCommentAction',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VtsCommentActionComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) implicitContent!: TemplateRef<void>;
  private contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this.contentPortal;
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
  }
}
