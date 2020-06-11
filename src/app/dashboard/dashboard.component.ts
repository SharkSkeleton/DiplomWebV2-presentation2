import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageService} from './page.service';
import {HttpService} from '../http.service';
import {Task} from '../task';
import {User} from '../user';
import {SocketService} from '../socket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  taskUser: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
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

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private pageService: PageService, private httpService: HttpService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.socketService.connect();
    console.log('Frontend has successfully connected!');
    // this.socketService.getTasks().subscribe(tasks => {
    //   // console.log('Received tasks on component side', tasks);
    //   this.toDOTasks = tasks;
    //   this.pageService.sendMessage('TODO', this.toDOTasks);
    // });
    this.setToDoPage();
  }

  setToDoPage() {
    // this.socketService.getTasks().subscribe(tasks => {
    //   // console.log('Received tasks on component side', tasks);
    //   this.tasks = tasks;
    //   this.pageService.sendMessage('TODO', this.tasks);
    // });
    // this.socketService.connect();
    this.socketService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.pageService.sendMessage('TODO', this.tasks);
    });
    // this.pageService.sendMessage('TODO', this.toDOTasks);

    // tslint:disable-next-line:max-line-length
    // this.socketService.sendMessage('Hello');

    // this.socket.emit('event1', {
    //   msg: 'Client to server, can you hear me server?'
    // });
    // this.socket.on('event2', (data: any) => {
    //   console.log(data.msg);
    //   this.socket.emit('event3', {
    //     msg: 'Yes, its working for me!!'
    //   });
    // });
    // this.socket.on('event4', (data: any) => {
    //   console.log(data.msg);
    // });


    // tslint:disable-next-line:max-line-length
    // this.httpService.postGetAllTasks().subscribe( (data: Task[]) => { this.tasks = data; this.pageService.sendMessage('TODO', this.tasks); } );
  }

  setInProgressPage() {
    // tslint:disable-next-line:max-line-length
    // this.httpService.postGetAllDataAboutUser(window.sessionStorage.getItem('id')).subscribe( (data: User) => {
    //   this.taskUser = data.login;
    //   this.httpService.postGetAllTasksInProgress(this.taskUser).subscribe((data1: Task[]) => {
    //     this.tasks = data1;
    //     this.pageService.sendMessage('InProgress', this.tasks); }); } );

    this.socketService.getInProgressTasks(window.sessionStorage.getItem('id')).subscribe(tasks => {
      this.tasks = tasks;
      this.pageService.sendMessage('InProgress', this.tasks);
    });
    // this.pageService.sendMessage('InProgress', this.tasks);

    //
    // this.socketService.sendInProgressPage(window.sessionStorage.getItem('id')).subscribe(tasks => {
    //   console.log('Received tasks on component side', tasks);
    //   this.tasks = tasks;
    //   this.pageService.sendMessage('InProgress', this.tasks);
    // });
    // tslint:disable-next-line:max-line-length
    // this.httpService.postGetAllTasksInProgress(this.httpService.postGetAllDataAboutUser(window.sessionStorage.getItem('id')).subscribe( (data: User) => { data.login; })).subscribe( (data: Task[]) => { this.tasks = data; this.pageService.sendMessage('InProgress', this.tasks); } );
  }
  //
  setOnCheckingPage() {
    this.socketService.getOnCheckingTasks(window.sessionStorage.getItem('id')).subscribe(tasks => {
      this.tasks = tasks;
      this.pageService.sendMessage('OnChecking', this.tasks);
    });
  }

  setDonePage() {
    this.socketService.getDoneTasks(window.sessionStorage.getItem('id'), '100').subscribe(tasks => {
      this.tasks = tasks;
      this.pageService.sendMessage('Done', this.tasks);
    });
    // this.pageService.sendMessage('Done', this.tasks);
  }

  public onStepChange(event: any): void {
    switch (event.selectedIndex) {
      case 0:
        this.setToDoPage();
        break;
      case 1:
        this.setInProgressPage();
        break;
      case 2:
        this.setOnCheckingPage();
        break;
      case 3:
        this.setDonePage();
        break;
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
