import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpService} from './http.service';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { ChatsComponent } from './chats/chats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DocsComponent } from './docs/docs.component';
import { ChecksComponent } from './checks/checks.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { FooterComponent } from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ChatMessagingComponent } from './chats/chat-messaging/chat-messaging.component';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import {MatCardModule} from '@angular/material/card';
import {CodeEditorModule} from '@ngstack/code-editor';
import {MatTabsModule} from '@angular/material/tabs';
import { ClassTreeComponent } from './workspace/class-tree/class-tree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ContentsTreeComponent } from './docs/contents-tree/contents-tree.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddUserComponent } from './admin-panel/add-user/add-user.component';
import { ChangeUserComponent } from './admin-panel/change-user/change-user.component';
import { ChangeSomeDataComponent } from './admin-panel/change-user/change-some-data/change-some-data.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BottomSheetComponent } from './workspace/bottom-sheet/bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { SettingsPopComponent } from './settings/settings-pop/settings-pop.component';
import { PnaComponent } from './settings/pna/pna.component';
import { LibsaComponent } from './settings/libsa/libsa.component';
import { StartaComponent } from './settings/starta/starta.component';
import { CheckPopComponent } from './checks/check-pop/check-pop.component';
import { AdminPanelHeaderComponent } from './admin-panel/admin-panel-header/admin-panel-header.component';
import { AddUserAnswerComponent } from './admin-panel/add-user/add-user-answer/add-user-answer.component';
import {SocketService} from './socket.service';
import {SocketWorkSpace} from './socket-work-space.service';
import {PostWorkspaceService} from './post-workspace.service';

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    HomeComponent,
    HeaderComponent,
    ChatsComponent,
    DashboardComponent,
    WorkspaceComponent,
    DocsComponent,
    ChecksComponent,
    AccountComponent,
    SettingsComponent,
    FooterComponent,
    ChatMessagingComponent,
    TasksComponent,
    ClassTreeComponent,
    ContentsTreeComponent,
    AdminPanelComponent,
    AddUserComponent,
    ChangeUserComponent,
    ChangeSomeDataComponent,
    BottomSheetComponent,
    SettingsPopComponent,
    PnaComponent,
    LibsaComponent,
    StartaComponent,
    CheckPopComponent,
    AdminPanelHeaderComponent,
    AddUserAnswerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    CodeEditorModule,
    MatTabsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],

  providers: [HttpService, MatDatepickerModule, MatBottomSheet, SocketService, SocketWorkSpace, PostWorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
