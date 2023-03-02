import { TemplateRef } from '@angular/core';

export abstract class VtsBreadcrumb {
  abstract vtsSeparator: string | TemplateRef<void> | null;
}
