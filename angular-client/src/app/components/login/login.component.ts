import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }

  public login () {
    this.authenticationService.login(this.user.email, this.user.password).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }

}
