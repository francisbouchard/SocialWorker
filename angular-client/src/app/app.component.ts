import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}
  title = 'app';
  public logout(){
    this.authenticationService.logout().subscribe(data => {
      this.router.navigateByUrl('/login')
    });
  }
}
