// tslint:disable:no-any
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  Component,
  DebugElement,
  Injector,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { Observable, Observer, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import en_US from '../i18n/languages/en_US';
import { VtsI18nModule } from '../i18n/vts-i18n.module';
import { VtsI18nService } from '../i18n/vts-i18n.service';
import { VtsProgressModule } from '../progress/progress.module';
import { VtsToolTipModule } from '../tooltip/tooltip.module';

import {
  VtsShowUploadList,
  VtsUploadChangeParam,
  VtsUploadFile,
  VtsUploadListType,
  VtsUploadTransformFileType,
  VtsUploadType,
  UploadFilter,
  ZipButtonOptions
} from './interface';
import { VtsUploadBtnComponent } from './upload-btn.component';
import { VtsUploadListComponent } from './upload-list.component';
import { VtsUploadComponent } from './upload.component';

const FILECONTENT = [
  `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`
];
const FILE = new File(FILECONTENT, '');
const PNGSMALL = {
  target: {
    files: [
      new File(FILECONTENT, 'test.png', {
        type: 'image/png'
      })
    ]
  }
};
const JPGSMALL = {
  target: {
    files: [
      new File(FILECONTENT, 'test.jpg', {
        type: 'image/jpg'
      })
    ]
  }
};
const LARGEFILE = {
  name: 'test.png',
  size: 500001,
  type: 'image/png'
};
const PNGBIG = {
  target: { files: { 0: LARGEFILE, length: 1, item: () => LARGEFILE } }
};

class Item {
  children?: Item[];

  constructor(public name: string) {}
}

describe('upload', () => {
  it('should be throw error when not import HttpClient module', () => {
    expect(() => {
      TestBed.configureTestingModule({
        declarations: [VtsUploadBtnComponent, TestUploadBtnComponent]
      }).createComponent(TestUploadBtnComponent);
    }).toThrow();
  });

  describe('component', () => {
    let injector: Injector;
    let fixture: ComponentFixture<TestUploadComponent>;
    let dl: DebugElement;
    let instance: TestUploadComponent;
    let pageObject: VtsUploadPageObject;
    let httpMock: HttpTestingController;
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          HttpClientTestingModule,
          CommonModule,
          FormsModule,
          VtsToolTipModule,
          VtsProgressModule,
          VtsI18nModule,
          VtsIconTestModule
        ],
        declarations: [
          VtsUploadComponent,
          VtsUploadListComponent,
          TestUploadComponent,
          VtsUploadBtnComponent
        ]
      });
      fixture = TestBed.createComponent(TestUploadComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
      pageObject = new VtsUploadPageObject();
      httpMock = injector.get(HttpTestingController);
    });

    describe('[default]', () => {
      it('should be upload a file', () => {
        expect(instance._vtsChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.vtsAction as string);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      it('should notify progress when upload a large file', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.vtsAction as string);
        req.event({ type: 1, loaded: 0, total: 0 });
        pageObject.expectChange('progress');
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectChange('progress');
        expect(instance._vtsChange.event!.percent).toBe(10);
        req.event({ type: 1, loaded: 20, total: 100 });
        expect(instance._vtsChange.event!.percent).toBe(20);
        req.flush({ status: 'ok' });
        httpMock.verify();
      });

      it('should be error when using 404 http', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.vtsAction as string);
        req.error(new ErrorEvent('network'), {
          status: 404,
          statusText: 'not found'
        });
        pageObject.expectChange('error');
        httpMock.verify();
      });

      it('should limit 2 file when allow multiple', () => {
        instance.vtsLimit = 2;
        instance.vtsMultiple = true;
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile([
          ...PNGSMALL.target.files,
          ...PNGSMALL.target.files,
          ...PNGSMALL.target.files
        ]);
        expect(instance._beforeUploadList.length).toBe(instance.vtsLimit);
      });

      it('should limit png file type', () => {
        instance.vtsFileType = 'image/png';
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile(JPGSMALL.target.files);
        expect(instance._beforeUploadList.length).toBe(0);
      });

      it('should limit 1kb size', () => {
        instance.vtsSize = 1;
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postLarge();
        expect(instance._beforeUploadList.length).toBe(0);
      });

      it('should be abort when user canceled', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.vtsAction as string);
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectLength(1);
        pageObject.getByCss('.vtsicon-delete').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
        httpMock.verify();
      });

      it('should be removed via list', () => {
        instance.vtsFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png'
          } as any
        ];
        fixture.detectChanges();
        pageObject.expectLength(1);
        pageObject.getByCss('.vtsicon-delete').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
      });

      it('should be upload a file via drag', () => {
        instance.vtsType = 'drag';
        fixture.detectChanges();
        instance.comp.fileDrop({ type: 'dragover' } as any);
        instance.comp.fileDrop({ type: 'dragover' } as any);
        fixture.detectChanges();
        expect(pageObject.getByCss('.vts-upload-drag-hover') != null).toBe(true);
      });

      it('should be show uploading status when via drag', () => {
        instance.vtsType = 'drag';
        instance.vtsFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as any
        ];
        fixture.detectChanges();
        expect(pageObject.getByCss('.vts-upload-drag-uploading') != null).toBe(true);
      });

      it('#i18n', () => {
        instance.vtsFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png'
          } as any
        ];
        fixture.detectChanges();
        injector.get(VtsI18nService).setLocale(en_US);
        fixture.detectChanges();
        const removeFileText = pageObject.getByCss(
          '.vts-upload-list-item-card-actions-btn > .vtsicon-delete'
        ).nativeElement as HTMLElement;
        expect(removeFileText.parentElement!.title).toBe(en_US.Upload.removeFile);
      });
    });

    describe('property', () => {
      describe('[vtsActive]', () => {
        it('shoule be return string when is function', () => {
          const url = `/new-url`;
          instance.vtsAction = () => url;
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(() => true);
          expect(req.request.url).toBe(url);
        });
        it('shoule be return Observable when is function', () => {
          const url = `/new-url-with-observalbe`;
          instance.vtsAction = () => of(url);
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(() => true);
          expect(req.request.url).toBe(url);
        });
      });

      describe('[vtsData]', () => {
        it('should custom form data vis function', () => {
          instance.vtsData = () => {
            return { a: 1 };
          };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data via object', () => {
          instance.vtsData = { a: 1 };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('shoule custom form data via Observable', () => {
          instance.vtsData = () => of({ a: 1 });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should comst fileter', () => {
          instance.vtsFilter = [{ name: 'custom', fn: () => [] }];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postLarge();
          expect(instance._beforeUploadList.length).toBe(0);
        });
      });

      it('[vtsDisabled]', () => {
        instance.vtsDisabled = true;
        fixture.detectChanges();
        expect(pageObject.getByCss('.vts-upload-disabled') != null).toBe(true);
      });

      describe('[vtsHeaders]', () => {
        it('should custom form data vis function', () => {
          instance.vtsHeaders = () => {
            return { a: '1' };
          };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis object', () => {
          instance.vtsHeaders = { a: '1' };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis Observable', () => {
          instance.vtsHeaders = () => of({ a: '1' });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should be allow null header', () => {
          instance.vtsHeaders = null;
          fixture.detectChanges();
          pageObject.postSmall().expectChange();
        });
      });

      describe('[vtsTransformFile]', () => {
        it('should be from small to big', () => {
          instance.vtsTransformFile = () => new File([`1`], `1.png`);
          fixture.detectChanges();
          pageObject.postLarge();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect((req.request.body.get('file') as VtsUploadFile).size).toBe(1);
          req.flush({});
          httpMock.verify();
        });
        it('should return Observable', () => {
          instance.vtsTransformFile = () => of(new File([`123`], `1.png`));
          fixture.detectChanges();
          pageObject.postLarge();
          const req = httpMock.expectOne(instance.vtsAction as string);
          expect((req.request.body.get('file') as VtsUploadFile).size).toBe(3);
          req.flush({});
          httpMock.verify();
        });
      });

      describe('when vtsType is drag', () => {
        it('should working', () => {
          instance.vtsType = 'drag';
          fixture.detectChanges();
          expect(pageObject.getByCss('.vts-upload-drag') != null).toBe(true);
        });

        it('shoule be remove item', () => {
          instance.vtsType = 'drag';
          instance.vtsFileList = [
            {
              uid: 1,
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/xxx.png'
            }
          ] as any[];
          fixture.detectChanges();
          expect(instance._onRemove).toBe(false);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          expect(instance._onRemove).toBe(true);
        });
      });

      it('[vtsShowButton]', () => {
        instance.vtsShowButton = false;
        fixture.detectChanges();
        const btnAreaEl = pageObject.getByCss(`.vts-upload-${instance.vtsType}`);
        expect(btnAreaEl.styles.display).toBe('none');
      });

      it('[vtsWithCredentials]', () => {
        instance.vtsWithCredentials = true;
        fixture.detectChanges();
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.vtsAction as string);
        expect(req.request.withCredentials).toBe(true);
        req.flush({});
        httpMock.verify();
      });

      describe('[vtsBeforeUpload]', () => {
        it('should be allow null', () => {
          instance.beforeUpload = null;
          fixture.detectChanges();
          expect(instance._beforeUpload).toBe(false);
          pageObject.postSmall();
          expect(instance._beforeUpload).toBe(false);
        });
        describe('using observable', () => {
          it('can return true', () => {
            spyOn(instance, 'vtsChange');
            instance.beforeUpload = (): Observable<any> => of(true);
            fixture.detectChanges();
            pageObject.postSmall();
            expect(instance.vtsChange).toHaveBeenCalled();
          });
          it('can return same file', () => {
            let ret = false;
            instance.beforeUpload = (file: VtsUploadFile): Observable<any> => {
              ret = true;
              return of(file);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('can return a string file', () => {
            let ret = false;
            instance.beforeUpload = (): Observable<any> => {
              ret = true;
              return of('file');
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('can return a blob file', () => {
            let ret = false;
            instance.beforeUpload = (): Observable<any> => {
              ret = true;
              return of(
                new Blob([JSON.stringify(1, null, 2)], {
                  type: 'application/json'
                })
              );
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('cancel upload when returan a false value', () => {
            expect(instance._vtsChange).toBeUndefined();
            instance.beforeUpload = (): Observable<any> => {
              return of(false);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(instance._vtsChange).toBeUndefined();
          });
          it('should be console.warn error', () => {
            let warnMsg = '';
            console.warn = jasmine
              .createSpy()
              .and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
            expect(instance._vtsChange).toBeUndefined();
            instance.beforeUpload = (): Observable<any> => {
              return throwError('');
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(warnMsg).toContain(`Unhandled upload beforeUpload error`);
          });
        });
      });

      describe('[vtsFilter]', () => {
        it('shoule be custom limit', () => {
          instance.vtsMultiple = true;
          instance.vtsLimit = 1;
          instance.vtsFilter = [
            {
              name: 'limit',
              fn: (fileList: VtsUploadFile[]) => fileList.slice(-instance.vtsLimit)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile([
            ...PNGSMALL.target.files,
            ...PNGSMALL.target.files,
            ...PNGSMALL.target.files
          ]);
          expect(instance._beforeUploadList.length).toBe(instance.vtsLimit);
        });
        it('shoule be custom size', () => {
          instance.vtsSize = 1;
          instance.vtsFilter = [
            {
              name: 'size',
              fn: (fileList: VtsUploadFile[]) =>
                fileList.filter(w => w.size! / 1024 <= instance.vtsSize)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postLarge();
          expect(instance._beforeUploadList.length).toBe(0);
        });
        it('shoule be custom type', () => {
          instance.vtsFileType = 'image/png';
          instance.vtsFilter = [
            {
              name: 'type',
              fn: (fileList: VtsUploadFile[]) =>
                fileList.filter(w => ~[instance.vtsFileType].indexOf(w.type))
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile(JPGSMALL.target.files);
          expect(instance._beforeUploadList.length).toBe(0);
        });
        describe('with Observable', () => {
          it('shoule working', () => {
            instance.vtsFilter = [
              {
                name: 'f1',
                fn: (fileList: VtsUploadFile[]) => {
                  return new Observable((observer: Observer<VtsUploadFile[]>) => {
                    observer.next(fileList.slice(1));
                    observer.complete();
                  });
                }
              },
              {
                name: 'f2',
                fn: (fileList: VtsUploadFile[]) => {
                  return new Observable((observer: Observer<VtsUploadFile[]>) => {
                    observer.next(fileList.slice(1));
                    observer.complete();
                  });
                }
              }
            ];
            fixture.detectChanges();
            expect(instance._beforeUploadList.length).toBe(0);
            pageObject.postFile([
              ...PNGSMALL.target.files,
              ...PNGSMALL.target.files,
              ...PNGSMALL.target.files
            ]);
            expect(instance._beforeUploadList.length).toBe(1);
          });
          it('should be console.warn error', () => {
            let warnMsg = '';
            console.warn = jasmine
              .createSpy()
              .and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
            instance.vtsFilter = [
              {
                name: 'f1',
                fn: () => {
                  return new Observable((observer: Observer<VtsUploadFile[]>) => {
                    observer.error('filter error');
                  });
                }
              }
            ];
            fixture.detectChanges();
            pageObject.postFile(PNGSMALL.target.files);
            expect(warnMsg).toContain(`Unhandled upload filter error`);
          });
        });
      });

      it('#vtsFileList, should be allow empty', () => {
        instance.vtsFileList = null;
        fixture.detectChanges();
        expect(instance._vtsChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.vtsAction as string);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      describe('[vtsRemove]', () => {
        const INITCOUNT = 3;
        beforeEach(() => {
          instance.vtsFileList = [
            {
              uid: 1,
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/xxx.png'
            },
            {
              uid: 2,
              name: 'yyy.png',
              status: 'done',
              url: 'http://www.baidu.com/yyy.png'
            },
            {
              uid: 3,
              name: 'zzz.png',
              status: 'error',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/zzz.png'
            }
          ] as any[];
          fixture.detectChanges();
        });
        it('should be return a Observable', () => {
          instance.onRemove = () => of(false);
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
        });
        it('should be return a Observable includes a delay operation', (done: () => void) => {
          const DELAY = 20;
          instance.onRemove = () => of(true).pipe(delay(DELAY));
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          setTimeout(() => {
            expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT - 1);
            done();
          }, DELAY + 1);
        });
        it('should be return a truth value', () => {
          instance.onRemove = () => true;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT - 1);
        });
        it('should be return a falsy value', () => {
          instance.onRemove = () => false;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
        });
        it('should be with null', () => {
          instance.onRemove = null;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT);
          dl.query(By.css('.vtsicon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.vtsicon-delete')).length).toBe(INITCOUNT - 1);
        });
      });

      describe('[vtsListType]', () => {
        describe(`should be only allow type is picture or picture-card generate thumbnail`, () => {
          it('with text', () => {
            instance.vtsListType = 'text';
            fixture.detectChanges();
            pageObject.postSmall();
            fixture.detectChanges();
            expect(instance.comp.vtsFileList[0].thumbUrl).toBeUndefined();
          });
          it('with picture', () => {
            instance.vtsListType = 'picture';
            fixture.detectChanges();
            pageObject.postSmall();
            fixture.detectChanges();
            expect(instance.comp.vtsFileList[0].thumbUrl).not.toBeUndefined();
          });
        });
      });

      it('#vtsIconRender', () => {
        instance.vtsFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as any
        ];
        instance.vtsIconRender = instance.customvtsIconRender;
        fixture.detectChanges();
        const el = pageObject.getByCss(`.customvtsIconRender`);
        expect(el != null).toBe(true);
        expect((el.nativeElement as HTMLElement).textContent).toBe('asdf');
      });

      it('#vtsFileListRender', () => {
        instance.vtsFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as any
        ];
        instance.vtsFileListRender = instance.fileListRender;
        fixture.detectChanges();
        const el = pageObject.getByCss(`.fileListRender`);
        expect(el != null).toBe(true);
        expect((el.nativeElement as HTMLElement).textContent).toBe('asdf');
      });
    });

    describe('CORS', () => {
      it('should be auto setting [X-Requested-With]', () => {
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.vtsAction as string);
        expect(req.request.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        req.flush({});
        httpMock.verify();
      });
      it('should be allow override [X-Requested-With]', () => {
        instance.vtsHeaders = {
          'X-Requested-With': null
        };
        fixture.detectChanges();
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.vtsAction as string);
        expect(req.request.headers.has('X-Requested-With')).toBe(false);
        req.flush({});
        httpMock.verify();
      });
    });

    describe('[test boundary]', () => {
      it('clean a not exists request', () => {
        instance.comp.uploadComp.reqs = {};
        instance.show = false;
        fixture.detectChanges();
        expect(true).toBe(true);
      });
    });

    class VtsUploadPageObject {
      private files: any;

      constructor() {
        spyOn(this.btnComp, 'onClick').and.callFake(() =>
          this.btnComp.onChange({ target: { files: this.files } } as any)
        );
      }

      get btnEl(): DebugElement {
        return dl.query(By.directive(VtsUploadBtnComponent));
      }

      get btnComp(): VtsUploadBtnComponent {
        return this.btnEl.injector.get(VtsUploadBtnComponent) as VtsUploadBtnComponent;
      }

      getByCss(css: string): DebugElement {
        return dl.query(By.css(css));
      }

      postFile(files: any): this {
        this.files = Array.isArray(files) ? files : [files];
        this.btnEl.nativeElement.click();
        return this;
      }

      postSmall(): this {
        this.postFile(PNGSMALL.target.files);
        return this;
      }

      postLarge(): this {
        this.postFile(PNGBIG.target.files);
        return this;
      }

      expectChange(type: string = 'start'): this {
        expect(instance._vtsChange.type).toBe(type);
        return this;
      }

      expectLength(value: number = 0): this {
        expect(instance.vtsFileList!.length).toBe(value);
        return this;
      }
    }
  });

  describe('list', () => {
    let fixture: ComponentFixture<TestUploadListComponent>;
    let dl: DebugElement;
    let instance: TestUploadListComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FormsModule,
          VtsToolTipModule,
          VtsProgressModule,
          VtsI18nModule,
          NoopAnimationsModule,
          VtsIconTestModule
        ],
        declarations: [VtsUploadListComponent, TestUploadListComponent]
      });
      fixture = TestBed.createComponent(TestUploadListComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
    });

    describe('[listType]', () => {
      for (const type of ['text', 'picture', 'picture-card']) {
        it(`with [${type}]`, () => {
          instance.listType = type as VtsUploadListType;
          fixture.detectChanges();
          expect(dl.query(By.css(`.vts-upload-list-${type}`)) != null).toBe(true);
        });
      }
    });

    it('[items]', () => {
      expect(dl.queryAll(By.css(`.vts-upload-list-item`)).length).toBe(instance.items.length);
    });

    describe('[icons]', () => {
      it('should be show preview', () => {
        expect(instance._onPreview).toBe(false);
        const actions = dl.queryAll(By.css('.vts-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items.length);
        actions[0].query(By.css('a')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onPreview).toBe(true);
      });
      it('should be hide preview', () => {
        instance.icons = {
          showPreviewIcon: false,
          showRemoveIcon: true
        };
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.vts-upload-list-item-actions a'));
        expect(actions.length).toBe(0);
        expect(instance._onPreview).toBe(false);
      });
      it('should be show remove', () => {
        expect(instance._onRemove).toBe(false);
        const actions = dl.queryAll(By.css('.vts-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items.length);
        actions[0].query(By.css('.vtsicon-delete')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onRemove).toBe(true);
      });
      it('should be hide remove', () => {
        instance.icons = {
          showPreviewIcon: true,
          showRemoveIcon: false
        };
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.vts-upload-list-item-actions .vtsicon-delete'));
        expect(actions.length).toBe(0);
        expect(instance._onRemove).toBe(false);
      });
    });

    describe('[onPreview]', () => {
      it('should be handle preview', () => {
        expect(instance._onPreview).toBe(false);
        dl.query(By.css('.vts-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(true);
      });
      it('should be invalid handle preview when is a null', () => {
        expect(instance._onPreview).toBe(false);
        instance.onPreview = null;
        fixture.detectChanges();
        dl.query(By.css('.vts-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(false);
      });
      it('should support linkProps as object', fakeAsync(() => {
        instance.items = [
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: {
              download: 'image'
            }
          }
        ];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const el = dl.query(By.css('.vts-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
      }));
      it('should support linkProps as json stringify', fakeAsync(() => {
        const linkPropsString = JSON.stringify({ download: 'image' });
        instance.items = [
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: linkPropsString
          }
        ];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const el = dl.query(By.css('.vts-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
      }));
    });

    describe('[onRemove]', () => {
      it('should be handle remove', () => {
        expect(instance._onRemove).toBe(false);
        dl.query(By.css('.vts-upload-list-item-actions .vtsicon-delete')).nativeElement.click();
        expect(instance._onRemove).toBe(true);
      });
      it('should be invalid handle remove when is a null', () => {
        expect(instance._onRemove).toBe(false);
        instance.onRemove = null;
        fixture.detectChanges();
        dl.query(By.css('.vts-upload-list-item-actions .vtsicon-delete')).nativeElement.click();
        expect(instance._onRemove).toBe(false);
      });
    });

    describe('[isImageUrl]', () => {
      describe('via image type', () => {
        it('should be true when file object type value is a valid image', () => {
          expect(instance.comp.isImageUrl({ type: 'image/' } as any)).toBe(true);
        });
      });
      describe('via thumbUrl or url', () => {
        it('should be false when not found url & thumbUrl', () => {
          expect(instance.comp.isImageUrl({} as any)).toBe(false);
        });
        describe('via extension', () => {
          it('with valid image extension', () => {
            expect(instance.comp.isImageUrl({ url: '1.svg' } as any)).toBe(true);
          });
          it('with invalid image extension', () => {
            expect(instance.comp.isImageUrl({ url: '1.pdf' } as any)).toBe(false);
          });
        });
        describe('when url is base64', () => {
          it('with valid image base64', () => {
            expect(
              instance.comp.isImageUrl({
                url: 'data:image/png;base64,1'
              } as any)
            ).toBe(true);
          });
          it('with invalid image base64', () => {
            expect(
              instance.comp.isImageUrl({
                url: 'data:application/pdf;base64,1'
              } as any)
            ).toBe(false);
          });
        });
      });
      it('#previewIsImage', fakeAsync(() => {
        instance.previewIsImage = () => true;
        instance.listType = 'picture';
        instance.items = [{}];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].isImageUrl).toBe(true);
      }));
    });

    describe('[genThumb]', () => {
      class MockImage {
        width = 1;
        height = 2;

        onload(): void {}

        set src(_: string) {
          this.onload();
        }
      }
      it('should be generate thumb when is valid image data', fakeAsync(() => {
        spyOn(window as any, 'Image').and.returnValue(new MockImage());

        instance.listType = 'picture';
        instance.items = [
          {
            originFileObj: new File([''], '1.png', { type: 'image/' }),
            thgitumbUrl: undefined
          }
        ];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl.length).toBeGreaterThan(1);
      }));
      it('should be generate thumb when width greater than height', fakeAsync(() => {
        const img = new MockImage();
        img.width = 2;
        img.height = 1;
        spyOn(window as any, 'Image').and.returnValue(img);

        instance.listType = 'picture';
        instance.items = [
          {
            originFileObj: new File([''], '1.png', { type: 'image/' }),
            thgitumbUrl: undefined
          }
        ];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl.length).toBeGreaterThan(1);
      }));
      it('should be ingore thumb when is invalid image data', () => {
        instance.listType = 'picture';
        instance.items = [
          {
            originFileObj: new File([''], '1.pdf', { type: 'pdf' }),
            thumbUrl: undefined
          }
        ];
        fixture.detectChanges();
        expect(instance.items[0].thumbUrl).toBe('');
      });
      it('should be customize preview file', fakeAsync(() => {
        instance.previewFile = () => of('11');
        instance.listType = 'picture';
        instance.items = [
          {
            originFileObj: new File([''], '1.png', { type: 'image/' }),
            thgitumbUrl: undefined
          }
        ];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl).toBe('11');
      }));
    });
  });

  describe('btn', () => {
    describe('component', () => {
      let fixture: ComponentFixture<TestUploadBtnComponent>;
      let dl: DebugElement;
      let instance: TestUploadBtnComponent;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, VtsIconTestModule],
          declarations: [VtsUploadBtnComponent, TestUploadBtnComponent]
        });
        fixture = TestBed.createComponent(TestUploadBtnComponent);
        dl = fixture.debugElement;
        instance = dl.componentInstance;
        fixture.detectChanges();
      });

      describe('should be trigger upload', () => {
        describe('via onClick', () => {
          it('', () => {
            spyOn(instance.comp.file.nativeElement, 'click');
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
            instance.comp.onClick();
            expect(instance.comp.file.nativeElement.click).toHaveBeenCalled();
          });
          it(', when vtsOpenFileDialogOnClick is false', () => {
            instance.options.openFileDialogOnClick = false;
            spyOn(instance.comp.file.nativeElement, 'click');
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
            instance.comp.onClick();
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
          });
        });
        describe('via onKeyDown', () => {
          it('normal', () => {
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            instance.comp.onKeyDown({ key: 'Enter' } as any);
            expect(instance.comp.onClick).toHaveBeenCalled();
          });
          it('when expect Enter', () => {
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            instance.comp.onKeyDown({ key: 'A' } as any);
            expect(instance.comp.onClick).not.toHaveBeenCalled();
          });
        });
        describe('via Drop', () => {
          it('normal', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: [FILE] },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it('when dragover event', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragover',
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('limit gif using resource type', () => {
            instance.options.accept = 'image/gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNGSMALL.target.files },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('limit gif using file name', () => {
            instance.options.accept = '.gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNGSMALL.target.files },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('allow type image/*', () => {
            instance.options.accept = 'image/*';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNGSMALL.target.files },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it(`allow type [ 'image/png', 'image/jpg' ]`, () => {
            instance.options.accept = ['image/png', 'image/jpg'];
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNGSMALL.target.files },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
        });
        it('via onChange', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onChange(PNGSMALL as any);
          expect(instance.comp.uploadFiles).toHaveBeenCalled();
        });
        describe('via directory', () => {
          const makeFileSystemEntry = (item: Item) => {
            const isDirectory = Array.isArray(item.children);
            const ret = {
              isDirectory,
              isFile: !isDirectory,
              file: (handle: any) => {
                handle(new Item(item.name));
              },
              createReader: () => {
                return {
                  readEntries: (handle: any) => handle(item.children!.map(makeFileSystemEntry))
                };
              }
            };
            return ret;
          };
          const makeDataTransferItem = (item: Item) => ({
            webkitGetAsEntry: () => makeFileSystemEntry(item)
          });
          beforeEach(() => (instance.options.directory = true));
          it('should working', () => {
            spyOn(instance.comp, 'uploadFiles');
            const files = {
              name: 'foo',
              children: [
                {
                  name: 'bar',
                  children: [
                    {
                      name: 'is.webp'
                    }
                  ]
                }
              ]
            };
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: {
                items: [makeDataTransferItem(files)]
              },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it('should be ingore invalid extension', () => {
            instance.options.accept = ['.webp'];
            spyOn(instance.comp, 'uploadFiles');
            const files = {
              name: 'foo',
              children: [
                {
                  name: 'is.jpg'
                }
              ]
            };
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: {
                items: [makeDataTransferItem(files)]
              },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
        });
      });

      describe('should be disabled upload', () => {
        beforeEach(() => {
          instance.options.disabled = true;
          fixture.detectChanges();
        });
        it('[onClick]', () => {
          spyOn<any>(instance.comp, 'file');
          expect(instance.comp.file).not.toHaveBeenCalled();
          instance.comp.onClick();
          expect(instance.comp.file).not.toHaveBeenCalled();
        });
        it('[onKeyDown]', () => {
          spyOn(instance.comp, 'onClick');
          expect(instance.comp.onClick).not.toHaveBeenCalled();
          // instance.comp.onKeyDown(null);
          // expect(instance.comp.onClick).not.toHaveBeenCalled();
        });
        it('[onFileDrop]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onFileDrop({
            type: 'dragover',
            preventDefault: () => {}
          } as any);
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });
        it('[onChange]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          // instance.comp.onChange(null);
          // expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });
      });

      describe('when has destroy', () => {
        it('should be abort all uploading file', () => {
          instance.comp.onChange({
            target: {
              files: [...PNGSMALL.target.files, ...JPGSMALL.target.files]
            }
          } as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(2);
          instance.comp.ngOnDestroy();
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });
        it('should be subsequent uploading', () => {
          instance.comp.onChange(PNGSMALL as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(1);
          instance.comp.ngOnDestroy();
          instance.comp.onChange(PNGSMALL as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });
      });
    });

    describe('methods', () => {
      let injector: Injector;
      let fixture: ComponentFixture<VtsUploadBtnComponent>;
      let comp: VtsUploadBtnComponent;
      let http: HttpTestingController;
      beforeEach(() => {
        injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [VtsUploadBtnComponent]
        });
        (injector as TestBed).compileComponents();
        fixture = TestBed.createComponent(VtsUploadBtnComponent);
        comp = fixture.debugElement.componentInstance;
        comp.options = {
          action: '/test',
          accept: 'image/png',
          filters: [],
          data: { a: 1 },
          headers: { token: 'asdf' },
          name: 'avatar',
          multiple: true,
          withCredentials: true,
          beforeUpload: () => true,
          onStart: () => {},
          onProgress: () => {},
          onSuccess: () => {},
          onError: () => {}
        } as ZipButtonOptions;
        http = injector.get(HttpTestingController);
      });

      it('should uploading a png file', fakeAsync(() => {
        spyOn<any>(comp.options, 'onStart');
        spyOn<any>(comp.options, 'onProgress');
        spyOn<any>(comp.options, 'onSuccess');
        comp.onChange(PNGSMALL as any);
        tick(1);
        const req = http.expectOne('/test');
        req.event({ type: 1, loaded: 10, total: 100 });
        req.flush('ok');
        expect(comp.options.onProgress).toHaveBeenCalled();
        expect(comp.options.onStart).toHaveBeenCalled();
        expect(comp.options.onSuccess).toHaveBeenCalled();
      }));

      it('should contain the parameters of http request', fakeAsync(() => {
        comp.onChange(PNGSMALL as any);
        tick(1);
        const req = http.expectOne('/test');
        expect(req.request.withCredentials).toBe(true);
        expect(req.request.headers.get('token')).toBe('asdf');
        const body = req.request.body as FormData;
        expect(body.has('avatar')).toBe(true);
        expect(body.has('a')).toBe(true);
        req.flush('ok');
      }));

      it('should filter size', () => {
        spyOn<any>(comp.options, 'onStart');
        comp.options.filters = [
          {
            name: '',
            fn: (fileList: VtsUploadFile[]) => fileList.filter(w => w.size! / 1024 <= 0)
          }
        ];
        comp.onChange(PNGBIG as any);
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should be no request when beforeUpload is false', () => {
        spyOn<any>(comp.options, 'beforeUpload').and.returnValue(false);
        spyOn<any>(comp.options, 'onStart');
        comp.onChange(PNGSMALL as any);
        expect(comp.options.beforeUpload).toHaveBeenCalled();
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should error when request error', fakeAsync(() => {
        spyOn<any>(comp.options, 'onStart');
        spyOn<any>(comp.options, 'onSuccess');
        spyOn<any>(comp.options, 'onError');
        comp.onChange(PNGSMALL as any);
        tick(1);
        http.expectOne('/test').error({ status: 403 } as any);
        expect(comp.options.onStart).toHaveBeenCalled();
        expect(comp.options.onError).toHaveBeenCalled();
        expect(comp.options.onSuccess).not.toHaveBeenCalled();
      }));

      it('should custom request', () => {
        comp.options.customRequest = () => of(true).subscribe(() => {});
        spyOn<any>(comp.options, 'customRequest');
        comp.onChange(PNGSMALL as any);
        expect(comp.options.customRequest).toHaveBeenCalled();
      });

      it('should be warn "Must return Subscription type in [vtsCustomRequest] property"', () => {
        let warnMsg = '';
        console.warn = jasmine
          .createSpy()
          .and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
        comp.options.customRequest = (() => {}) as any;
        comp.onChange(PNGSMALL as any);
        expect(warnMsg).toContain(`Must return Subscription type in '[vtsCustomRequest]' property`);
      });
    });
  });
});

@Component({
  template: `
    <vts-upload
      #upload
      *ngIf="show"
      [vtsType]="vtsType"
      [vtsLimit]="vtsLimit"
      [vtsSize]="vtsSize"
      [vtsFileType]="vtsFileType"
      [vtsAccept]="vtsAccept"
      [vtsAction]="vtsAction"
      [vtsBeforeUpload]="beforeUpload"
      [vtsCustomRequest]="vtsCustomRequest"
      [vtsData]="vtsData"
      [vtsFilter]="vtsFilter"
      [(vtsFileList)]="vtsFileList"
      [vtsDisabled]="vtsDisabled"
      [vtsHeaders]="vtsHeaders"
      [vtsListType]="vtsListType"
      [vtsMultiple]="vtsMultiple"
      [vtsName]="vtsName"
      [vtsShowUploadList]="vtsShowUploadList"
      [vtsShowButton]="vtsShowButton"
      [vtsWithCredentials]="vtsWithCredentials"
      [vtsPreview]="onPreview"
      [vtsPreviewFile]="previewFile"
      [vtsRemove]="onRemove"
      [vtsDirectory]="directory"
      [vtsTransformFile]="vtsTransformFile"
      [vtsIconRender]="vtsIconRender"
      [vtsFileListRender]="vtsFileListRender"
      (vtsFileListChange)="vtsFileListChange($event)"
      (vtsChange)="vtsChange($event)"
    >
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        <span>Click to Upload</span>
      </button>
    </vts-upload>
    <ng-template #customvtsIconRender>
      <span class="customvtsIconRender">asdf</span>
    </ng-template>
    <ng-template #fileListRender>
      <span class="fileListRender">asdf</span>
    </ng-template>
  `
})
class TestUploadComponent {
  @ViewChild('upload', { static: false }) comp!: VtsUploadComponent;
  @ViewChild('customvtsIconRender', { static: false })
  customvtsIconRender!: TemplateRef<void>;
  @ViewChild('fileListRender', { static: false })
  fileListRender!: TemplateRef<void>;
  show = true;
  vtsType: VtsUploadType = 'select';
  vtsLimit = 0;
  vtsSize = 0;
  vtsFileType: any;
  vtsAccept = 'image/png';
  vtsAction: string | ((file: VtsUploadFile) => string | Observable<string>) = '/upload';
  _beforeUpload = false;
  _beforeUploadList: VtsUploadFile[] = [];
  beforeUpload: any = (_file: VtsUploadFile, fileList: VtsUploadFile[]): any => {
    this._beforeUpload = true;
    this._beforeUploadList = fileList;
    return true;
  };
  vtsCustomRequest: any;
  vtsData: any;
  vtsFilter: UploadFilter[] = [];
  vtsFileList: VtsUploadFile[] | null = [];
  vtsDisabled = false;
  vtsHeaders: any = {};
  vtsListType: VtsUploadListType = 'text';
  vtsMultiple = false;
  vtsName = 'file';
  vtsShowUploadList: boolean | VtsShowUploadList = true;
  vtsShowButton = true;
  vtsWithCredentials = false;
  vtsTransformFile!: (file: VtsUploadFile) => VtsUploadTransformFileType;
  vtsIconRender: TemplateRef<void> | null = null;
  vtsFileListRender: TemplateRef<void> | null = null;
  _onPreview = false;
  onPreview = (): void => {
    this._onPreview = true;
  };
  previewFile!: (file: VtsUploadFile) => Observable<string>;
  _onRemove = false;
  onRemove: null | ((file: VtsUploadFile) => boolean | Observable<boolean>) = (): boolean => {
    this._onRemove = true;
    return true;
  };
  _vtsChange!: VtsUploadChangeParam;

  vtsChange(value: VtsUploadChangeParam): void {
    this._vtsChange = value;
  }

  _vtsFileListChange: any;

  vtsFileListChange(value: any): void {
    this._vtsChange = value;
  }

  directory = false;
}

@Component({
  template: `
    <vts-upload-list
      #list
      [listType]="listType"
      [items]="items"
      [icons]="icons"
      [onPreview]="onPreview"
      [previewFile]="previewFile"
      [previewIsImage]="previewIsImage"
      [onRemove]="onRemove"
    ></vts-upload-list>
  `,
  encapsulation: ViewEncapsulation.None
})
class TestUploadListComponent {
  @ViewChild('list', { static: false }) comp!: VtsUploadListComponent;
  listType: VtsUploadListType = 'picture-card';
  items: any[] = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
  icons: VtsShowUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true
  };
  _onPreview = false;
  onPreview: VoidFunction | null = (): void => {
    this._onPreview = true;
  };
  previewFile!: (file: VtsUploadFile) => Observable<string>;
  previewIsImage!: (file: VtsUploadFile) => boolean;
  _onRemove = false;
  onRemove: any = (): void => {
    this._onRemove = true;
  };
}

@Component({
  template: `
    <div vts-upload-btn #btn [options]="options" class="test">UPLAOD</div>
  `
})
class TestUploadBtnComponent {
  @ViewChild('btn', { static: false }) comp!: VtsUploadBtnComponent;
  options: ZipButtonOptions = {
    disabled: false,
    openFileDialogOnClick: true,
    filters: [],
    customRequest: undefined,
    onStart: () => {},
    onError: () => {}
  };
}
