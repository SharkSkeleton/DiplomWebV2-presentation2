import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../admin-panel/change-user/change-user.component';

@Component({
  selector: 'app-settings-pop',
  templateUrl: './settings-pop.component.html',
  styleUrls: ['./settings-pop.component.css']
})
export class SettingsPopComponent implements OnInit {

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
    public dialogRef: MatDialogRef<SettingsPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
