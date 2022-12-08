/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { IndexableObject, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable, Subscription } from 'rxjs';

/** Status */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export type VtsUploadType = 'select' | 'drag';

/** Built-in styles of the uploading list. */
export type VtsUploadListType = 'text' | 'picture' | 'picture-card';

export interface VtsUploadFile {
  uid: string;
  size?: number;
  name: string;
  filename?: string;
  lastModified?: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  originFileObj?: File;
  percent?: number;
  thumbUrl?: string;
  response?: VtsSafeAny;
  error?: VtsSafeAny;
  linkProps?: { download: string };
  type?: string;

  [key: string]: VtsSafeAny;
}

export interface VtsUploadChangeParam {
  file: VtsUploadFile;
  fileList: VtsUploadFile[];
  event?: { percent: number };
  /** Callback type. */
  type?: string;
}

export interface VtsShowUploadList {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
}

export type VtsUploadTransformFileType =
  | string
  | Blob
  | VtsUploadFile
  | Observable<string | Blob | File>;

export interface ZipButtonOptions {
  disabled?: boolean;
  accept?: string | string[];
  action?: string | ((file: VtsUploadFile) => string | Observable<string>);
  directory?: boolean;
  openFileDialogOnClick?: boolean;
  beforeUpload?(file: VtsUploadFile, fileList: VtsUploadFile[]): boolean | Observable<VtsSafeAny>;
  customRequest?(item: VtsSafeAny): Subscription;
  data?: {} | ((file: VtsUploadFile) => {} | Observable<{}>);
  headers?: {} | ((file: VtsUploadFile) => {} | Observable<{}>);
  name?: string;
  multiple?: boolean;
  withCredentials?: boolean;
  filters?: UploadFilter[];
  transformFile?(file: VtsUploadFile): VtsUploadTransformFileType;
  onStart?(file: VtsUploadFile): void;
  onProgress?(e: VtsSafeAny, file: VtsUploadFile): void;
  onSuccess?(ret: VtsSafeAny, file: VtsUploadFile, xhr: VtsSafeAny): void;
  onError?(err: VtsSafeAny, file: VtsUploadFile): void;
}

export interface UploadFilter {
  name: string;
  fn(fileList: VtsUploadFile[]): VtsUploadFile[] | Observable<VtsUploadFile[]>;
}

export interface VtsUploadXHRArgs {
  action?: string;
  name?: string;
  headers?: IndexableObject;
  file: VtsUploadFile;
  postFile: string | Blob | File | VtsUploadFile;
  data?: IndexableObject;
  withCredentials?: boolean;
  onProgress?(e: VtsSafeAny, file: VtsUploadFile): void;
  onSuccess?(ret: VtsSafeAny, file: VtsUploadFile, xhr: VtsSafeAny): void;
  onError?(err: VtsSafeAny, file: VtsUploadFile): void;
}

export type VtsIconRenderTemplate = TemplateRef<{ $implicit: VtsUploadFile }>;
