import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../user';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {

  constructor(private httpService: HttpService, private router: Router) {}

  hide = true;
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  user = new User();
  role = '';
  routerLink = '';

  getErrorMessage() {
    if (this.login.hasError('required')) {
      return 'Enter your login!';
    }
  }

  getPassErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Enter your password!';
    }
  }

  some = (data) => {
    this.role = data.role;
    window.sessionStorage.setItem('id', data.id);
    data.role === 'admin' ? this.router.navigate(['/admin']) : this.router.navigate(['home']);
  }

  submit(user: User) {
    // console.log(user);
    this.httpService.postAuthenticationData(user)
      .subscribe(
        (data: User) => { this.some(data); },
        error => console.log(error)
      );
    // console.log('Spec');
  }

  testBtn() {
    this.role = 'guest';
    window.sessionStorage.setItem('id', 'guest');
  }

}


// this.role = data.role; data.role === 'admin' ? this.routerLink = '/admin' : this.routerLink = '/home';
