import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient
  ) { }

  public login(email: string, password: string) {
    return this.http.post<any>('/user/login', { email: email, password: password })
  }

  public logout() {
    return this.http.post<any>('/user/logout', {})
  }

  public signup (email: string, password: string, confirmPassword: string) {
    return this.http.post<any>('/user/signup', {})
  }

}
