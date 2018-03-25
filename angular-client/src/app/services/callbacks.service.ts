import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class CallbacksService {
  private url = '/api/callback';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  /**
   * Get all callbacks associated with the logged in user
   *
   * @returns {Observable<Object[]>}
   * @memberof CallbacksService
   */
  getByUser(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/user`)
      .pipe(
        tap(_ => this.log('fetching callbacks')),
        catchError(this.handleError<Object[]>('getByUser()'))
      );
  }

  /**
   * Save a new callback
   *
   * @param {any} callback
   * @returns {Observable<Object>}
   * @memberof CallbacksService
   */
  save(callback): Observable<Object> {
    return this.http.post(`${this.url}`, callback)
      .pipe(
        tap(_ => this.log('saving a callback')),
        catchError(this.handleError<Object>('save(callback)'))
      );
  }

  /**
   * Delete a callback
   *
   * @param {String} callbackID
   * @returns {Observable<Object>}
   * @memberof CallbacksService
   */
  delete(callbackID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${callbackID}`)
      .pipe(
        tap(_ => this.log('deleting a callback')),
        catchError(this.handleError<Object>('delete(callbackID: String)'))
      );
  }

  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof CallbacksService
   */
  private log(message: String) {
    this.messageService.add('Callback Service: ' + message);
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
   * @memberof CallbacksService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }
}
