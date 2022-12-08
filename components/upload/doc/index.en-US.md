---
category: Components
type: Components
title: Upload
cols: 1
order: 10
cover: https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg
---

```ts
import { VtsUploadModule } from '@ui-vts/ng-vts/upload';
```

## API

### vts-upload
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable upload | `boolean` | `false`
| vtsAccept | Same as input[type="file"] | `string` |
| vtsLimit | Number of maximum upload | `number` |
| vtsOpenFileDialogOnClick | Open dialog on click | `boolean` | `false`
| vtsMultiple | Allow to select multiple files | `boolean` | `false`
| vtsAction | Upload url or Custom observable handler to resolve url | `string \| ((file: VtsUploadFile) => string \| Observable<string>)` |
| vtsBeforeUpload | Preprocess before upload<br>In case of manual upload, return `false` from process, `vtsAction` won't be triggered | `(file: VtsUploadFile, fileList: VtsUploadFile[]) => boolean \| Observable<boolean>` |
| vtsCustomRequest | Custom XHR request | `(item) => Subscription` |
| vtsHeaders | Custom request headers | `Object \| ((file: VtsUploadFile) => Object \| Observable<{}>)` |
| vtsData | Custom request params | `Object \| ((file: VtsUploadFile) => Object \| Observable<{}>)` |
| vtsWithCredentials | Request using cookies | `bool` | `false`
| [(vtsFileList)] | Binding upload's file list (Use for controling manual upload) | VtsUploadFile[] |
| vtsRemove | Remove permission to remove a file | `(file: VtsUploadFile) => boolean \| Observable<boolean>` |
| vtsChange | Emit on uploading state changed | `EventEmitter<VtsUploadChangeParam>` |
| openDialog | Open upload dialog | Callable function |