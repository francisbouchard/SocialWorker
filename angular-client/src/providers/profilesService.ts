import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';



@Injectable()
export class ProfilesService {
    data: any;
    public headers;
    public options;
  
    constructor(private http: Http) {
        this.options = new RequestOptions({ headers: this.headers });
    }
   //TODO: Get participants by worker id after authentication is implemented
    getAll() {
        let that = this;
        return new Promise(resolve => {
            this.http.get('http://localhost:3000/participant/',that.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }   
}