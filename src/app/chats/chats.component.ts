import { Component } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {

  done = false;

  favorites: Section[] = [
    {
      name: 'Back-end',
      updated: new Date('1/1/20'),
    },
    {
      name: 'Front-end',
      updated: new Date('1/17/20'),
    },
    {
      name: 'Full-stack',
      updated: new Date('1/28/20'),
    },
    {
      name: 'QA',
      updated: new Date('2/28/20'),
    }
  ];

  ChatOpen() {
    this.done = true;
  }

}
