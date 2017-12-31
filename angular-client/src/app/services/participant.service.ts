import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantService {

  private data: any;

  constructor(private http: Http) { }

  get(participantName) {
    let that = this;
    return new Promise(resolve => {
      this.http.get('api/participants/' + participantName)
      .map(res => res.json())
      .subscribe(data => {
        that.data = data;
        resolve(that.data);
      })
    })
  }

  save(participantData) {
    let that = this;
    return new Promise(resolve => {
      this.http.post('api/participants/', participantData)
    })
  }

}
