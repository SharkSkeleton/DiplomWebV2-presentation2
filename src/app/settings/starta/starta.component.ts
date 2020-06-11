import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../settings.component';
import {HttpService} from '../../http.service';
import {User} from '../../user';
import {Task} from '../../task';

@Component({
  selector: 'app-starta',
  templateUrl: './starta.component.html',
  styleUrls: ['./starta.component.css']
})
export class StartaComponent implements OnInit {

  user = {
    login: '',
    password: '',
    role: ''
  };

  task: Task = {
    title: '',
    description: '',
    status: '',
    author: '',
    authorRole: '',
    executor: '',
  };

  ngOnInit(): void {
    this.httpService.postGetAllDataAboutUser(window.sessionStorage.getItem('id')).subscribe( (data: User) => { this.user = data; } );
  }

  constructor(
    public dialogRef: MatDialogRef<StartaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private httpService: HttpService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(task: Task) {
    task.status = 'created';
    task.author = this.user.login;
    task.authorRole = this.user.role;
    this.httpService.postAddedTask(task).subscribe();
    this.dialogRef.close();
  }
}
