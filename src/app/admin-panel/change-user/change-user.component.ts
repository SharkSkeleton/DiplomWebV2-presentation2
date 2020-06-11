import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChangeSomeDataComponent} from './change-some-data/change-some-data.component';
import {HttpService} from '../../http.service';

export interface Section {
  login: string;
}

export interface DialogData {
  login: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})


export class ChangeUserComponent implements OnInit {

  login: string;
  password: string;
  role: string;

  users: Section[];
  constructor(public dialog: MatDialog, private httpService: HttpService) { }


  ngOnInit(): void {
    this.submit();
  }

  submit() {
    // console.log(user);
    this.httpService.postGetAllUsers()
      .subscribe(
        (data: Section[]) => this.users = data);
    // console.log('Spec');
  }

  openDialog(user: string): void {
    // this.httpService.postGetUser(user).subscribe( (data: DialogData) => { sendUser = data; });
    const dialogRef = this.dialog.open(ChangeSomeDataComponent, {
      width: '16em',
      data: { login: user }
    });

    dialogRef.afterClosed().subscribe( () => this.submit()
      // this.login = result;
    );
  }

  deleteUser(user: string) {
    this.httpService.postDeleteUser(user).subscribe( () => { this.submit(); } );
  }

}
