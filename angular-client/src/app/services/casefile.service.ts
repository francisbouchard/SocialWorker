import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class CasefileService {

  private url = '/api/casefile';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {

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
   * Get cases by participant ID
   *
   * @param {any} participantID
   * @returns {Observable<Object>}
   * @memberof CasefileService
   */
  getByParticipant(participantID): Observable<Object> {
    return this.http.get(`${this.url}/participant/${participantID}`)
      .pipe(
      tap(cases => this.log('fetched cases')),
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
   * Get all cases that are in progress
   *
   * @returns {Observable<Object[]>}
   * @memberof CasefileService
   */
  getAllActive(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/active/all`)
      .pipe(
      tap(cases => this.log('fetched all active cases')),
      catchError(this.handleError<Object[]>('getAllActive()'))
      );
  }

  getRecentlyUpdated(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/active/recent`)
    .pipe(
      tap(cases => this.log('fetched recently updated cases')),
      catchError(this.handleError<Object[]>('getRecentlyUpdated()'))
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
addContactedResource(casefileID, resourceData): Observable < Object > {
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
 * Update the state of a contacted resource in the case.
 * You can update: status, dateContacted, note.
 *
 * @param {any} casefileID
 * @param {any} resourceID
 * @param {any} updatedParams
 * @returns {Observable<Object>}
 * @memberof CasefileService
 */
updateCaseContactedResource(casefileID, resourceID, updatedParams): Observable < Object > {
  return this.http.put<Object>(`${this.url}/${casefileID}/resource/${resourceID}`, updatedParams)
    .pipe(
    tap(c => {
      if (c.hasOwnProperty('errmsg')) {
        console.log('has err msg');
        this.log('did not update contacted resource');
      } else {
        this.log('updated contacted resource');
      }
    }),
    catchError(this.handleError<Object>('updateResourceStatus(casefileID, resourceID, status)'))
    );
}

/**
 * Update a casefile with the selected resource
 * selectedResource should include fields: resource, startDate, endDate
 *
 * @param {any} casefileID
 * @param {any} selectedResource
 * @returns {Observable<Object>}
 * @memberof CasefileService
 */
updateCaseSelectedResource(casefileID, selectedResource): Observable < Object > {
  return this.http.put<Object>(`${this.url}/${casefileID}/selection`, selectedResource)
    .pipe(
    tap(c => {
      if (c.hasOwnProperty('errmsg')) {
        console.log('has err msg');
        this.log('did not update casefile selection');
      } else {
        this.log('updated casefile');
      }
    }),
    catchError(this.handleError<Object>('updateCaseSelectedResource(casefileID, resourceID)'))
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
updateCaseStatus(casefileID, status): Observable < Object > {
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
 * Update Casefile note
 *
 * @param {any} casefileID
 * @param {any} note
 * @returns {Observable<Object>}
 * @memberof CasefileService
 */
updateCaseNote(casefileID, notes): Observable < Object > {
  return this.http.put<Object>(`${this.url}/${casefileID}/note`, notes)
    .pipe(
    tap(c => {
      if (c.hasOwnProperty('errmsg')) {
        this.log('did not update case note');
      } else {
        this.log('updated case note');
      }
    }),
    catchError(this.handleError<Object>('updateCaseNote()'))
    );
}

/**
 * Delete a case by ID
 *
 * @param {any} casefileID
 * @returns {Observable<Object>}
 * @memberof CasefileService
 */
delete (casefileID): Observable < Object > {
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
  private handleError<T>(operation = 'operation', result ?: T) {
  return (error: any): Observable<T> => {
    this.log(`${operation} failed - ${error.message}`);
    return of(result as T);
  };
}

}
