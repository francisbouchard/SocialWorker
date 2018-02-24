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
    editingLog = Phonelog;
    public logs;
    public sortProperty = 'urgent';
    public reverse = false;
    public query: string;


  constructor(
    private phonelogService: PhonelogService,
    public authService: AuthenticationService,
    public router: Router) { }

    loadLogs() {
    if (this.authService.role === 'admin') {
      this.phonelogService.getAll()
        .subscribe(data => {
          console.log(data)
          this.logs = data;
        });
    }
  }

  /**
   * Specify which log is currently in edit mode
   *
   * @param {any} id
   * @param {any} log
   * @memberof ViewParticipantsComponent
   */
  edit(id, log) {
    this.editingLog = log;
  }

   /**
   * Update Log with new attributes
   *
   * @param {any} id
   * @param {any} log
   * @memberof ViewParticipantsComponent
   */
  update(id, log) {
    this.phonelogService.update(id, log) // TODO
      .subscribe(data => {
        console.log(data);
        this.cancel();
      });
  }

  resolve(id, log) {
    this.phonelogService.resolve(id, log) // TODO
      .subscribe(data => {
        console.log(data);
        this.cancel();
      });
  }

   /**
   * Cancel edit mode and return to view mode
   *
   * @memberof ViewParticipantsComponent
   */
  cancel() {
    this.edit('', null);
    this.loadLogs();
  }

    ngOnInit() {
      if (!this.authService.loggedIn) {
        this.router.navigateByUrl('login');
      }
      else {
      this.loadLogs();
    }
    }

}
