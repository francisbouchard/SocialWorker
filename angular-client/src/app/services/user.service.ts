import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  private url = '/user';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Get all users
   * 
   * @returns {Observable<Object>} 
   * @memberof UserService
   */
  getAll(): Observable<Object> {
    return this.http.get(`${this.url}/all`)
      .pipe(
        tap(users => this.log('fetched all users')),
        catchError(this.handleError<Object>('getAll()'))
      );
  }

  delete(id: String): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        tap(users => this.log('user deleted')),
        catchError(this.handleError<Object>('delete(id: String)'))
      );
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
   * @memberof UserService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }


  /**
   * Log messages by sending them to message service
   * 
   * @private
   * @param {String} message 
   * @memberof UserService
   */
  private log(message: String) {
    this.messageService.add('User Service: ' + message);
  }

}
