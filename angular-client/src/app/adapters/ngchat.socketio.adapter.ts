
import { Injectable } from '@angular/core';
import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserService } from './../services/user.service';
import { Socket } from 'ng-socket-io';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/from';

export class SocketIOAdapter extends ChatAdapter
{
    private socket: Socket;
    private http: Http;
    private userId: string;

    constructor(
        userId: string, 
        socket: Socket, 
        http: Http,
        private userService: UserService
    ) {
        super();
        this.socket = socket;
        this.http = http;
        this.userId = userId;

        this.InitializeSocketListerners();  
    }

    listFriends(): Observable<User[]> {
        return this.userService.getAll().map( 
            (users) => {
                console.log(users)
                let x = new User();
                x.id = 99;
                x.displayName = "Test";
                x.status = UserStatus.Online;

                return [x];
            }
        );
    }

    getMessageHistory(userId: any): Observable<Message[]> {
        return Observable.of([]);
    }
    
    sendMessage(message: Message): void {
        this.socket.emit("sendMessage", message);
    }

    public InitializeSocketListerners(): void
    {
      this.socket.on("messageReceived", (messageWrapper) => {
        // Handle the received message to ng-chat
        this.onMessageReceived(messageWrapper.user, messageWrapper.message);
      });

      this.socket.on("friendsListChanged", (usersCollection: Array<User>) => {
        // Handle the received message to ng-chat
        this.onFriendsListChanged(usersCollection.filter(x => x.id != this.userId));
      });
    }
}