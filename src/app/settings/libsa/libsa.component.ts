import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../settings.component';

@Component({
  selector: 'app-libsa',
  templateUrl: './libsa.component.html',
  styleUrls: ['./libsa.component.css']
})
export class LibsaComponent implements OnInit {

  roles = [
    'Team-lead',
    'Front-end-Developer',
    'Back-end-Developer',
    'Full-Stack-Developer',
    'QA',
    'Project-Manager',
  ];
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<LibsaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
