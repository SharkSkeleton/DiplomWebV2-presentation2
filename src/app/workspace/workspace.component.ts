import {Component, OnDestroy, OnInit} from '@angular/core';
import {CodeModel} from '@ngstack/code-editor';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {SocketWorkSpace} from '../socket-work-space.service';
import {PostWorkspaceService} from '../post-workspace.service';
import {User} from '../user';
import {PageService} from '../page.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  good = false;
  code = '';
  consoleData;
  myGOODData = {};
  // tslint:disable-next-line:variable-name
  constructor(private _bottomSheet: MatBottomSheet, private socketService: SocketWorkSpace,
              private myHttpService: HttpService, private httpService: PostWorkspaceService, private pageService: PageService) {
  }


  // theme = 'vs-light';

  // content: string = 'public class Main {\n' +
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
  // //   '}';
  // content: string = 'public class Main {\n' +
  //   '\tpublic static void main(String[] args) {\n' +
  //   '\t\tSystem.out.println("Hello World!");\n' +
  //   '\t}\n' +
  //   '}';

  // content: string;
  //
  // codeModel: CodeModel = {
  //   language: 'java',
  //   uri: '',
  //   value: this.content,
  // };
  //
  // options = {
  //   contextmenu: true,
  //   minimap: {
  //     enabled: true,
  //   },
  // };

  ngOnInit(): void {
    this.myHttpService.postSetProject(window.sessionStorage.getItem('id')).subscribe(data => {
      // this.myGOODData = data;
      this.pageService.sendTreeData(data);
      // console.log('Input new data:', this.myGOODData);
    });
  }

  saveData(data) {
    console.log(data);
  }

  openBottomSheet(): void {
    let obj;
    this.myHttpService.postGetProject(window.sessionStorage.getItem('id')).subscribe(data => {
      obj = data;
      this.httpService.postSend(obj.id, obj.login).subscribe(
        (resultData) => { console.log(resultData);  },
        error => console.log(error)
      );
    });
    // this.socketService.sendMessage('5ed74eaa045af72d943c6a5e', 'Sasha').subscribe(data =>
    // console.log(data));
    // this._bottomSheet.open(BottomSheetComponent);
  }
  // this.socketService.connect();

  public doSomething(date: any) {
    this.good = !this.good;
    this.code = date;
    // console.log(`1. ${this.codeModel.value}`);
    // this.content = date;
    // console.log(`2. ${this.codeModel.value}`);
  }

  some() {
    alert('SSS');
    // this.codeModel.value = this.content;
  }

  ngOnDestroy(): void {
    // this.pageService.sendTreeData({});
  }

}
