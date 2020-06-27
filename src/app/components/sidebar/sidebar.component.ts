import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share/share.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userDeatils: any;

  constructor(
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.userDeatils = this.shareService.getUserDetails();
    console.log(this.userDeatils);
  }

}
