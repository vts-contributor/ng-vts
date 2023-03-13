import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from './pro-table.type';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProtableService {
  constructor(private http: HttpClient) { }

  getDataById(request: Request): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  deleteItem(request: Request): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  updateConfigTable(request: Request): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url);
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'body'
      });
    }
  }

  saveDataById(request: Request | undefined): Observable<any> {
    if (request) {
      return this.http.post(request.url, request.body, { observe: 'body' });
    }
    else return of(new Error("Request invalid"));
  }

  getRenderData(request: Request): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url, {observe: 'response'});
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'response'
      });
    }
  }

  searchByKeyword(request: Request): Observable<any> {
    if (request.type == 'GET') {
      return this.http.get(request.url, {observe: 'response'});
    } else {
      return this.http.post(request.url, request.body, {
        observe: 'response'
      });
    }
  }

  exportSelectedDataToFile(request: Request) {
    if (request) {
      return this.http.post(request.url, request.body, { observe: 'body' });
    }
    else return of(new Error("Request invalid"));
  }
} 
