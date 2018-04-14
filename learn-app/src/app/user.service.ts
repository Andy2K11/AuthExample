import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

import { User } from './user.model';

@Injectable()
export class UserService {

    private user: User;

    constructor(private http: HttpClient) {}

    login(user: User): Observable<HttpResponse<User>> {
        const url = '//localhost:3000/users/login';
        const body = JSON.stringify(user);
        const headers: HttpHeaders = new HttpHeaders({
            'Content-type': 'application/json',
        });
        return this.http.post<User>(url, body, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            withCredentials: true
        });
    }

    test(): Observable<HttpResponse<any>> {
        const url = '//localhost:3000/users/test';
        return this.http.post<HttpResponse<any>>(url, {}, { observe: 'response', withCredentials: true });
    }

    admin(): Observable<HttpResponse<any>> {
        const url = '//localhost:3000/users/admin';
        return this.http.get<HttpResponse<any>>(url, { observe: 'response', withCredentials: true });
    }
}
