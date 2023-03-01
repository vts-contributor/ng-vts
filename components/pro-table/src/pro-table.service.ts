import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from './pro-table.type';
import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class ProtableService {
    constructor(
        private http: HttpClient
    ) { }
    
    getDataById(request: Request): Observable<any>{
        if(request.type == "GET"){
            return this.http.get(request.url)
        }
        else {
            return this.http.post(request.url, request.body, {
                observe: "body"
            })
        }
    }
}