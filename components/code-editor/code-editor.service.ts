/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CodeEditorConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { PREFIX, warn } from '@ui-vts/ng-vts/core/logger';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JoinedEditorOptions, VtsCodeEditorLoadingStatus } from './typings';

declare const monaco: VtsSafeAny;

const VTS_CONFIG_MODULE_NAME = 'codeEditor';

function tryTriggerFunc(fn?: (...args: VtsSafeAny[]) => VtsSafeAny): (...args: VtsSafeAny) => void {
  return (...args: VtsSafeAny[]) => {
    if (fn) {
      fn(...args);
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class VtsCodeEditorService {
  private document: Document;
  private firstEditorInitialized = false;
  private loaded$ = new Subject<boolean>();
  private loadingStatus = VtsCodeEditorLoadingStatus.UNLOAD;
  private option: JoinedEditorOptions = {};
  private config: CodeEditorConfig;

  option$ = new BehaviorSubject<JoinedEditorOptions>(this.option);

  constructor(
    private readonly vtsConfigService: VtsConfigService,
    @Inject(DOCUMENT) _document: VtsSafeAny
  ) {
    const globalConfig = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME);

    this.document = _document;
    this.config = { ...globalConfig };
    this.option = this.config.defaultEditorOption || {};

    this.vtsConfigService.getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME).subscribe(() => {
      const newGlobalConfig: VtsSafeAny =
        this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME);
      if (newGlobalConfig) {
        this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
      }
    });
  }

  private _updateDefaultOption(option: JoinedEditorOptions): void {
    this.option = { ...this.option, ...option };
    this.option$.next(this.option);

    if (option.theme) {
      monaco.editor.setTheme(option.theme);
    }
  }

  requestToInit(): Observable<JoinedEditorOptions> {
    if (this.loadingStatus === VtsCodeEditorLoadingStatus.LOADED) {
      this.onInit();
      return observableOf(this.getLatestOption());
    }

    if (this.loadingStatus === VtsCodeEditorLoadingStatus.UNLOAD) {
      if (this.config.useStaticLoading && typeof monaco === 'undefined') {
        warn(
          'You choose to use static loading but it seems that you forget ' +
            'to config webpack plugin correctly. Please refer to our official website' +
            'for more details about static loading.'
        );
      } else {
        this.loadMonacoScript();
      }
    }

    return this.loaded$.asObservable().pipe(
      tap(() => this.onInit()),
      map(() => this.getLatestOption())
    );
  }

  private loadMonacoScript(): void {
    if (this.config.useStaticLoading) {
      Promise.resolve().then(() => this.onLoad());
      return;
    }

    if (this.loadingStatus === VtsCodeEditorLoadingStatus.LOADING) {
      return;
    }

    this.loadingStatus = VtsCodeEditorLoadingStatus.LOADING;

    const assetsRoot = this.config.assetsRoot;
    const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
    const windowAsAny = window as VtsSafeAny;
    const loadScript = this.document.createElement('script');

    loadScript.type = 'text/javascript';
    loadScript.src = `${vs}/loader.js`;
    loadScript.onload = () => {
      windowAsAny.require.config({
        paths: { vs }
      });
      windowAsAny.require(['vs/editor/editor.main'], () => {
        this.onLoad();
      });
    };
    loadScript.onerror = () => {
      throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
    };

    this.document.documentElement.appendChild(loadScript);
  }

  private onLoad(): void {
    this.loadingStatus = VtsCodeEditorLoadingStatus.LOADED;
    this.loaded$.next(true);
    this.loaded$.complete();

    tryTriggerFunc(this.config.onLoad)();
  }

  private onInit(): void {
    if (!this.firstEditorInitialized) {
      this.firstEditorInitialized = true;
      tryTriggerFunc(this.config.onFirstEditorInit)();
    }

    tryTriggerFunc(this.config.onInit)();
  }

  private getLatestOption(): JoinedEditorOptions {
    return { ...this.option };
  }
}
