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
| vtsBlock | Display upload button as block instead of inline-block | `boolean` | `false`
| vtsType | Mode of upload button placeholder | One of `select` `drag` | `select`
| vtsListType | Mode of upload list display | One of `row` `gallery` | `row`
| vtsDisabled | Disable upload | `boolean` | `false`
| vtsAccept | Same as input[type="file"] | `string` |
| vtsShowButton | Whether to show upload button | `boolean` | `true`
| vtsOpenFileDialogOnClick | Open dialog on click | `boolean` | `false`
| vtsMultiple | Allow to select multiple files | `boolean` | `false`
| vtsAction | Upload url or Custom observable handler to resolve url | `string \| ((file: VtsUploadFile) => string \| Observable<string>)` |
| vtsBeforeUpload | Preprocess before upload<br>In case of manual upload, return `false` from process, `vtsAction` won't be triggered | `(file: VtsUploadFile, fileList: VtsUploadFile[]) => boolean \| Observable<boolean>` |
| vtsCustomRequest | Custom XHR request | `(item) => Subscription` |
| vtsHeaders | Custom request headers | `Object \| ((file: VtsUploadFile) => Object \| Observable<{}>)` |
| vtsData | Custom request params | `Object \| ((file: VtsUploadFile) => Object \| Observable<{}>)` |
| vtsWithCredentials | Request using cookies | `bool` | `false`
| [(vtsFileList)] | Binding upload's file list (Use for controling manual upload) | `VtsUploadFile[]` |
| vtsPreview | Custom function to handle preview image | `(file: VtsUploadFile) => void` |
| vtsPreviewFile | Customize preview file logic | `(file: VtsUploadFile) => Observable<dataURL: string>` |
| vtsPreviewIsImage | Customize check if preview is an image | `(file: VtsUploadFile) => boolean` |
| vtsDirectory | Whether to use directory upload mode | `boolean` | `false`
| vtsLimit | (Validate) Number of maximum upload per select | `number` |
| vtsSize | (Validate) Size of file allowed to upload (in kb) | `number` |
| vtsFileType | (Validate) Type of file allowed to upload (mime), seperated by "," | `string` |
| vtsFilter | Array of custom validators to be execute whenever new files added | `VtsUploadFilter` |
| vtsRemove | Remove permission to remove a file | `(file: VtsUploadFile) => boolean \| Observable<boolean>` |
| (vtsAfterFilter) | Emit after filters done | `EventEmitter<VtsUploadAfterFilterChanges>` |
| (vtsChange) | Emit on uploading state changed | `EventEmitter<VtsUploadChangeParam>` |
| openDialog | Open upload dialog | Callable function |

### VtsUploadFile

| Property | Description | Type |
| -------- | ----------- | ---- |
| uid | Unique id will be setted on selected | `string` |
| size | Size of file | `number` |
| type | Type of file | `string` |
| name | Name of file | `string` |
| status | Status of file | One of `error` `success` `done` `uploading` `removed` |
| url | Uploaded url | `string` |
| thumbUrl | Preview url | `string` |
| originFileObj | Original native File Object | `File` |
| lastModified | File's stat | `string` |
| lastModifiedDate | File's stat | `Date` |
| percent | Upload percent | `number` |
| response | Response from upload API | `any` |
| error | Error from upload | `any` |
| rejectReason | Reason of being rejected in `vtsFilter` and validators | `string` |

### VtsUploadFilter

| Property | Description | Type |
| -------- | ----------- | ---- |
| name | Name code of validator | `string` |
| fn | Validator logic | `(file: VtsUploadFile[]) => VtsUploadFile[] \| Observable<VtsUploadFile[]>` |

### VtsUploadFilter

| Property | Description | Type |
| -------- | ----------- | ---- |
| rejected | Files rejected after filtered | `VtsUploadFile[]` |
| list | Current file list | `VtsUploadFile[]` |

### VtsUploadChangeParam
| Property | Description | Type |
| -------- | ----------- | ---- |
| file | Current file | `VtsUploadFile` |
| fileList | Current file list | `VtsUploadFile[]` |
| event | Current upload event | `{percent: number}` |
| type | Type of upload event | `string` |
