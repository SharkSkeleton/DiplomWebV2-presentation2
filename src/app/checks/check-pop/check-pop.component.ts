import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../checks.component';
import {HttpService} from '../../http.service';

export interface FilesData {
  oldData: [];
  newData: [];
  files: string[];
}

@Component({
  selector: 'app-check-pop',
  templateUrl: './check-pop.component.html',
  styleUrls: ['./check-pop.component.css']
})
export class CheckPopComponent implements OnInit {

  // oldData = 'public class Main {\n' +
  //   'public static void main(String[] args) {\n' +
  //   'System.out.println(Hello World!);\n' +
  //   '}\n' +
  //   '}';
  // newData = 'public class Main {\n' +
  //   '@lombok.SneakyThrows\n' +
  //   'public static void main(String[] args) {\n' +
  //   'String url = "http://www.google.com/";\n' +
  //   '\n' +
  //   'URL obj = new URL(url);\n' +
  //   'HttpURLConnection connection = (HttpURLConnection) obj.openConnection();\n' +
  //   '\n' +
  //   'connection.setRequestMethod("GET");\n' +
  //   '\n' +
  //   'BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n' +
  //   'String inputLine;\n' +
  //   'StringBuffer response = new StringBuffer();\n' +
  //   '\n' +
  //   'while ((inputLine = in.readLine()) != null) {\n' +
  //   'response.append(inputLine);\n' +
  //   '}\n' +
  //   'in.close();\n' +
  //   '\n' +
  //   'System.out.println(response.toString());\n' +
  //   '}\n' +
  //   '}';

  // files = [
  //   'Main.java',
  // ];

  taskMark: string;
  oldData;
  newData;

  myData: FilesData = {
    oldData: [],
    newData: [],
    files: []
  };

  task = [{
    title: '',
    description: '',
    executor: '',
  }];
  currentTitle = [];
  constructor(
    public dialogRef: MatDialogRef<CheckPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private httpService: HttpService) {}

  ngOnInit(): void {
    this.task = this.data.task;
    this.currentTitle.push(Object.values(this.task));
    this.currentTitle = this.currentTitle.join(',').split(',');
    this.httpService.postGetOnCheckingTask(this.data.pId, this.data.task).subscribe((data: FilesData) => {
      this.myData = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  chooseFile(fileName) {
    const index = this.myData.files.indexOf(fileName);
    this.oldData = Object.values(this.myData.oldData[index]);
    this.newData = Object.values(this.myData.newData[index]);
  }

  approve(mark) {
    if (mark >= 0 && mark <= 10) {
      this.httpService.postSetTaskMark(mark, this.task).subscribe();
      this.dialogRef.close();
    } else {
      alert('Bad Number!');
    }
  }

}
