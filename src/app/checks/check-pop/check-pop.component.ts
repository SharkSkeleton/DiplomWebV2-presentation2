import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../checks.component';

@Component({
  selector: 'app-check-pop',
  templateUrl: './check-pop.component.html',
  styleUrls: ['./check-pop.component.css']
})
export class CheckPopComponent implements OnInit {

  text1 = 'public class Main {\n' +
    'public static void main(String[] args) {\n' +
    'System.out.println(Hello World!);\n' +
    '}\n' +
    '}';
  text2 = 'public class Main {\n' +
    '@lombok.SneakyThrows\n' +
    'public static void main(String[] args) {\n' +
    'String url = "http://www.google.com/";\n' +
    '\n' +
    'URL obj = new URL(url);\n' +
    'HttpURLConnection connection = (HttpURLConnection) obj.openConnection();\n' +
    '\n' +
    'connection.setRequestMethod("GET");\n' +
    '\n' +
    'BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n' +
    'String inputLine;\n' +
    'StringBuffer response = new StringBuffer();\n' +
    '\n' +
    'while ((inputLine = in.readLine()) != null) {\n' +
    'response.append(inputLine);\n' +
    '}\n' +
    'in.close();\n' +
    '\n' +
    'System.out.println(response.toString());\n' +
    '}\n' +
    '}';


  files = [
    'Main.java',
  ];
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<CheckPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
