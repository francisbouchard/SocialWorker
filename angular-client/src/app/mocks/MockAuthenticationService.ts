import { Observable } from 'rxjs/Observable';

export class MockAuthenticationService {
    public loggedIn = true;
    heartbeat (): Observable<any>  {
        return Observable.of({ data: {loggedIn: true} });
      }
}
