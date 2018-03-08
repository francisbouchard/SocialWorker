import { Component, OnInit } from '@angular/core';
import { TrashService } from '../../../services/trash.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  // TODO replace with db data
  items = [];

  constructor(public authService: AuthenticationService, private trashService: TrashService) { }

  ngOnInit() {
    this.loadTrashRecords();
  }

  loadTrashRecords(): void {
    this.trashService.getAll()
      .subscribe( (data: [any]) => {
        this.items = data;
      });
  }

}
