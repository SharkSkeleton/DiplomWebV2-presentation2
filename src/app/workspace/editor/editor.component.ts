import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {Content} from './content';
import {PageService} from '../../page.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Input() data;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  theme = 'vs-light';
  // content = 'Hello';
  codeModel: CodeModel = {
    language: 'java',
    uri: '',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor() {
    // this.pageService.getMessage().subscribe(data => {
    //   if (data !== null) {
    //     console.log(data);
    //     this.codeModel.value = data.myData;
    //   }
    // });
  }

  ngOnInit(): void {
    this.codeModel.value = this.data;
  }

  sendNewCodeData() {
    this.onDatePicked.emit(`${this.codeModel.value}`);
  }

}
