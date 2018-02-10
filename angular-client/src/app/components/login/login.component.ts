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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  /**
   * Login with account credentials
   * 
   * @memberof LoginComponent
   */
  public login() {
    this.loading = true;
    this.msg = '';
    this.error = false;
    this.authenticationService.login(this.user.email, this.user.password).subscribe(data => {
      this.loading = false;
      if (!data.error) {
        this.authenticationService.loggedIn = true;
        this.router.navigateByUrl('/profiles');
      } else {
        this.authenticationService.loggedIn = false;
        this.loading = false;
        this.error = true;
        this.msg = data.error.msg;
      }
    });
  }

  /**
   * Sign up as a new account 
   * 
   * @memberof LoginComponent
   */
  public signUp() {
    this.loading = true;
    this.msg = '';
    this.error = false;
    this.authenticationService.signUp(this.user.rEmail, this.user.rPassword, this.user.rConfirmPassword).subscribe(data => {
      this.loading = false;

      if (data.error) {
        this.authenticationService.loggedIn = false;
        this.loading = false;
        this.error = true;
        this.msg = '';

        if (Array.isArray(data.error.msg)) {
          for (const i in data.error.msg) {
            if (data.error.msg[i] != null) {
              this.msg += data.error.msg[i].msg + '\n';
            }
          }
        } else {
          this.msg = data.error.msg;
        }
      }
    });

  }

}
