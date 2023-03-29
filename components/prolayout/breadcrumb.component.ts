import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';

@Component({
  selector: 'vts-prolayout-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class VtsProlayoutBreadCrumbComponent implements OnInit {
  constructor() {}

  @Input() vtsBreadcrumbArray: VtsBreadcrumbItem[] = [];
  @Input() vtsSeparator: string | TemplateRef<void> | null = '❯';

  ngOnInit() {}
}
