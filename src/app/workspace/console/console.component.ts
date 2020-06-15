import {Component, Input, OnInit} from '@angular/core';
import {SocketWorkSpace} from '../../socket-work-space.service';
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @Input() consoleData;
  @Input() userLogin;
  @Input() projectName;
  myInput;
  user = {
    id: '',
    login: ''
  };
  name: string;
  constructor(private socketService: SocketWorkSpace, private httpService: HttpService) { }

  ngOnInit(): void {
    this.consoleData = [];
    const stompClient = this.socketService.connect();

    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      console.log(`SOME DATA ${this.projectName.toLowerCase()}_${this.userLogin.toLowerCase()}`);
      stompClient.subscribe(`/${this.projectName.toLowerCase()}_${this.userLogin.toLowerCase()}`, notifications => {

        // Update notifications attribute with the recent messsage sent from the server

        this.consoleData.push(notifications.body);
        console.log(notifications);
      });
      // stompClient.send(`/${data2.toLowerCase()}_${data.login.toLowerCase()}/input`, {}, 'aaaaa');
    });
  }

}

//
// stompClient.connect({}, frame => {
//
//   // Subscribe to notification topic
//   console.log(`SOME DATA ${data2.toLowerCase()}_${data.login.toLowerCase()}`);
//   stompClient.subscribe(`/${data2.toLowerCase()}_${data.login.toLowerCase()}`, notifications => {
//
//     // Update notifications attribute with the recent messsage sent from the server
//
//     this.consoleData.push(notifications.body);
//     console.log(notifications);
//   });
//   // stompClient.send(`/${data2.toLowerCase()}_${data.login.toLowerCase()}/input`, {}, 'aaaaa');
// });
