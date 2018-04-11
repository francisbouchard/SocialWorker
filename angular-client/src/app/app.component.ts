import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './adapters/ngchat.socketio.adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialWorker';
  userId = 999;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private socketIOAdapter: SocketIOAdapter,
  ) {
  }
  public heartbeat = false;
  public loggedIn = false;

  public adapter: ChatAdapter = this.socketIOAdapter;


  ngOnInit() {
    this.authenticationService.heartbeat().subscribe(data => {
      if (!data.loggedIn) {
        this.router.navigateByUrl('/login');
        this.authenticationService.loggedIn = false;
        this.heartbeat = true;
      } else {
        this.authenticationService.loggedIn = true;
        this.heartbeat = true;
      }
    }, err => {
      this.heartbeat = true;
    });
  }
  public logout() {
    this.authenticationService.logout().subscribe(data => {
      this.router.navigateByUrl('/login');
      this.authenticationService.loggedIn = false;
    }, err => {
      console.log(err);
    });
  }
}
