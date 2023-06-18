import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        // private spinnerService: NgxSpinnerService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                const shouldReload = !err.url || !err.url.includes('/auth/login');
                this.authService.logout(shouldReload);
            }
            // this.spinnerService.hide();  // TODO

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
