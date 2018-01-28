import { Observable } from "rxjs/Observable";

export class MockAuthenticationService {
    heartbeat () : Observable<any>  {
        return Observable.of({ data: {loggedIn: true} });
      }
}