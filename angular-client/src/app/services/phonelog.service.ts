import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class PhonelogService {

  private url = '/api/phonelog';

  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  /**
   * Get all phonelog
   *
   * @returns {Observable<Object>}
   * @memberof PhonelogService
   */
  getAll(): Observable<Object> {
    return this.http.get(this.url)
      .pipe(
      tap(cases => this.log('fecthed all cases')),
      catchError(this.handleError<Object>('getAll()'))
      );
  }

  getActive(): Observable<Object> {
    return this.http.get(`${this.url}/active`)
      .pipe(
        tap(participants => this.log('fecthed logs')),
        catchError(this.handleError<Object>('getActive()'))
      );
  }

  getByResolved(): Observable<Object> {
    return this.http.get(`${this.url}/resolved`)
      .pipe(
        tap(participants => this.log('fecthed logs')),
        catchError(this.handleError<Object>('getActive()'))
      );
  }

  getRecentlyUpdated(): Observable<Object> {
    return this.http.get(`${this.url}/recent`)
    .pipe(
      tap(participants => this.log('fecthed recently updated logs')),
      catchError(this.handleError<Object>('getRecentlyUpdated()'))
    );
  }

  getByDeleted(): Observable<Object> {
    return this.http.get(`${this.url}/deleted`)
      .pipe(
        tap(participants => this.log('fecthed logs')),
        catchError(this.handleError<Object>('getByDeleted()'))
      );
  }

    /**
   * Save a new case
   *
   * @param {any} phonelogData
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  save(phonelogData): Observable<Object> {
    return this.http.post<Object>(this.url, phonelogData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          this.log('did not save new phonelog');
        } else {
          this.log('saved new phonelog');
        }
      }),
      catchError(this.handleError<Object>('save(phonelog)'))
      );
  }

   /**
   * Update participant with new data
   *
   * @param {any} LogData
   * @returns {Observable<Object>}
   * @memberof ResourceService
   */
  update(id, LogData): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, LogData)
      .pipe(
      tap(_ => this.log('saving a resource')),
      catchError(this.handleError<Object>('update()'))
      );
  }

   /**
   * Update deleted
   *
   * @param {any} LogID
   * @param {any} LogData
   * @returns {Observable<Object>}
   * @memberof ResourceService
   */

   delete(LogID, LogData): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${LogID}/deleted`, LogData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not update status');
        } else {
          this.log('updated status');
        }
      }),
      catchError(this.handleError<Object>('delete(LogID, LogData)'))
      );
  }

  resolve(LogID, LogData): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${LogID}/resolved`, LogData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not update status');
        } else {
          this.log('updated status');
        }
      }),
      catchError(this.handleError<Object>('resolved(LogID, LogData)'))
      );
  }


  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof PhonelogService
   */
  private log(message: String) {
    this.messageService.add('Phonelog Service: ' + message);
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
   * @memberof PhonelogService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }

}
