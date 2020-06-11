import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageService} from '../page.service';
import {Subscription} from 'rxjs';
import {Task} from '../../task';
import {HttpService} from '../../http.service';
import {UrlSerializer} from '@angular/router';
import {User} from '../../user';
import {SocketService} from '../../socket.service';

export interface DoneSection {
  title: string;
  subtitle: string;
  content: string[];
  rate: string;
}

export interface Section {
  title: string;
  subtitle: string;
  content: string[];
}

export interface EditableSection {
  title: string;
  subtitle: string;
  content: string[];
  buttonLabel: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  message: string;
  subscription: Subscription;

  constructor(private pageService: PageService, private httpService: HttpService, private socketService: SocketService) {
    this.pageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message.text;
        this.tasks = message.allTasks;
      } else {
        this.message = '';
        this.tasks = null;
      }
    });
  }

  tasks: Task[] = [
    {
      title: '',
      description: '',
      status: '',
      author: '',
      authorRole: '',
      executor: '',
    },
  ];

  // inProgressTasks: Task[] = [
  //   {
  //     title: '',
  //     description: '',
  //     status: '',
  //     author: '',
  //     authorRole: '',
  //     executor: '',
  //   },
  // ];

  // inProgressTasks: EditableSection[] = [
  //   { title: 'Mishka',
  //     subtitle: 'Developer CSG',
  //     content: ['Task#777:', '1. Create window', '2. Create buttons', '3. Test components'],
  //     buttonLabel: 'Send to check',
  //   },
  // ];

  onCheckingTasks: Section[] = [
    { title: 'John Doe',
      subtitle: 'Developer CSG',
      content: ['Tasks:', '1. Task 1', '2. Task 2', '3. Task 3'],
    },
    { title: 'Mishka',
      subtitle: 'Developer CSG',
      content: ['Task#777:', '1. Create window', '2. Create buttons', '3. Test components'],
    },
  ];

  doneTasks: DoneSection[] = [
    { title: 'John Doe',
      subtitle: 'Developer CSG',
      content: ['Tasks:', '1. Task 1', '2. Task 2', '3. Task 3'],
      rate: 'Your rate is: 7'
    },
    { title: 'John Doe',
      subtitle: 'Developer CSG',
      content: ['Tasks:', '1. Task 1', '2. Task 2', '3. Task 3'],
      rate: 'Your rate is: 5'
    },
    { title: 'Mishka',
      subtitle: 'Developer CSG',
      content: ['Task#777:', '1. Create window', '2. Create buttons', '3. Test components'],
      rate: 'Your rate is: 10'
    },
  ];

  ngOnInit(): void {
    this.pageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message.text;
        this.tasks = message.allTasks;
      } else {
        this.message = '';
        this.tasks = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClickSend(task: Task) {
    this.socketService.setOnCheckingPage(task, 'onChecking', window.sessionStorage.getItem('id')).subscribe(tasks => {
      this.tasks = tasks;
    });
    // this.socketService.getOnCheckingTasks(task, 'readyForChecking');
    // this.pageService.getMessage().subscribe(message => {
    //   if (message) {
    //     this.message = message.text;
    //     this.tasks = message.allTasks;
    //   } else {
    //     this.message = '';
    //     this.tasks = null;
    //   }
    // });
  }

  onClickGet(task: Task) {
    // task.status = 'inProgress';
    // window.sessionStorage.getItem('id');
    // task;
    this.socketService.sendUserGetTask(task, 'inProgress', window.sessionStorage.getItem('id'));
    this.pageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message.text;
        this.tasks = message.allTasks;
      } else {
        this.message = '';
        this.tasks = null;
      }
    });


    // tslint:disable-next-line:max-line-length
    // this.socketService.sendUserGetTask(window.sessionStorage.getItem('id'));
    // tslint:disable-next-line:max-line-length



    // this.httpService.postGetAllDataAboutUser(window.sessionStorage.getItem('id')).subscribe( (data: User) => {
    //   task.executor = data.login;
    //   this.httpService.postUpdateTaskInProgress(task).subscribe();
    //   this.socketService.sendOnClick();
    //   window.location.reload();
    // } );


    // this.socketService.sendOnClick();
  }
}
