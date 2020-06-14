import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {HttpService} from '../../http.service';
import {AddUserAnswerComponent} from './add-user-answer/add-user-answer.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

export interface AddedUserData {
  login: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  roles = [
    'Team-lead',
    'Front-end-Developer',
    'Back-end-Developer',
    'Full-Stack-Developer',
    'QA',
    'Project-Manager',
  ];

  user = new User();
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  receivedUser = new User();

  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getErrMsg(data, msg) {
    if (data.hasError('required')) {
      return msg;
    }
  }

  openAnswer(): void {
    const dialogRef = this.dialog.open(AddUserAnswerComponent, {
      width: '300px',
      data: {login: this.user.login, password: this.user.password, role: this.user.role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.login = result;
    });
  }

  submit(user: User) {
    if (user.login !== undefined && user.password !== undefined && user.role !== undefined) {
      this.httpService.postAddedUser(user)
        .subscribe(
          // tslint:disable-next-line:max-line-length
          (data: User) => {
            if (data.errMsg !== 'Existing user') {
              this.receivedUser.login = data.login;
              this.receivedUser.password = data.password;
              this.receivedUser.role = data.role;
              this.openAnswer();
            } else {
              alert('User with this login is already exist');
            }
          },
          error => console.log(error)
        );
      this.user.login = '';
      this.user.password = '';
      this.user.role = '';
    } else {
      alert('You must enter all values!');
    }
  }

}
