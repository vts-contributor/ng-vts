---
category: Components
type: Layout
cols: 1
title: Layout
cover: https://gw.alipayobjects.com/zos/alicdn/hzEndUVEx/Layout.svg
---

Handling the overall layout of a page.

```ts
import { VtsProLayoutModule } from '@ui-vts/ng-vts/prolayout';
```

## Specification

### Size

The first level navigation is inclined left near a logo, and the secondary menu is inclined right.

- Top Navigation (almost systems): the height of the first level navigation `64px`, the second level navigation `48px`.
- Top Navigation(contents page): the height of the first level navigation `80px`, the second level navigation `56px`.
- Calculation formula of a top navigation: `48+8n`.
- Calculation formula of an aside navigation: `200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distincted by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the stlye of the current navigation item will be applied to its parent level;
- The left side navigation bar has support for both the accordion and expanding styles, you can choose the one that fits your case best.

## Visualization rules

 Style of a navigation should conform to the its level.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item, we recommed using it for the last item of the navigation path.

- **Hightlighted font**

  From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`、`14px` is a standard font size of navigations，`14px` is used for the first and the second level of the navigation. You can choose a approprigate font size in terms of the level of your navigation.

## Component Overview

- `vts-pro-layout`: The layout wrapper, in which `vts-prolayout-header` `vts-prolayout-sider` `vts-prolayout-content` `vts-prolayout-footer` or `vts-pro-layout` itself can be nested, and can be placed in any parent container.
- `vts-prolayout-header`: The top layout with default style, in which any element can be nested, and must be placed in `vts-pro-layout`.
- `vts-prolayout-sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `vts-pro-layout`.
- `vts-prolayout-content`: The content layout with default style, in which any element can be nested, and must be placed in `vts-pro-layout`.
- `vts-prolayout-footer`: The bottom layout with default style, in which any element can be nested, and must be placed in `vts-prolayout-layout`.

> Based on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

## API

```html
<vts-pro-layout>
  <vts-prolayout-header>header</vts-prolayout-header>
  <vts-prolayout-layout>
    <vts-prolayout-sider>left sidebar</vts-prolayout-sider>
    <vts-prolayout-content>main content</vts-prolayout-content>
    <vts-prolayout-sider>right sidebar</vts-prolayout-sider>
  </vts-pro-layout>
  <vts-prolayout-footer>footer</vts-prolayout-footer>
</vts-pro-layout>
```

### vts-sider

The sidebar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsBreakpoint]` | breakpoints of the responsive layout | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | - |
| `[vtsCollapsedWidth]` | width of the collapsed sidebar, by setting to `0` a special trigger will appear | `number` | `64` |
| `[vtsCollapsible]` | whether can be collapsed | `boolean` | `false` |
| `[vtsCollapsed]` | the collapsed status can be double binding | `boolean` | `false` |
| `[vtsReverseArrow]` | reverse direction of arrow, for a sider that expands from the right | `boolean` | `false` |
| `[vtsTrigger]` | specify the customized trigger, set to null to hide the trigger | `string \| TemplateRef<void>` | - |
| `[vtsZeroTrigger]` | specify the customized trigger when vtsCollapsedWidth setting to `0` | `TemplateRef<void>` | - |
| `[vtsWidth]` | width of the sidebar | `number \| string` | `200` |
| `[vtsTheme]` | color theme of the sidebar | `'light' \| 'dark'` | `dark` |
| `(vtsCollapsedChange)` | the callback function | `EventEmitter<boolean>` | - |

#### breakpoint width

```js
{
  xs: '360px',
  sm: '600px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1600px'
}
```
