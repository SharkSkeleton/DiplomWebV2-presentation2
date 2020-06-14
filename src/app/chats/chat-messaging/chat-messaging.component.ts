import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../socket.service';
import {PageService} from '../../page.service';
import {Section} from '../chats.component';

@Component({
  selector: 'app-chat-messaging',
  templateUrl: './chat-messaging.component.html',
  styleUrls: ['./chat-messaging.component.css']
})
export class ChatMessagingComponent implements OnInit, OnDestroy {

  // myGroups: Section[];
  msgObj = [
    {
      author: 'Misha',
      msg: 'Hello Sasha'
    },
    {
      author: 'Sasha',
      msg: 'Hello Misha'
    }
  ];

  msg: '';

  chatName: string;

  constructor(private socketService: SocketService, private pageService: PageService) {
    this.socketService.connect();
    this.pageService.getMessage().subscribe(data => {
      this.msgObj = data.allMsg;
      this.chatName = data.text;
      // this.myGroups = data.allGroups;
      // this.socketService.getAllMessages(data.text).subscribe(msg => {
      //   console.log(data.text);
      //   this.msgObj = msg;
      //   console.log(msg);
      // });
    });
  }

  ngOnInit() {

  }

  saveMsg(msg: string) {
    // alert(`User id: ${window.sessionStorage.getItem('id')} and he's message: ${msg}`);
    this.socketService.sendMessage(window.sessionStorage.getItem('id'), this.chatName, msg).subscribe(data =>
    this.msgObj = data);
    this.pageService.sendMessage('Reload');
  }

  ngOnDestroy() {
    // this.socketService.disconnect();
  }
}
