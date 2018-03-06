import { Component, OnInit, Input, Inject, Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';
import { ChangeDetectorRef} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-view-phonelog',
  templateUrl: './view-phonelog.component.html',
  styleUrls: ['./view-phonelog.component.css'],

})

export class ViewPhonelogComponent implements OnInit {
  @Input() hasTabChanged: boolean;
    editingLog = Phonelog;
    public logs=[];
    public log;
    public sortProperty = 'urgent';
    public reverse = false;
    public query: string;


  constructor(
    private chRef: ChangeDetectorRef, 
    private phonelogService: PhonelogService,
    public authService: AuthenticationService,
    public router: Router) { }

    ngOnInit() {
      if (!this.authService.loggedIn) {
        this.router.navigateByUrl('login');
      }
      else {
      this.loadLogs();
    }
    }

    loadLogs() {
    if (this.authService.role === 'admin') {
      this.phonelogService.getAll()
        .subscribe(data => {
          console.log(data)
          this.log = data;
          for(var i=0;i<this.log.length;i++){
            if(this.log[i].deleted==false){
              this.logs.push(this.log[i]);
            }
          }
          console.log(this.logs)
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
  edit(log) {
   this.editingLog = log;
  }

   /**
   * Update Log with new attributes
   *
   * @param {any} id
   * @param {any} log
   * @memberof ViewParticipantsComponent
   */
  update(log) {
    this.phonelogService.update(log) // TODO
      .subscribe(data => {
       this.logs=[];
        this.cancel();
      });
  }
    

 delete(log) {
    this.phonelogService.delete(log._id,{deleted:'true'}).subscribe(data => {
        this.logs=[];
        this.loadLogs();
      });
  }
   /**
   * Cancel edit mode and return to view mode
   *
   * @memberof ViewParticipantsComponent
   */
  cancel() {
    this.edit(null);
    let logs=[];
    this.loadLogs();
  }
}
