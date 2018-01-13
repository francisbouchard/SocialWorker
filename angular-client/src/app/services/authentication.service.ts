import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {
public loggedIn: boolean;
  constructor(
    private http: HttpClient
  ) { 
    
  }

  public login(email: string, password: string) {
    return this.http.post<any>('/user/login', { email: email, password: password })
  }

  public logout() {
    return this.http.post<any>('/user/logout', {})
  }

  public signup (email: string, password: string, confirmPassword: string) {
    return this.http.post<any>('/user/signup', {})
  }

  public heartbeat (){
    let minutes = 1;
    return Observable
            .interval(1000*60*minutes)
            .startWith(0)
            .flatMap((i) => this.http.post<any>('/user/heartbeat', {}))
  }

}
