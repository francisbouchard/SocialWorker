import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TrashService {

  private url = '/api/trash/';

  constructor(private http: HttpClient,
    private messageService: MessageService) {
  }

  /**
   * Get all records in trash
   * 
   * @returns {Observable<Object>} 
   * @memberof TrashService
   */
  getAll(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}`)
      .pipe(
        tap(users => this.log('fetched all deleted records')),
        catchError(this.handleError<Object[]>('getAll()'))
      );
  }

  /**
   * Permanently delete the record with the given ID
   * 
   * @param {String} model 
   * @param {String} recordID 
   * @returns {Observable<Object>} 
   * @memberof TrashService
   */
  deletePermanently(model: String, recordID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${model}/${recordID}`)
      .pipe(
        tap(users => this.log('permanently deleted the record')),
        catchError(this.handleError<Object>('deletePermanently(model: String, recordID: String)'))
      );
  }

  /**
   * Restore the given deleted record from the trash bin
   * 
   * @param {String} model 
   * @param {String} recordID 
   * @returns {Observable<Object>} 
   * @memberof TrashService
   */
  restore(model: String, recordID: String): Observable<Object> {
    return this.http.put(`${this.url}/${model}/${recordID}`, {})
      .pipe(
        tap(users => this.log('restored the deleted record')),
        catchError(this.handleError<Object>('restore(model: String, recordID: String)'))
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
