---
category: Components
type: Data Display
title: Comment
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/ILhxpGzBO/Comment.svg
---

A comment displays user feedback and discussion to website content.

## When To Use

Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.

```ts
import { VtsCommentModule } from '@ui-vts/ng-vts/comment';
```

## API

### vts-comment

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| [vtsAuthor] | The element to display as the comment author | `string \| TemplateRef<void>` | - |
| [vtsDatetime] | A datetime element containing the time to be displayed | `string \| TemplateRef<void>` | - |

### [vts-comment-avatar]

The element to display as the comment avatar.

### vts-comment-content

The main content of the comment.

### vts-comment-action

The element items rendered below the comment content.
