/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NumberInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { InputBoolean, InputNumber, toBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsI18nService, VtsUploadI18nInterface } from '@ui-vts/ng-vts/i18n';

import {
  VtsIconRenderTemplate,
  VtsShowUploadList,
  VtsUploadChangeParam,
  VtsUploadFile,
  VtsUploadListType,
  VtsUploadTransformFileType,
  VtsUploadType,
  VtsUploadXHRArgs,
  UploadFilter,
  ZipButtonOptions
} from './interface';
import { VtsUploadBtnComponent } from './upload-btn.component';
import { VtsUploadListComponent } from './upload-list.component';

@Component({
  selector: 'vts-upload',
  exportAs: 'vtsUpload',
  templateUrl: './upload.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-upload-picture-card-wrapper]': 'vtsListType === "picture-card"'
  }
})
export class VtsUploadComponent implements OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_vtsLimit: NumberInput;
  static ngAcceptInputType_vtsSize: NumberInput;
  static ngAcceptInputType_vtsDirectory: BooleanInput;
  static ngAcceptInputType_vtsOpenFileDialogOnClick: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsMultiple: BooleanInput;
  static ngAcceptInputType_vtsShowUploadList: BooleanInput | VtsShowUploadList;
  static ngAcceptInputType_vtsShowButton: BooleanInput;
  static ngAcceptInputType_vtsWithCredentials: BooleanInput;

  private destroy$ = new Subject<void>();
  @ViewChild('uploadComp', { static: false })
  uploadComp!: VtsUploadBtnComponent;
  @ViewChild('listComp', { static: false }) listComp!: VtsUploadListComponent;

  locale!: VtsUploadI18nInterface;
  dir: Direction = 'ltr';

  replaceIndex: number = -1; // In case File Changing at same position

  // #region fields

  @Input() vtsType: VtsUploadType = 'select';
  @Input() @InputNumber() vtsLimit = 0;
  @Input() @InputNumber() vtsSize = 0;

  @Input() vtsFileType?: string;
  @Input() vtsAccept?: string | string[];
  @Input() vtsAction?: string | ((file: VtsUploadFile) => string | Observable<string>);
  @Input() @InputBoolean() vtsDirectory = false;
  @Input() @InputBoolean() vtsOpenFileDialogOnClick = false;
  @Input() vtsBeforeUpload?: (
    file: VtsUploadFile,
    fileList: VtsUploadFile[]
  ) => boolean | Observable<boolean>;
  @Input() vtsCustomRequest?: (item: VtsUploadXHRArgs) => Subscription;
  @Input() vtsData?: {} | ((file: VtsUploadFile) => {} | Observable<{}>);
  @Input() vtsFilter: UploadFilter[] = [];
  @Input() vtsFileList: VtsUploadFile[] = [];
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() vtsHeaders?: {} | ((file: VtsUploadFile) => {} | Observable<{}>);
  @Input() vtsListType: VtsUploadListType = 'text';
  @Input() @InputBoolean() vtsMultiple = false;
  @Input() vtsName = 'file';

  private _showUploadList: boolean | VtsShowUploadList = true;

  @Input()
  set vtsShowUploadList(value: boolean | VtsShowUploadList) {
    this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
  }

  get vtsShowUploadList(): boolean | VtsShowUploadList {
    return this._showUploadList;
  }

  @Input() @InputBoolean() vtsShowButton = true;
  @Input() @InputBoolean() vtsWithCredentials = false;

  @Input() vtsEdit?: (file: VtsUploadFile) => boolean | Observable<boolean>;
  @Input() vtsRemove?: (file: VtsUploadFile) => boolean | Observable<boolean>;
  @Input() vtsPreview?: (file: VtsUploadFile) => void;
  @Input() vtsPreviewFile?: (file: VtsUploadFile) => Observable<string>;
  @Input() vtsPreviewIsImage?: (file: VtsUploadFile) => boolean;
  @Input() vtsTransformFile?: (file: VtsUploadFile) => VtsUploadTransformFileType;
  @Input() vtsDownload?: (file: VtsUploadFile) => void;
  @Input() vtsIconRender: VtsIconRenderTemplate | null = null;
  @Input() vtsFileListRender: TemplateRef<void> | null = null;

  @Output()
  readonly vtsChange: EventEmitter<VtsUploadChangeParam> = new EventEmitter<VtsUploadChangeParam>();
  @Output() readonly vtsFileListChange: EventEmitter<VtsUploadFile[]> = new EventEmitter<
    VtsUploadFile[]
  >();

  _btnOptions?: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.vtsShowUploadList === 'boolean' && this.vtsShowUploadList) {
      this.vtsShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true
      };
    }
    // filters
    const filters: UploadFilter[] = this.vtsFilter.slice();
    if (
      this.vtsMultiple &&
      this.vtsLimit > 0 &&
      filters.findIndex(w => w.name === 'limit') === -1
    ) {
      filters.push({
        name: 'limit',
        fn: (fileList: VtsUploadFile[]) => fileList.slice(-this.vtsLimit)
      });
    }
    if (this.vtsSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
      filters.push({
        name: 'size',
        fn: (fileList: VtsUploadFile[]) => fileList.filter(w => w.size! / 1024 <= this.vtsSize)
      });
    }
    if (
      this.vtsFileType &&
      this.vtsFileType.length > 0 &&
      filters.findIndex(w => w.name === 'type') === -1
    ) {
      const types = this.vtsFileType.split(',');
      filters.push({
        name: 'type',
        fn: (fileList: VtsUploadFile[]) => fileList.filter(w => ~types.indexOf(w.type!))
      });
    }
    this._btnOptions = {
      disabled: this.vtsDisabled,
      accept: this.vtsAccept,
      action: this.vtsAction,
      directory: this.vtsDirectory,
      openFileDialogOnClick: this.vtsOpenFileDialogOnClick,
      beforeUpload: this.vtsBeforeUpload,
      customRequest: this.vtsCustomRequest,
      data: this.vtsData,
      headers: this.vtsHeaders,
      name: this.vtsName,
      multiple: this.vtsMultiple,
      withCredentials: this.vtsWithCredentials,
      filters,
      transformFile: this.vtsTransformFile,
      onStart: this.onStart,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onError: this.onError
    };
    return this;
  }

  // #endregion

  constructor(
    private cdr: ChangeDetectorRef,
    private i18n: VtsI18nService,
    @Optional() private directionality: Directionality
  ) {}

  // #region upload

  private fileToObject(file: VtsUploadFile): VtsUploadFile {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename || file.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      error: file.error,
      percent: 0,
      originFileObj: file as VtsSafeAny
    };
  }

  private getFileItem(file: VtsUploadFile, fileList: VtsUploadFile[]): VtsUploadFile {
    return fileList.filter(item => item.uid === file.uid)[0];
  }

  private removeFileItem(file: VtsUploadFile, fileList: VtsUploadFile[]): VtsUploadFile[] {
    return fileList.filter(item => item.uid !== file.uid);
  }

  private onStart = (file: VtsUploadFile): void => {
    if (!this.vtsFileList) {
      this.vtsFileList = [];
    }
    const targetItem = this.fileToObject(file);
    targetItem.status = 'uploading';
    if (this.replaceIndex == -1) this.vtsFileList = this.vtsFileList.concat(targetItem);
    else {
      this.onRemove(this.vtsFileList[this.replaceIndex]);
      const newList = [...this.vtsFileList];
      newList.splice(this.replaceIndex, 0, targetItem);
      this.vtsFileList = newList;
      this.replaceIndex = -1;
    }
    this.vtsFileListChange.emit(this.vtsFileList);
    this.vtsChange.emit({
      file: targetItem,
      fileList: this.vtsFileList,
      type: 'start'
    });
    this.detectChangesList();
  };

  private onProgress = (e: { percent: number }, file: VtsUploadFile): void => {
    const fileList = this.vtsFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.percent = e.percent;
    this.vtsChange.emit({
      event: e,
      file: { ...targetItem },
      fileList: this.vtsFileList,
      type: 'progress'
    });
    this.detectChangesList();
  };

  private onSuccess = (res: {}, file: VtsUploadFile): void => {
    const fileList = this.vtsFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.status = 'done';
    targetItem.response = res;
    this.vtsChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'success'
    });
    this.detectChangesList();
  };

  private onError = (err: {}, file: VtsUploadFile): void => {
    const fileList = this.vtsFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.error = err;
    targetItem.status = 'error';
    this.vtsChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'error'
    });
    this.detectChangesList();
  };

  // #endregion

  // #region drag

  private dragState?: string;

  // skip safari bug
  fileDrop(e: DragEvent): void {
    if (e.type === this.dragState) {
      return;
    }
    this.dragState = e.type;
    this.setClassMap();
  }

  // #endregion

  // #region list

  private detectChangesList(): void {
    this.cdr.detectChanges();
    this.listComp?.detectChanges();
  }

  onRemove = (file: VtsUploadFile): void => {
    this.uploadComp.abort(file);
    file.status = 'removed';
    const fnRes =
      typeof this.vtsRemove === 'function'
        ? this.vtsRemove(file)
        : this.vtsRemove == null
        ? true
        : this.vtsRemove;
    (fnRes instanceof Observable ? fnRes : of(fnRes))
      .pipe(filter((res: boolean) => res))
      .subscribe(() => {
        this.vtsFileList = this.removeFileItem(file, this.vtsFileList);
        this.vtsChange.emit({
          file,
          fileList: this.vtsFileList,
          type: 'removed'
        });
        this.vtsFileListChange.emit(this.vtsFileList);
        this.cdr.detectChanges();
      });
  };

  onEdit = (file: VtsUploadFile): void => {
    const index = this.vtsFileList.indexOf(file);
    this.replaceIndex = index;
    this.openDialog();
  };

  // #endregion

  // #region styles

  private prefixCls = 'vts-upload';
  classList: string[] = [];

  private setClassMap(): void {
    let subCls: string[] = [];
    if (this.vtsType === 'drag') {
      if (this.vtsFileList.some(file => file.status === 'uploading')) {
        subCls.push(`${this.prefixCls}-drag-uploading`);
      }
      if (this.dragState === 'dragover') {
        subCls.push(`${this.prefixCls}-drag-hover`);
      }
    } else {
      subCls = [`${this.prefixCls}-select-${this.vtsListType}`];
    }

    this.classList = [
      this.prefixCls,
      `${this.prefixCls}-${this.vtsType}`,
      !this.vtsOpenFileDialogOnClick ? `${this.prefixCls}-${this.vtsType}-mute-dialog` : ``,
      ...subCls,
      (this.vtsDisabled && `${this.prefixCls}-disabled`) || '',
      (this.dir === 'rtl' && `${this.prefixCls}-rtl`) || ''
    ].filter(item => !!item);

    this.cdr.detectChanges();
  }

  // #endregion

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.setClassMap();
      this.cdr.detectChanges();
    });

    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Upload');
      this.detectChangesList();
    });
  }

  ngOnChanges(): void {
    this.zipOptions().setClassMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog() {
    this.uploadComp.openDialog();
  }
}
