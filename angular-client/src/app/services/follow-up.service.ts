import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class FollowUpService {
  private url = '/api/followup';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  /**
   * Get all followups associated with the logged in user
   *
   * @returns {Observable<Object[]>}
   * @memberof FollowUpService
   */
  getByUser(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/user`)
      .pipe(
        tap(_ => this.log('fetching followups')),
        catchError(this.handleError<Object[]>('getByUser()'))
      );
  }

  /**
   * Save a new followup
   *
   * @param {any} followup
   * @returns {Observable<Object>}
   * @memberof FollowUpService
   */
  save(followup): Observable<Object> {
    return this.http.post(`${this.url}`, followup)
      .pipe(
        tap(_ => this.log('saving a followup')),
        catchError(this.handleError<Object>('save(followup)'))
      );
  }

  /**
   * Delete a followup
   *
   * @param {String} followupID
   * @returns {Observable<Object>}
   * @memberof FollowUpService
   */
  delete(followupID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${followupID}`)
      .pipe(
        tap(_ => this.log('deleting a followup')),
        catchError(this.handleError<Object>('delete(followupID: String)'))
      );
  }

  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof FollowUpService
   */
  private log(message: String) {
    this.messageService.add('Followup Service: ' + message);
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
   * @memberof FollowUpService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }
}
