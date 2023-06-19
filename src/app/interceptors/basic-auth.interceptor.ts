import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }
        return next.handle(request);
    }
}
