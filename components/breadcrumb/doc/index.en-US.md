---
category: Components
type: Components
cols: 1
title: Breadcrumb
cover: ''
order: 100
---

## API

### vts-breadcrumb

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsSeparator | Custom separator | `string \| TemplateRef<void> \| null` | `❯` |
| vtsBreadcrumbArray | An array of breadcrumb items | `{ label: string, url: string \| UrlTree \| string[], icon: string, disabled: boolean }[]` |
| vtsAutoGenerate | Auto generate breadcrumb using Route Data | `boolean` | `false` |
| vtsRouteLabel | Only usable when `vtsAutoGenerate` is `true`.<br /> Name of property that determines displayed text in routing config | `string` | `breadcrumb` |
| vtsRouteLabelFn | Only usable when `vtsAutoGenerate` is `true`.<br />Format function for breadcrumb item label text | `(label:string) => string` | `label => label` |
| vtsRouteIcon | Only usable when `vtsAutoGenerate` is `true`.<br /> Name of property that determines displayed icon in routing config | `string` | `breadcrumbIcon` |

### vts-breadcrumb-item

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsLabel | Breadcrumb label | `string` |
| vtsIcon | Breadcrumb icon type | `string` |
| vtsUrl | Navigation for breadcrumb | `string \| UrlTree \| string[]` |
| vtsOverlay | Breadcrumb overlay menu | `VtsDropdownMenuComponent` |
| vtsDisabled | Breadcrumb disabled state | `boolean` | `false`

<br />
Using `[vtsAutoGenerate]` by configuring `data` like this:

```ts
{
  path: '/path',
  component: SomeComponent,
  data: {
    breadcrumb: 'Display Name',
    breadcrumbIcon: 'Home'
  }
}
```

For lazy loading modules, you should write `data` in parent module like this:

```ts
{
  path: 'first',
  loadChildren: './first/first.module#FirstModule',
  data: {
    breadcrumb: 'Display Name',
    breadcrumbIcon: 'Home'
  },
}
```

Use `vtsRouteLabel` and `vtsRouteIcon` to custom property key for label and icon:

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

Use `vtsRouteLabelFn` to format breadcrumb label:

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