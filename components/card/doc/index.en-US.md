---
category: Components
type: Components
title: Card
cols: 1
cover: ''
---

```ts
import { VtsCardModule } from '@ui-vts/ng-vts/card';
```

## API

Structure (Can be shuffled)

```html
<vts-card>
    /** Thumbnail **/
    <vts-card-thumbnail></vts-card-thumbnail>

    /** Header **/
    <vts-card-header>
        /** If using template **/
        <vts-card-header-title></vts-card-header-title>
        <vts-card-header-extra></vts-card-header-extra>
    </vts-card-header>

    /** Meta **/
    <vts-card-meta>
        /** If using template **/
        <vts-card-header-title></vts-card-header-title>
        <vts-card-header-description></vts-card-header-description>
        <vts-card-header-avatar></vts-card-header-avatar>
    </vts-card-meta>

    /** Body **/
    // Anything

    /** Footer **/
    <vts-card-footer>
        // Anything
    </vts-card-footer>
</vts-card>
```

### vts-card

| Property             | Description                                                                | Type                                         | Default |
|----------------------|----------------------------------------------------------------------------|----------------------------------------------|---------|
| vtsBordered          | Whether to set border for card                                             | `boolean`                                    | `true`  |
| vtsBorderless        | Whether to unset border for card (shorthand for `[vtsBordered]="false"`)   | `boolean`                                    | `false` |
| vtsNoRadius          | Whether to unset border radius for card                                    | `boolean`                                    | `false` |
| vtsLoading           | Whether to display loading state                                           | `boolean`                                    | `false` |
| vtsHoverable         | Whether to allow hovering                                                  | `boolean`                                    | `true`  |
| vtsBodyStyle         | Set NgStyle for body                                                       | `NgStyleInterface`                           |         |

### vts-card-thumbnail

All property of [vts-image](./components/avatar/en)

| Property           | Description                      | Type                                     | Default |
|--------------------|---------------------------------|-------------------------------------------|---------|
| vtsPosition        | Position of thumbnail           | One of `top` `left` `right` `bottom`      | `top`   |
| vtsTemplate        | Custom template for thumbnail   | `TemplateRef`                             |         |

### vts-card-header

| Property           | Description         | Type                            | Default |
|--------------------|---------------------|---------------------------------|---------|
| vtsTitle           | Card header title   | `string`                        |         |

### vts-card-header-title

Custom template for header title

### vts-card-header-extra

Custom template for header extra actions at left

### vts-card-meta

| Property       | Description                                                                                              | Type                           | Default      |
| -------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------ |
| vtsTitle       | Card meta title                                                                                          | `string`                       |              |
| vtsDescription | Card meta description                                                                                    | `string`                       |              |
| vtsBordered    | Whether to display border at bottom                                                                      | `boolean`                      | `false`      |
| vtsDirection   | Direction for meta display                                                                               | One of `vertical` `horizontal` | `horizontal` |
| vtsAlign       | Alignment for meta display<br />Note: `center` has no effect if used with `vtsDirection` of `horizontal` | One of `left` `center` `right` | `left`       |

### vts-card-meta-title

Custom template for meta title

### vts-card-meta-description

Custom template for meta description

### vts-card-meta-avatar

Meta avatar template
All property of [vts-avatar](/uikit/components/avatar/en)

### vts-card-footer

Card footer template