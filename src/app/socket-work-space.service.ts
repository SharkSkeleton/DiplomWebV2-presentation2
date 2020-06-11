// import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
// import {Observable, Subject} from 'rxjs';
//
// @Injectable()
// export class SocketWorkSpace {
//   private host = 'http://localhost:8080/diplom';
//   private socket: SocketIOClient.Socket;
//   private tasksSubj = new Subject<any>();
//
//   constructor() {
//     this.socket = io(this.host); // {transports: ['webSocket']}
//     console.log('Pre connect steps are performed');
//   }
//
//   // EMITTER
//   sendMessage(id: string, login: string) {
//     console.log('Here');
//     this.socket.emit('news', { uId: id, uL: login });
//     this.socket.on('news', data => {
//       console.log('Received data from Backend', data);
//       this.tasksSubj.next(data);
//     });
//     return this.tasksSubj.asObservable();
//   }
//
//   getTasks() {
//     this.socket.emit('helloword_admin', 'TODO');
//     this.socket.on('helloword_admin', data => {
//       console.log('Received data from Backend', data);
//       this.tasksSubj.next(data);
//     });
//     return this.tasksSubj.asObservable();
//   }
//
//
//   connect() {
//     this.socket.connect();
//   }
//
//   disconnect() {
//     this.socket.disconnect();
//   }
//
//   // HANDLER
//   // onNewMessage() {
//   //   console.log('I`m working');
//   //   return Observable.create(observer => {
//   //     this.socket.on('news', data => {
//   //       // this.socket.emit('news', 'sa');
//   //       observer.next(data);
//   //       console.log(data);
//   //     });
//   //   });
//   // }
// }

import {Injectable} from '@angular/core';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

@Injectable()
export class SocketWorkSpace {

  // Open connection with the back-end socket
  public connect() {
    const socket = new SockJs(`http://localhost:8080/diplom`);
    const stompClient = Stomp.over(socket);
    return stompClient;
  }
}
