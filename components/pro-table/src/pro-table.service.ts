import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VtsRequest } from './pro-table.type';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProtableService {
  constructor(private http: HttpClient) { }

  getDataById(request: VtsRequest): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  deleteItem(request: VtsRequest): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  updateConfigTable(request: VtsRequest): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  saveDataById(request: VtsRequest | undefined): Observable<any> {
    if (request) {
      return this.http.post(request.url, request.body, { observe: 'body' });
    }
    else return of(new Error("Request invalid"));
  }

  getRenderData(request: VtsRequest): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url, {observe: 'response'});
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'response'
      });
    }
  }

  searchByKeyword(request: VtsRequest): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url, {observe: 'response'});
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'response'
      });
    }
  }

  exportSelectedDataToFile(request: VtsRequest) {
    if (request) {
      return this.http.post(request.url, request.body, { observe: 'body' });
    }
    else return of(new Error("Request invalid"));
  }
} 
