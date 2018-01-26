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
      if (data.status === '200') {
        this.authenticationService.loggedIn = true;
        this.router.navigateByUrl('/dashboard');
      } else {
        this.authenticationService.loggedIn = false;
        this.loading = false;
        this.error = true;
        this.msg = data.error.msg;
      }
    });
  }

  public signUp () {
    this.loading = true;
    this.authenticationService.signUp(this.user.rEmail, this.user.rPassword, this.user.rConfirmPassword).subscribe(data => {
      this.loading = false;

      if (data.status === '200') {
        this.register = false;
      } else {
        this.authenticationService.loggedIn = false;
        this.loading = false;
        this.error = true;
        this.msg = "";
        console.log(data);
        console.log(data.error.msg);

        if (Array.isArray(data.error.msg)) {
          for (let i in data.error.msg) {
            this.msg += data.error.msg[i].msg? data.error.msg[i].msg : ""  + "\n";
          }
        } else {
          this.msg = data.error.msg;
        }
      }
    });

  }

}
