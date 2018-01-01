import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Participant } from '../components/participant/participant';

@Injectable()
export class ParticipantService {

  private url = 'http://localhost:3000/participant/';

  constructor(private http: HttpClient) { }

  /**
   * Get all participants 
   * 
   * @param {any} participantName 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  get(participantName): Observable<Object> {
    return this.http.get(this.url);
  }

  /**
   * Save a new participant profile
   * 
   * @param {any} participantData 
   * @returns {Observable<Object>} 
   * @memberof ParticipantService
   */
  save(participantData): Observable<Object> {
    return this.http.post(this.url, participantData);
  }

}
