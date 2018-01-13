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

}
