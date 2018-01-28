import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class CasefileService {

  private url = '/api/casefile/';

  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  /**
   * Get a case by ID
   *
   * @param {any} casefileID
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  get(casefileID): Observable<Object> {
    return this.http.get(`${this.url}/${casefileID}`)
      .pipe(
      tap(_ => this.log('fetched a case')),
      catchError(this.handleError<Object>('get(casefileID)'))
      );
  }

  /**
   * Get a case by participant ID
   *
   * @param {any} participantID
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  getByParticipant(participantID): Observable<Object> {
    return this.http.get(`${this.url}/${participantID}`)
      .pipe(
      tap(cases => this.log('fetched a case')),
      catchError(this.handleError<Object>('getByParticipant(participantID)'))
      );
  }

  /**
   * Get all cases
   *
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  getAll(): Observable<Object> {
    return this.http.get(this.url)
      .pipe(
      tap(cases => this.log('fecthed all cases')),
      catchError(this.handleError<Object>('getAll()'))
      );
  }

  /**
   * Save a new case
   *
   * @param {any} caseData
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  save(caseData): Observable<Object> {
    return this.http.post<Object>(this.url, caseData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not save new case');
        } else {
          this.log('saved new case');
        }
      }),
      catchError(this.handleError<Object>('save(caseData)'))
      );
  }

  /**
   * Add a contacted resource to the case with the given ID
   * 
   * @param {any} casefileID 
   * @param {any} resourceData 
   * @returns {Observable<Object>} 
   * @memberof CasefileService
   */
  addContactedResource(casefileID, resourceData): Observable<Object> {
    return this.http.post<Object>(`${this.url}/${casefileID}/resource`, resourceData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not add contacted resource to case');
        } else {
          this.log('added contacted resource to case');
        }
      }),
      catchError(this.handleError<Object>('addContactedResource(casefileID, resourceData)'))
      );
  }

  /**
   * Update the status of a contacted resource in the case
   * 
   * @param {any} casefileID
   * @param {any} resourceID
   * @param {any} status
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  updateResourceStatus(casefileID, resourceID, status): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${casefileID}/resource/${resourceID}`, status)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not update contacted resource status');
        } else {
          this.log('updated contacted resource status');
        }
      }),
      catchError(this.handleError<Object>('updateResourceStatus(casefileID, resourceID, status)'))
      );
  }

  /**
   * Update the overall status of the case
   * 
   * @param {any} casefileID
   * @param {any} status
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  updateCaseStatus(casefileID, status): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${casefileID}/status`, status)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty('errmsg')) {
          console.log('has err msg');
          this.log('did not update case status');
        } else {
          this.log('updated case status');
        }
      }),
      catchError(this.handleError<Object>('updateCaseStatus(casefileID, status)'))
      );
  }

  /**
   * Delete a case by ID
   *
   * @param {any} casefileID
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  delete(casefileID): Observable<Object> {
    return this.http.delete(`${this.url}/${casefileID}`)
      .pipe(
      tap(_ => this.log('deleted case')),
      catchError(this.handleError<Object>('delete(casefileID)'))
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
    this.messageService.add('Case Service: ' + message);
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