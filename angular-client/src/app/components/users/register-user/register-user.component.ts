import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

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
   * Register a new user account 
   * 
   * @memberof LoginComponent
   */
  public signUp() {
    this.loading = true;
    this.msg = '';
    this.error = false;
    this.authenticationService.signUp(this.user.rEmail, this.user.rPassword, this.user.rConfirmPassword).subscribe(data => {
      this.loading = false;

      if (!data.error) {
        this.msg = data.msg;
      } else {
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
