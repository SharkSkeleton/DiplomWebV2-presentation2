import {Component, Input, OnInit} from '@angular/core';
import {SocketWorkSpace} from '../../socket-work-space.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @Input() consoleData;
  myInput;
  constructor(private socketService: SocketWorkSpace) { }

  ngOnInit(): void {
    const stompClient = this.socketService.connect();

    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      stompClient.subscribe('/hellojava_admin', notifications => {

        // Update notifications attribute with the recent messsage sent from the server
        this.consoleData += notifications.body;
        console.log(notifications);
      });
      // stompClient.send('/hellopython_admin/input', {}, 'aaaaa');
    });
  }

}
