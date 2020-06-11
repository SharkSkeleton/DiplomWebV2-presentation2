import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PnaComponent} from './pna/pna.component';
import {StartaComponent} from './starta/starta.component';
import {SocketService} from '../socket.service';
import {HttpService} from '../http.service';

export interface DialogData {
  login: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  projects = {
    ids: [],
    names: [],
    languages: [],
    templates: [],
    paths: []
  };

  project = [];
  names: [];
  // projects = [
  //   'Project1',
  //   'Project2',
  //   'Project3',
  //   'Project4',
  // ];

  files = [];
  fileNames = [];

  cP = {
    id: '',
    launchFile: '',
    changes: '',
  };

  login: string;
  password: string;
  role: string;
  index: number;
  currentPath = '';
  currentTemplate = '';
  currentLanguage = '';
  subArr = [];
  constructor(public dialog: MatDialog, private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getAllProjects().subscribe(data => {
      data.forEach(element => {
        if (element !== undefined || element !== '') {
          this.projects.ids.push(element._id);
          this.projects.names.push(element.name);
          this.projects.languages.push(element.language);
          this.projects.templates.push(element.template);
          this.projects.paths.push(element.path);
        }
      });
      // this.project = data;
      // this.project.forEach(e => {
      //   this.projects.names.push(e.name);
      //   this.projects.ids.push(e.id);
      //   this.projects.languages.push(e.language);
      //   this.projects.templates.push(e.template);
      //   this.projects.paths.push(e.path);
      // });
      // console.log(this.project);
      // if (this.project !== null) {
      //   // tslint:disable-next-line:prefer-for-of
      //   for (let i = 0; i < this.project.length; i++) {
      //     console.log(this.project[i]);
      //     this.projects.names.push(this.project[i].name);
      //   }
      // }
    });
  }

  openPna(): void {
    const dialogRef = this.dialog.open(PnaComponent, {
      width: '300px',
      data: {name: this.login, animal: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.login = result;
    });
  }

  openStarta(): void {
    const dialogRef = this.dialog.open(StartaComponent, {
      width: '300px',
      data: {name: this.login, animal: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.login = result;
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  option(projectName) {
    // console.log(projectName);
    this.files = [];
    this.index = this.projects.names.indexOf(projectName);
    this.fileNames = this.files[this.index];
    // console.log(this.projects.names);
    this.currentLanguage = this.projects.languages[this.index];
    this.currentTemplate = this.projects.templates[this.index];
    this.currentPath = this.projects.paths[this.index];
    // const self = this;
    this.socketService.getAllProjectFiles(this.currentPath).subscribe(data => {
      this.files = data;
    });
    console.log(this.files);
    // this.files.forEach(el => {
    //   if (el.indexOf('/') !== -1) {
    //     this.subArr = el.split('/');
    //     this.fileNames.push(this.subArr[this.subArr.length - 1]);
    //   }
    // });
    // if (str.indexOf("/") !== -1) {
    // 	let sArr = str.split("/");
    // 	arr.push(sArr[sArr.length-1]);
    // } else {
    // 	arr.push(str);
    // }
    // this.fileNames = this.files.
  }

  saveBtn() {
    // this.cP = {
    //   id: this.projects.ids,
    // };
    console.log(this.files);
  }
}
