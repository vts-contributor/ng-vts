---
category: Components
type: Components
title: Result
cols: 1
order: 17
cover: https://gw.alipayobjects.com/zos/alicdn/9nepwjaLa/Result.svg
---

```ts
import { VtsResultModule } from '@ui-vts/ng-vts/result';
```


## API

### vts-result

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsTemplate | Template icon | One of `403` `404` `500` `bad-connection` | `404`
| vtsLayout | Layout of result | One of `icon-first` `content-first` | `icon-first`
| vtsOkText | OK button label | `boolean` | `false`
| vtsOkType | OK button type | One of `primary` `default` `link` `text` | `primary`
| vtsOkLoading | OK button loading status | `boolean` | `false`
| vtsOkDisabled | OK button disable status | `boolean` | `false`
| vtsOnOk | Emit on OK button click | `EventEmitter` | 
| vtsCancelText | cancel button label | `boolean` | `false`
| vtsCancelType | cancel button type | One of `primary` `default` `link` `text` | `default`
| vtsCancelLoading | cancel button loading status | `boolean` | `false`
| vtsCancelDisabled | cancel button disable status | `boolean` | `false`
| vtsCancelOk | Emit on cancel button click | `EventEmitter` | 


### div[vts-result-title]

Declare result title template


### div[vts-result-subtitle]

Declare result subtitle template


### div[vts-result-content]

Declare result content template


### div[vts-result-action]

Overwrite result action template