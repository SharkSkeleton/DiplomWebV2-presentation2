import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SocketWorkSpace} from '../../socket-work-space.service';
import {PageService} from '../../page.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit, OnDestroy {

  result = '';

  // tslint:disable-next-line:variable-name
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, private socketService: SocketWorkSpace, private pageService: PageService) {
  }

  ngOnInit(): void {
    // this.socketService.getTasks().subscribe(
    //   data => {
    //     console.log(data);
    //     this.result = data;
    //   }
    // );
    // Open connection with server socket
    const stompClient = this.socketService.connect();

    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      stompClient.subscribe('/hellopython_admin', notifications => {

        // Update notifications attribute with the recent messsage sent from the server
        this.result += notifications.body;
        console.log(notifications);
      });
      stompClient.send('/hellopython_admin/input', {}, 'aaaaa');
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnDestroy() {
  }

}
