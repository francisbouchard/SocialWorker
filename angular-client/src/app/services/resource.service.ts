import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class ResourceService {

  private url = 'http://localhost:3000/resource/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  get(resourceID): Observable<Object> {
    return this.http.get(`${this.url}/${resourceID}`)
    .pipe(
      tap(_ => this.log('fetching a resource')),
      catchError(this.handleError<Object>('get()'))
    );
  }

  getAll(): Observable<Object>{
    return this.http.get(this.url)
    .pipe(
      tap(_ => this.log('fetching all resources')),
      catchError(this.handleError<Object>('getAll()'))
    );
  }

  save(resource): Observable<Object>{
    return this.http.post(this.url, resource)
    .pipe(
      tap(_ => this.log('saving a resource')),
      catchError(this.handleError<Object>('save()'))
    );
  }

  delete(resourceID): Observable<Object>{
    return this.http.delete(`${this.url}/${resourceID}`)
    .pipe(
      tap(_ => this.log('deleting a resource')),
      catchError(this.handleError<Object>('delete()'))
    );
  }

  /**
   * Log messages by sending them to message service
   * 
   * @private
   * @param {String} message 
   * @memberof ResourceService
   */
  private log(message: String) {
    this.messageService.add('Resource Service: ' + message);
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
   * @memberof ResourceService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }


}
