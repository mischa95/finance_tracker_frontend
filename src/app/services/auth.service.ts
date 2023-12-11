import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { UserDTO } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public currentUser: Observable<any>;
    private currentUserSubject: BehaviorSubject<any>;

    private readonly USER_KEY = 'currentUser';


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        const user = localStorage.getItem(this.USER_KEY);
        if (user) {
            this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(user));
        } else {
            this.currentUserSubject = new BehaviorSubject<any>(undefined);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    logout(reload: boolean = true): void {
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
        if (reload) {
            this.router.navigateByUrl('/login');
        }
    }

    login(username: string, password: string): Observable<any> {
        const requestOptions = {
            headers: new HttpHeaders({Authorization: 'Basic ' + btoa(`${username}:${password}`)})
        };

        return this.http.post<any>(`/auth/login`, null, requestOptions)
            .pipe(map(user => {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem(this.USER_KEY, JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    addUser(user: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`/auth/users`, user);
      }

    getUser(): Observable<UserDTO> {
        return this.http.get<UserDTO>(`/auth/data`);
      }
}
