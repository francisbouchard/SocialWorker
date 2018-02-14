import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  public users;

  constructor(private userService: UserService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

}
