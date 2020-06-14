import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent {

  texts = {
    chapter_home_page: {
      title: 'In this chapter you can read about home page..',
      subTitle: 'This chapter consists of such sections:',
      links: ['Header description', 'Content description', 'Footer description'],
      // tslint:disable-next-line:max-line-length
      text: ['In these chapters you can learn more about the description of the home page, as well as the top menu and the bottom inscription.'],
      header: {
        title: 'Header description',
        text: ['In the top menu you can find the following buttons: CSG, Chat, Dashboard and Workspace, menu and field.',
          'The menu is responsible for providing additional features to the user by listing links to the corresponding pages.',
          'The search box is still a decorative element.',
          'The CSG button is responsible for switching to the main page.',
          'The Chat button is responsible for switching to the chat page.',
          'The Dashboard button is responsible for navigating to the task page.',
          'The Workspace button is responsible for navigating to the page with the code editor.',
          'Buttons for changing the palette and changing the language are still decorative.']
      },
      content: {
        title: 'Content description',
        text: ['On the home page, you can view screenshots of all the pages existing on the site and read a short description about them.',
        'All these screenshots with descriptions are valid links to the corresponding pages, so they are clickable.']
      },
      footer: {
        title: 'Footer description',
        text: []
      }
    }
  };
  value = '';
  currentText = {
    title: 'Please, choose any chapter',
    subTitle: '',
    text: [],
    links: []
  };
  constructor() { }

  clearCurrentText() {
    this.currentText = {
      title: 'Please, choose any chapter',
      subTitle: '',
      text: [],
      links: []
    };
  }

  pickedSomeData(data: any) {
    console.log(data);
    switch (data) {
      case 'Home page': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_home_page.title;
        this.currentText.subTitle = this.texts.chapter_home_page.subTitle;
        this.currentText.links = this.texts.chapter_home_page.links;
        this.currentText.text = this.texts.chapter_home_page.text;
        break;
      }
      case 'Header description': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_home_page.header.title;
        this.currentText.text = this.texts.chapter_home_page.header.text;
        break;
      }
      case 'Content description': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_home_page.content.title;
        this.currentText.text = this.texts.chapter_home_page.content.text;
        break;
      }
      case 'Footer description': {
        this.clearCurrentText();
        break;
      }
      case 'Chats page': {
        this.clearCurrentText();
        break;
      }
      case 'Chats list description': {
        this.clearCurrentText();
        break;
      }
      case 'Chats content': {
        this.clearCurrentText();
        break;
      }
      case 'Dashboard page': {
        this.clearCurrentText();
        break;
      }
      case 'TODO': {
        this.clearCurrentText();
        break;
      }
      case 'In Progress': {
        this.clearCurrentText();
        break;
      }
      case 'On Checking': {
        this.clearCurrentText();
        break;
      }
      case 'Done': {
        this.clearCurrentText();
        break;
      }
      case 'Work space page': {
        this.clearCurrentText();
        break;
      }
      case 'Class Tree about': {
        this.clearCurrentText();
        break;
      }
      case 'Editor about': {
        this.clearCurrentText();
        break;
      }
      case 'Editor menu about': {
        this.clearCurrentText();
        break;
      }
      case 'Burger menu': {
        this.clearCurrentText();
        break;
      }
      case 'Docs': {
        this.clearCurrentText();
        break;
      }
      case 'Tree about': {
        this.clearCurrentText();
        break;
      }
      case 'Content about ': {
        this.clearCurrentText();
        break;
      }
      case 'Checks': {
        this.clearCurrentText();
        break;
      }
      case 'Check list about': {
        this.clearCurrentText();
        break;
      }
      case 'Element content about': {
        this.clearCurrentText();
        break;
      }
      case 'Account': {
        this.clearCurrentText();
        break;
      }
      case 'Fields about': {
        this.clearCurrentText();
        break;
      }
      case 'Changing & Saving data': {
        this.clearCurrentText();
        break;
      }
      case 'Settings': {
        this.clearCurrentText();
        break;
      }
      case 'Choose project about': {
        this.clearCurrentText();
        break;
      }
      case 'Create project about': {
        this.clearCurrentText();
        break;
      }
      case 'Create tasks about': {
        this.clearCurrentText();
        break;
      }

    }

  }

}
