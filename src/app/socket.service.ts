import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import {Task} from './task';

@Injectable()
export class SocketService {
  private host = 'http://localhost:3001';
  private socket: SocketIOClient.Socket;
  private tasksSubj = new Subject<any>();

  constructor() {
    this.socket = io(this.host); // {transports: ['webSocket']}
    console.log('Pre connect steps are performed');

    // this.socketService.onNewMessage().subscribe((data: Task[]) => {
    //   console.log('Received data from Backend', data);
    //   this.tasks = data;
    //   this.pageService.sendMessage('TODO', this.tasks);
    // });
    // this.socket.on('news', data => {
    //     console.log('Received data from Backend', data);
    //     this.tasksSubj.next(data);
    // });
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('news', { message: msg });
  }

  sendUserGetTask(task: Task, status: string, id: string) {
    this.socket.emit('onGetClick', { selectedTask: task, changedStatus: status, userId: id });
  }

  sendInProgressPage(id: string) {
    this.socket.emit('InProgressPage', { userId: id });

    // this.socket.on('InProgressPage', data => {
    //   console.log('Received data from Backend', data);
    //   this.tasksSubj.next(data);
    // });
    //
    // return this.tasksSubj.asObservable();
  }

  getTasks() {
    this.socket.emit('news', 'TODO');
    this.socket.on('news', data => {
      console.log('Received data from Backend', data);
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  getInProgressTasks(id: string) {
    this.socket.emit('InProgressPage', {userId: id});
    this.socket.on('InProgressPage', data => {
      console.log('Received data from Backend', data);
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  setOnCheckingPage(task: Task, status: string, id: string) {
    this.socket.emit('OnCheckingPageBtn', {uTask: task, changedStatus: status, userId: id});
    this.socket.on('OnCheckingPageBtn', data => {
      console.log('Received data from Backend', data);
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  getOnCheckingTasks(id: string) {
    this.socket.emit('OnCheckingPage', {userId: id, changedStatus: 'onChecking'});
    this.socket.on('OnCheckingPage', data => {
      console.log('Received data from Backend', data);
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  getDoneTasks(id: string, mark: string) {
    this.socket.emit('DonePage', {userId: id, userMark: mark});
    this.socket.on('DonePage', data => {
      console.log('Received data from Backend', data);
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  createNewProject(project) {
    this.socket.emit('ProjectCreation', project);
    // this.socket.on('ProjectCreation', data => {
    //   this.tasksSubj.next(data);
    // });
    // return this.tasksSubj.asObservable();
  }

  getAllProjects() {
    this.socket.emit('GetAllProjects', 'msg');
    this.socket.on('GetAllProjects', data => {
      this.tasksSubj.next(data);
    });
    return this.tasksSubj.asObservable();
  }

  getAllProjectFiles(path) {
    this.socket.emit('GetAllProjectsFiles', {projectPath: path});
    this.socket.on('GetAllProjectsFiles', data => {
      if (data !== null || data !== []) {
        console.log('Received data from Backend', data);
        this.tasksSubj.next(data);
      }
    });
    return this.tasksSubj.asObservable();
  }

  sendOnClick() {
    this.socket.emit('onGetClick', {data: 'dummy data'});
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  // HANDLER
  // onNewMessage() {
  //   console.log('I`m working');
  //   return Observable.create(observer => {
  //     this.socket.on('news', data => {
  //       // this.socket.emit('news', 'sa');
  //       observer.next(data);
  //       console.log(data);
  //     });
  //   });
  // }
}
