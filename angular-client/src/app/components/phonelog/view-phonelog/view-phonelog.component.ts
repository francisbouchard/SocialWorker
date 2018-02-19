import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';


@Component({
  selector: 'app-view-phonelog',
  templateUrl: './view-phonelog.component.html',
  styleUrls: ['./view-phonelog.component.css']
})
export class ViewPhonelogComponent implements OnInit {
  @Input() hasTabChanged: boolean;

  constructor(
    private phonelogService: PhonelogService,
    public authService: AuthenticationService,
    public router: Router) { }

    ngOnInit() {
      if (!this.authService.loggedIn) {
        this.router.navigateByUrl('login');
      }
    }

}
