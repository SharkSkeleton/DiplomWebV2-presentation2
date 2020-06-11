import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chat-messaging',
  templateUrl: './chat-messaging.component.html',
  styleUrls: ['./chat-messaging.component.css']
})
export class ChatMessagingComponent {

  constructor() {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

}
