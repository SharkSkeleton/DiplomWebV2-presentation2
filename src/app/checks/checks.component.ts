import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ChangeSomeDataComponent} from '../admin-panel/change-user/change-some-data/change-some-data.component';
import {CheckPopComponent} from './check-pop/check-pop.component';

export interface Section {
  project: string;
}

export interface DialogData {
  project: string;
}

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  project: string;

  tasks: Section[] = [
    {project: 'Task#777'},
    {project: 'Tasks'}
  ];
  // projects: Section[] = [
  //   {
  //     project: 'ProjectToWriteUpdateSed'
  //   },
  // ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckPopComponent, {
      height: '100%',
      width: '100%',
      data: {name: this.project}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.project = result;
    });
  }

}
