---
category: Components
type: Components
title: Skeleton
cols: 1
cover: ''
order: 100
---

## API

### vts-skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Whether to show animation effect | `boolean` | `false` |
| vtsAvatar | Whether to show avatar placeholder | `boolean \| VtsSkeletonAvatar` | `false` |
| vtsLoading | Whether to display the skeleton loading | `boolean` | `false` |
| vtsParagraph | Whether to show paragraph placeholder | `boolean \| VtsSkeletonParagraph` | `true` |
| vtsTitle | Whether to show title placeholder | `boolean \| VtsSkeletonTitle` | `true` |
| vtsRounded | Whether to show paragraph and title radius | `boolean` | `false` |

### VtsSkeletonAvatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| size | Size of avatar | `number` or one of `xxs` `xs` `sm` `md` `lg` `xl` | `xs` |
| shape | Shape of avatar | One of `square` `rounded` `circle` | `circle` |

### VtsSkeletonTitle

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | Width of title | `number \| string` |

### VtsSkeletonParagraph

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Number of row of paragraph | `number` |
| width | Width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | `number \| string \| Array<number \| string>` |

### vts-skeleton-element[vtsType="button"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Size of button | One of `xs` `sm` `md` `lg` `xl` | `md` |
| vtsShape | Shape of button | One of `square` `rounded` `circle` | `square` |

### vts-skeleton-element[vtsType="avatar"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Size of avatar | `number` or one of `xxs` `xs` `sm` `md` `lg` `xl` | `xs` |
| vtsShape | Shape the avatar | One of `square` `rounded` `circle` | `circle` |

### vts-skeleton-element[vtsType="input"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Size of input | One of `sm` `md` `lg` `xl` | `md` |

### vts-skeleton-element[vtsType="image"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |

