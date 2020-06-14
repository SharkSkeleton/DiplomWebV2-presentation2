import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {PageService} from '../page.service';

export interface Section {
  groupName: string;
  date: string;
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {

  done = false;

  favorites: Section[] = [
    {
      groupName: 'TROUBLES with DB',
      date: '',
    }
  ];

  obj: [];

  constructor(private socketService: SocketService, private pageService: PageService) {
  }

  ngOnInit() {
    this.socketService.connect();
    this.socketService.getAllChats().subscribe(data => {
      this.favorites = data;
    });
    this.pageService.getMessage().subscribe(data => {
    });
  }

  ChatOpen(chatName) {
    this.done = true;
    this.socketService.getAllMessages(chatName).subscribe(data => {
      this.pageService.sendMessage(chatName, [], data, this.favorites);
    });
    // this.pageService.sendMessage('');
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
