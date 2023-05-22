import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private getUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  loginUser(user: User):Observable<object> {
    return this.http.post(`${this.getUrl}/user/login`, user);
    }
}
