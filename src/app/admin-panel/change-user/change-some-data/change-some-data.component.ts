import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../change-user.component';
import {HttpService} from '../../../http.service';
import {User} from '../../../user';

@Component({
  selector: 'app-change-some-data',
  templateUrl: './change-some-data.component.html',
  styleUrls: ['./change-some-data.component.css']
})
export class ChangeSomeDataComponent implements OnInit {

  user = {
    login: '',
    password: '',
    role: ''
  };

  currentLogin = '';

  roles = [
    'Team-lead',
    'Front-end-Developer',
    'Back-end-Developer',
    'Full-Stack-Developer',
    'QA',
    'Project-Manager',
    'admin',
    'guest'
  ];

  constructor(
    public dialogRef: MatDialogRef<ChangeSomeDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.postGetUser(this.data.login).subscribe( (data: User) => { this.user = data; this.currentLogin = data.login; });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeClick(user: User) {
    this.httpService.postUpdateUser(user, this.currentLogin).subscribe();
  }
}
