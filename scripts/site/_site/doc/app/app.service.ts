import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface DemoCode {
  rawCode: string;
  highlightCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  codeMap = new Map<string, DemoCode>();

  language$ = new ReplaySubject<string>(1);
  theme$ = new ReplaySubject<string>(1);

  constructor(private http: HttpClient) {}

  getCode(componentId: string): Observable<DemoCode> {
    if (this.codeMap.has(componentId)) {
      return of(this.codeMap.get(componentId) as DemoCode);
    } else {
      const path = componentId.startsWith('components-')
        ? componentId.split('components-')[1]
        : componentId;
      return this.http
        .get<DemoCode>(`assets/codes/${path}.json`, {
          responseType: 'json'
        })
        .pipe(
          tap(data => {
            this.codeMap.set(componentId, data);
          })
        );
    }
  }

  envConfig: any = null;
  guidelineInfo: any = null;

  fetchEnvironment() {
    if (!!this.envConfig) return of(this.envConfig);
    let baseUrl = (document.head.querySelector('base') as any).href as String;
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

    return this.http
      .get(`${baseUrl}/rnd_config/rnd-environment.json`)
      .pipe(tap(data => (this.envConfig = data)));
  }

  fetchGuidelineInfo() {
    if (!!this.guidelineInfo) return of(this.guidelineInfo);

    return this.fetchEnvironment().pipe(
      switchMap(data => {
        const infoUrl = data.guidelineInfoUrl;
        return this.http.get(infoUrl).pipe(tap(data => (this.guidelineInfo = data)));
      })
    );
  }
}
