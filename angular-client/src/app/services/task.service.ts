import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TaskService {
  private url = '/api/task';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**
   * Get all tasks associated with the logged in user
   *
   * @returns {Observable<Object[]>}
   * @memberof TaskService
   */
  getByUser(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/user`)
      .pipe(
        tap(_ => this.log('fetching tasks')),
        catchError(this.handleError<Object[]>('getByUser()'))
      );
  }

  /**
   * Save a new task
   *
   * @param {any} task
   * @returns {Observable<Object>}
   * @memberof TaskService
   */
  save(task): Observable<Object> {
    return this.http.post(`${this.url}`, task)
      .pipe(
        tap(_ => this.log('saving a task')),
        catchError(this.handleError<Object>('save(task)'))
      );
  }

  delete(taskID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${taskID}`)
      .pipe(
        tap(_ => this.log('deleting a task')),
        catchError(this.handleError<Object>('delete(taskID: String)'))
      );
  }

  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof TaskService
   */
  private log(message: String) {
    this.messageService.add('Task Service: ' + message);
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
   * @memberof TaskService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }

}
