import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Participant } from '../classes/participant';
import { Note } from '../classes/note';
import { Document } from '../classes/document';
import { MessageService } from './message.service';

@Injectable()
export class ParticipantService {

  private url = '/api/participant/';

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
    return this.http.get(`${this.url}/id/${participantID}`)
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
        tap(participants => this.log('fetched all participants')),
        catchError(this.handleError<Object>('getAll()'))
      );
  }

  /**
   * Get all participants of the logged in social worker
   *
   * @returns {Observable<Object>}
   * @memberof ParticipantService
   */
  getBySocialWorker(): Observable<Object> {
    return this.http.get(`${this.url}/worker`)
      .pipe(
        tap(participants => this.log('fecthed participants of social worker')),
        catchError(this.handleError<Object>('getBySocialWorker()'))
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
          if (p.hasOwnProperty('errmsg')) {
            console.log('has err msg');
            this.log('did not save new participant');
          } else {
            this.log('saved new participant');
          }
        }),
        catchError(this.handleError<Participant>('save(participantData)'))
      );
  }


    /**
   * Update participant with new data
   *
   * @param {any} participantID
   * @param {any} participantData
   * @returns {Observable<Object>}
   * @memberof ResourceService
   */
  update(participantID, participantData): Observable<Object> {
    return this.http.put(`${this.url}/${participantID}`, participantData)
      .pipe(
      tap(_ => this.log('saving a resource')),
      catchError(this.handleError<Object>('update()'))
      );
  }

  /**
   * Save a note to a participant
   *
   * @param {FormData} file
   * @param {Note} note
   * @param {String} pid
   * @returns {Observable<Object>}
   * @memberof ParticipantService
   */
  saveNote(file: FormData, note, pid: String): Observable<Object> {
    return this.http.post<Object>(`${this.url}/${pid}/note`, file, { params: note })
      .pipe(
        tap(_ => this.log('saved a note to participant')),
        catchError(this.handleError<Object>('saveNote()'))
      );
  }

  /**
   * Save a document to a participant
   *
   * @param {FormData} file
   * @param {Document} document
   * @param {String} pid
   * @returns {Observable<Object>}
   * @memberof ParticipantService
   */
  saveDocument(file: FormData, document, pid: String): Observable<Object> {
    return this.http.post<Object>(`${this.url}/${pid}/doc`, file, { params: document })
      .pipe(
        tap(_ => this.log('saved a document to participant')),
        catchError(this.handleError<Object>('saveDocument()'))
      );
  }

  /**
   * Add a social worker to a participant
   * 
   * @param {String} participantID 
   * @param {String} workerID 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  addSocialWorker(participantID: String, workerID: String): Observable<Object> {
    return this.http.post<Object>(`${this.url}/${participantID}/worker`, { workerID: workerID })
      .pipe(
        tap(_ => this.log('added a social worker to participant')),
        catchError(this.handleError<Object>('addSocialWorker(participantID: String, workerID:String)'))
      );
  }

  /**
   * Remove social worker with given ID from participant
   * 
   * @param {String} participantID 
   * @param {String} workerID 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  removeSocialWorker(participantID: String, workerID: String): Observable<Object> {
    return this.http.delete<Object>(`${this.url}/${participantID}/worker/${workerID}`)
      .pipe(
        tap(_ => this.log('removed social worker from participant')),
        catchError(this.handleError<Object>('removeSocialWorker(participantID: String, workerID:String)'))
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
        tap(_ => this.log('deleted participant\'s note')),
        catchError(this.handleError<Object>('deleteNote(participantID, noteID)'))
      );
  }

  /**
   * Delete a participant's document by its ID
   *
   * @param {String} participantID
   * @param {String} documentID
   * @returns {Observable<Object>}
   * @memberof ParticipantService
   */
  deleteDocument(participantID: String, documentID: String): Observable<Object> {
    return this.http.delete(`${this.url}/${participantID}/doc/${documentID}`)
      .pipe(
        tap(_ => this.log('deleted participant\'s document')),
        catchError(this.handleError<Object>('deleteDocument(participantID, documentID)'))
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
