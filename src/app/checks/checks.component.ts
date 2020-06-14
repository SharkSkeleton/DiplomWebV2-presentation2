import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ChangeSomeDataComponent} from '../admin-panel/change-user/change-some-data/change-some-data.component';
import {CheckPopComponent} from './check-pop/check-pop.component';
import {SocketService} from '../socket.service';

export interface Section {
  taskName: string;
  taskDescription: string;
  taskExecutor: string;
}

export interface DialogData {
  pId: string;
  task: [ {
    title: string,
    description: string,
    executor: string
  }];
}

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit, OnDestroy {

  project: string;

  subArr = {
    pId: '',
    tasks: [
      {
        title: '',
        description: '',
        executor: '',
      }
    ]
  };

  sendData = {
    pId: '',
    task: {
      title: '',
      description: '',
      executor: ''
    }
  };
  // projects: Section[] = [
  //   {
  //     project: 'ProjectToWriteUpdateSed'
  //   },
  // ];

  constructor(public dialog: MatDialog, private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.userGetAllOnCheckingTasks(window.sessionStorage.getItem('id')).subscribe((data) => {
      this.subArr = data;
    });
  }

  openDialog(task): void {
    this.sendData.pId = this.subArr.pId;
    this.sendData.task.title = task.title;
    this.sendData.task.description = task.description;
    this.sendData.task.executor = task.executor;
    const dialogRef = this.dialog.open(CheckPopComponent, {
      height: '100%',
      width: '100%',
      data: this.sendData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.project = result;
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
