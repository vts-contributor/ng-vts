---
category: Components
type: Navigation
title: Breadcrumb
cover: https://gw.alipayobjects.com/zos/alicdn/9Ltop8JwH/Breadcrumb.svg
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

```ts
import { VtsBreadCrumbModule } from '@ui-vts/ng-vts/breadcrumb';
```

## API

### vts-breadcrumb

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsSeparator]` | Custom separator | `string \| TemplateRef<void> \| null` | `'/'` |
| `[vtsHome]` | (optional) Custom home menu. Default icon: Home icon | `BreadcrumbItem` | `null` |
| `[vtsBreadcrumbArray]` | (optional) An array of breadcrumb items | `array` | `[]` |
| `[vtsAutoGenerate]` | Auto generate breadcrumb | `boolean` | `false` |
| `[vtsRouteLabel]` | Name of property that determines displayed text in routing config. It should be used when `vtsAutoGenerate` is `true` | `string` | `'breadcrumb'` |
| `[vtsRouteLabelFn]` | Format breadcrumb item label text，normally used in international app to translate i18n key. It should be used when `vtsAutoGenerate` is `true` | `(label:string) => string` | `label => label` |

Using `[vtsAutoGenerate]` by configuring `data` like this:

```ts
{
  path: '/path',
  component: SomeComponent,
  data: {
    breadcrumb: 'Display Name'
  }
}
```

For lazy loading modules, you should write `data` in parent module like this:

```ts
{
  path: 'first',
  loadChildren: './first/first.module#FirstModule',
  data: {
    breadcrumb: 'First'
  },
}
```

use `vtsRouteLabel` to custom `data` breadcrumb label:

```html
<vts-breadcrumb [vtsAutoGenerate]="true" [vtsRouteLabel]="'customBreadcrumb'"></vts-breadcrumb>
```

```ts
{
  path: 'path',
  component: SomeComponent,
  data: {
    customBreadcrumb: 'Display Name'
  }
}
```

use `vtsRouteLabelFn` to format breadcrumb label in international application:

```html
<vts-breadcrumb [vtsAutoGenerate]="true" [vtsRouteLabel]="'breadcrumbI18nKey'" [vtsRouteLabelFn]="translateFn"></vts-breadcrumb>
```

```ts
// In Route
{
  path: 'path',
  component: SomeComponent,
  data: {
    breadcrumbI18nKey: 'i18n.aaa.bbbb'
  }
}

// In component
translateFn = (key:string) => this.yourI18nService.translate(key);
```