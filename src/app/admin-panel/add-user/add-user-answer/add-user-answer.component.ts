import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../../settings/settings.component';

@Component({
  selector: 'app-add-user-answer',
  templateUrl: './add-user-answer.component.html',
  styleUrls: ['./add-user-answer.component.css']
})
export class AddUserAnswerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUserAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
