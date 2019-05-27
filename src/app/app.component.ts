import { Component, OnInit  } from '@angular/core';

import {CloudMessagingService} from './services/cloud_messagin/cloud-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'nutraltest';
// }
export class AppComponent implements OnInit {

  message;

  constructor(private msgService: CloudMessagingService) {}

  ngOnInit() {
    // this.msgService.getPermission();
    // this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

}