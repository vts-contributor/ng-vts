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
| vtsLoading | Whether to display the skeleton loading | `boolean` |
| vtsParagraph | Whether to show paragraph placeholder | `boolean \| VtsSkeletonParagraph` | `true` |
| vtsTitle | Whether to show title placeholder | `boolean \| VtsSkeletonTitle` | `true` |
| vtsRound | Whether to show paragraph and title radius | `boolean` | `false` |


### VtsSkeletonAvatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| size | Set the size of avatar | `number \| 'large' \| 'small' \| 'default'` |
| shape | Set the shape of avatar | `'circle' \| 'square'` |

### VtsSkeletonTitle

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | Set the width of title | `number \| string` |

### VtsSkeletonParagraph

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | `number` |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | `number \| string \| Array<number \| string>` |

### vts-skeleton-element[vtsType="button"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Set the size | `'large' \| 'small' \| 'default'` | `default` |
| vtsShape | Set the shape | `'circle' \| 'round' \| 'default'` | `default` |

### vts-skeleton-element[vtsType="avatar"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Set the size | `number \| 'large' \| 'small' \| 'default'` | `default` |
| vtsShape | Set the shape | `'circle' \| 'square'` | `square` |

### vts-skeleton-element[vtsType="input"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |
| vtsSize | Set the size | `'large' \| 'small' \| 'default'` | `default` |

### vts-skeleton-element[vtsType="image"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsActive | Show animation effect | `boolean` | `false` |

