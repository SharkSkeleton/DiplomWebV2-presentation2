import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Task} from './task';
import {Section} from './chats/chats.component';

interface Message {
  author: '';
  msg: '';
}

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  sendMessage(message: string, tasks?: Task[], msgs?: Message[], groups?: Section[]) {
    this.subject.next({ text: message, allTasks: tasks, allMsg: msgs, allGroups: groups });
  }

  sendTreeData(tree) {
    this.subject2.next({myTree: tree});
  }

  sendFileData(data: string) {
    this.subject.next({myData: data});
  }

  sendDoneTasks(message: string, tasks: Task[], marks: string[]) {
    this.subject.next({ text: message, allTasks: tasks, allMarks: marks });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getTreeMessage(): Observable<any> {
    return this.subject2.asObservable();
  }
}
