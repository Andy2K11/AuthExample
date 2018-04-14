import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class SecureInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.headers);
        // setHeaders: { 'X-XSRF-TOKEN': req.headers['x-xsrf-token'] }
        // const secReq = req.clone({
        // });
        return next.handle(req);
    }
}
