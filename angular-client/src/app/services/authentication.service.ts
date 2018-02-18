import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/rx';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';


@Injectable()
export class AuthenticationService {
  public loggedIn: boolean;
  public role: String;

  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) {

  }

  /**
   * Log user into app.
   * @param email
   * @param password
   * @returns {Observable<Object>}
   * @memberof AuthenticationService
   */
  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/user/login', { email: email, password: password })
      .pipe(
      tap(p => {
        if (p.error) {
          this.log('Problem logging in.');
        } else {
          this.role = p.role;
          this.log('Successful login.');
        }
      }),
      catchError(this.handleError<any>('login(email, password)'))
      );
  }

  /**
   * Log user out of app.
   * @returns {Observable<Object>}
   * @memberof AuthenticationService
   */
  public logout(): Observable<any> {
    return this.http.post<any>('/user/logout', {})
      .pipe(
      tap(p => {
        if (p.error) {
          this.log('Problem logging out.');
        } else {
          this.log('Successful logout.');
        }
      }),
      catchError(this.handleError<any>('logout()'))
      );
  }

  /**
   * Registers an account.
   * @param email
   * @param password
   * @param confirmPassword
   * @returns {Observable<Object>}
   * @memberof AuthenticationService
   */
  public signUp(email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>('/user/signup', { email: email, password: password, confirmPassword: confirmPassword })
      .pipe(
      tap(p => {
        if (p.error) {
          this.log('Problem signing up.');
        } else {
          this.log('Successful sign up.');
        }
      }),
      catchError(this.handleError<any>('signUp(email, password, confirmPassword)'))
      );
  }

  /**
   * Heartbeat
   * @returns {Observable<Object>}
   * @memberof AuthenticationService
   */
  public heartbeat(): Observable<any> {
    const minutes = 1;
    return Observable
      .interval(1000 * 60 * minutes)
      .startWith(0)
      .flatMap((i) => this.http.post<any>('/user/heartbeat', {}))
      .pipe(
      tap(p => {
        this.log('Hearbeat success.');
      }),
      catchError(this.handleError<any>('heartbeat()'))
      );
  }

  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof AuthenticationService
   */
  private log(message: String) {
    this.messageService.add('Authentication Service: ' + message);
  }

  /**
   * Capture errors from the service, then log them,
   * and let the app keep running with a returned Observable
   *
   * @private
   * @template T
   * @param {string} [operation='operation']
   * @param {T} [result]
   * @returns
   * @memberof AuthenticationService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error}`);
      return of(error as T);
    };
  }

}
