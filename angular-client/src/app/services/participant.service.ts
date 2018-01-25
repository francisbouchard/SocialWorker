import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Participant } from '../classes/participant';
import { MessageService } from './message.service';

@Injectable()
export class ParticipantService {

  private url = 'http://localhost:3000/participant/';

  constructor(private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Get participant by ID
   * 
   * @param {any} participantID
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  get(participantID): Observable<Object> {
    return this.http.get(`${this.url}/${participantID}`)
      .pipe(
      tap(participant => this.log('fetched a participant')),
      catchError(this.handleError<Object>('get(participantID)'))
      );
  }

  /**
   * Get all participants
   * 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  getAll(): Observable<Object> {
    return this.http.get(this.url)
      .pipe(
      tap(participants => this.log('fecthed all participants')),
      catchError(this.handleError<Object>('getAll()'))
      );
  }

  /**
   * Save a new participant profile
   * 
   * @param {any} participantData 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  save(participantData: Participant): Observable<Object> {
    return this.http.post<Object>(this.url, participantData)
      .pipe(
      tap(p => {
        if (p.hasOwnProperty("errmsg")) {
          console.log("has err msg");
          this.log('did not save new participant');
        } else {
          this.log('saved new participant');
        }
      }),
      catchError(this.handleError<Participant>('save(participantData)'))
      );
  }

  /**
   * Delete a participant by ID
   * 
   * @param {any} participantID 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  delete(participantID): Observable<Object> {
    return this.http.delete(`${this.url}/${participantID}`)
      .pipe(
      tap(_ => this.log('deleted participant')),
      catchError(this.handleError<Object>('delete(participantID)'))
      );
  }

  /**
   * Delete a participant's note by its ID
   * 
   * @param {String} participantID 
   * @param {String} noteID 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  deleteNote(participantID: String, noteID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${participantID}/note/${noteID}`)
      .pipe(
      tap(_ => this.log("deleted participant's note")),
      catchError(this.handleError<Object>('deleteNote(participantID, noteID)'))
      );
  }

  /**
   * Search participants to see if account email already exists,
   * or it participant ID has already been taken.
   * 
   * @param {any} participantAttributeValuePair 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  search(participantAttributeValuePair): Observable<Object> {
    return this.http.get(`${this.url}/search/${participantAttributeValuePair}`)
      .pipe(
      map(participants => participants[0] ? true : false),
      tap(_ => this.log('searched participant')),
      catchError(this.handleError<Object>('search participant information'))
      );
  }

  /**
   * Log messages by sending them to message service
   * 
   * @private
   * @param {String} message 
   * @memberof ParticipantService
   */
  private log(message: String) {
    this.messageService.add('Participant Service: ' + message);
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
   * @memberof ParticipantService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }

}
