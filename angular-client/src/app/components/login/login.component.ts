import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  loading: boolean = false;
  error: boolean = false;
  msg: string = "";
  register: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  public login () {
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password).subscribe(data => {
      this.loading = false;
      this.authenticationService.loggedIn = true;
      this.router.navigateByUrl('/dashboard')

    }, err => {
      console.log(err)
      this.loading = false;
      this.error = true;
      this.msg = err.message;

    });
  }

  public signUp () {
    this.loading = true;
    this.authenticationService.signUp(this.user.rEmail, this.user.rPassword, this.user.rConfirmPassword).subscribe(data => {
      this.loading = false;
      this.register = false;
    }, err => {
      console.log(err);
      this.loading = false;
      this.error = true;
      this.msg = err.message;

    });
  }

}
