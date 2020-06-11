import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User = {
    login: '',
    password: '',
    role: '',
    name: '',
    surName: '',
    lastName: '',
    birthDate: '',
    city: '',
    about: '',
  };

  changes = true;

  cities = [
    'Kiev',
    'Kharkiv',
    'Lviv',
    'Odessa'
  ];
  date = new FormControl(new Date());

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.postGetAllDataAboutUser(window.sessionStorage.getItem('id')).subscribe( (data: User) => { this.user = data; } );
  }

  doSomeChanges() {
    this.changes = false;
  }

  saveChanges(user: User) {
    this.httpService.postUpdateUserInfo(window.sessionStorage.getItem('id'), user).subscribe( () => this.ngOnInit() );
  }

}
