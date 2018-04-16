import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ChatAdapter } from 'ng-chat';
import { Socket } from 'ng-socket-io';
import { SocketIOAdapter } from './adapters/ngchat.socketio.adapter';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialWorker';
  userId: string;
  username: string;
  public adapter: ChatAdapter;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private socket: Socket,
    private http: Http,
  ) {
    this.InitializeSocketListerners();
  }
  public heartbeat = false;
  public loggedIn = false;

  ngOnInit() {
    this.authenticationService.heartbeat().subscribe(data => {
      if (!data.loggedIn) {
        this.router.navigateByUrl('/login');
        this.authenticationService.loggedIn = false;
        this.heartbeat = true;
      } else {
        this.authenticationService.loggedIn = true;
        this.heartbeat = true;
        this.testChat();
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

  public joinRoom(): void 
  {
    this.socket.emit("join", this.username);
  }

  public testChat(): void {
    this.username = this.authenticationService.profile.name;
    this.joinRoom();
  }

  public InitializeSocketListerners(): void
  {
    this.socket.on("generatedUserId", (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}
