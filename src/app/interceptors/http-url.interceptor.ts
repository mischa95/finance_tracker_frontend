import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.overrideRequest(req);

        return next.handle(req);
    }

    private overrideRequest(req: HttpRequest<any>): HttpRequest<any> {
        let updatedUrl = req.url;

        if (req.url.indexOf(`${environment.apiUrl}`) === -1) {
            updatedUrl = `${environment.apiUrl}${req.url}`;
        }

        return req.clone({
            url: updatedUrl
        });
    }
}
