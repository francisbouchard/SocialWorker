import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Participant } from '../components/participant/participant';
import { MessageService } from './message.service';

@Injectable()
export class ParticipantService {

  private url = 'http://localhost:3000/participant/';

  constructor(private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Get all participants 
   * 
   * @param {any} participantName 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  get(participantName): Observable<Object> {
    return this.http.get(this.url)
      .pipe(
      tap(participant => this.log('fetched participants')),
      catchError(this.handleError<Object>('get(participantName)'))
      );
  }

  /**
   * Save a new participant profile
   * 
   * @param {any} participantData 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  save(participantData: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.url, participantData)
      .pipe(
      tap((participant:Participant) => this.log('saved new participant')),
      catchError(this.handleError<Participant>('save(participantData)'))
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
