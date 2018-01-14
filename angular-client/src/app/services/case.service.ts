import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class CaseService {

  private url = 'http://localhost:3000/casefile/';

  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  /**
   * Get a case by ID
   * 
   * @param {any} caseID 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  get(caseID): Observable<Object> {
    return this.http.get(`${this.url}/${caseID}`)
      .pipe(
      tap(_ => this.log('fecthed a case')),
      catchError(this.handleError<Object>('get(caseID)'))
      );
  }

  /**
   * Get a case by participant ID
   * 
   * @param {any} participantID 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  getByParticipant(participantID): Observable<Object> {
    return this.http.get(`${this.url}/${participantID}`)
      .pipe(
      tap(cases => this.log('fecthed a case')),
      catchError(this.handleError<Object>('getByParticipant(participantID)'))
      );
  }

  /**
   * Get all cases
   * 
   * @returns {Observable<Object>} 
   * @memberof CaseService
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
   * @memberof CaseService
   */
  save(caseData): Observable<Object> {
    return this.http.post<Object>(this.url, caseData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty("errmsg")) {
          console.log("has err msg");
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
   * @param {any} caseID 
   * @param {any} resourceData 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  addContactedResource(caseID, resourceData): Observable<Object> {
    return this.http.post<Object>(`${this.url}/${caseID}/resource`, resourceData)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty("errmsg")) {
          console.log("has err msg");
          this.log('did not add contacted resource to case');
        } else {
          this.log('added contacted resource to case');
        }
      }),
      catchError(this.handleError<Object>('addContactedResource(caseID, resourceData)'))
      );
  }

  /**
   * Update the status of a contacted resource in the case
   * 
   * @param {any} caseID 
   * @param {any} resourceID 
   * @param {any} status 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  updateResourceStatus(caseID, resourceID, status): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${caseID}/resource/${resourceID}`, status)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty("errmsg")) {
          console.log("has err msg");
          this.log('did not update contacted resource status');
        } else {
          this.log('updated contacted resource status');
        }
      }),
      catchError(this.handleError<Object>('updateResourceStatus(caseID, resourceID, status)'))
      );
  }

  /**
   * Update the overall status of the case
   * 
   * @param {any} caseID 
   * @param {any} status 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  updateCaseStatus(caseID, status): Observable<Object> {
    return this.http.put<Object>(`${this.url}/${caseID}/status`, status)
      .pipe(
      tap(c => {
        if (c.hasOwnProperty("errmsg")) {
          console.log("has err msg");
          this.log('did not update case status');
        } else {
          this.log('updated case status');
        }
      }),
      catchError(this.handleError<Object>('updateCaseStatus(caseID, status)'))
      );
  }

  /**
   * Delete a case by ID
   * 
   * @param {any} caseID 
   * @returns {Observable<Object>} 
   * @memberof CaseService
   */
  delete(caseID): Observable<Object> {
    return this.http.delete(`${this.url}/${caseID}`)
      .pipe(
      tap(_ => this.log('deleted case')),
      catchError(this.handleError<Object>('delete(caseID)'))
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
