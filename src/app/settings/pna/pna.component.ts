import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../settings.component';
import {SocketService} from '../../socket.service';

@Component({
  selector: 'app-pna',
  templateUrl: './pna.component.html',
  styleUrls: ['./pna.component.css']
})
export class PnaComponent implements OnInit {

  project = {
    name: '',
    language: '',
    template: '',
    launchFile: '',
    ports: []
  };

  options = {
    myLanguage: ['Java', 'Python', 'Cpp'],
    myTemplate: ['JavaApplication', 'mavenApplication', 'PythonApplication', 'CppApplication']
  };

  selectedLanguage: string;
  selectedTemplate: string;
  selectedPort: string;
  // change = true;
  changeJava = true;
  changePython = true;
  changeCpp = true;
  constructor(
    public dialogRef: MatDialogRef<PnaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private socketService: SocketService) {}

  ngOnInit(): void {
  }

  click() {
    switch (this.project.language) {
      case 'Java': {
        this.changeJava = false;
        this.changePython = true;
        this.changeCpp = true;
        break;
      }
      case 'Python': {
        this.changeJava = true;
        this.changePython = false;
        this.changeCpp = true;
        break;
      }
      case 'Cpp': {
        this.changeJava = true;
        this.changePython = true;
        this.changeCpp = false;
        break;
      }
    }
  }

  addPort() {
    this.project.ports.push(this.selectedPort);
    this.selectedPort = '';
    // console.log(this.project);
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.project = {
      name: '',
      language: '',
      template: '',
      launchFile: '',
      ports: []
    };
  }

  createProject() {
    if (this.selectedPort !== undefined || '' || null) {
      this.project.ports.push(this.selectedPort);
    }
    this.socketService.createNewProject(this.project);
    console.log('Created Project:' + this.project);
    window.location.reload();
  }
}
