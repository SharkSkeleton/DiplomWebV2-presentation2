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
        text: ['Here, you can see some data about developers of this system.']
      }
    },
    chapter_chats_page: {
      title: 'In this chapter you can read about chat page..',
      subTitle: 'This chapter consists of such sections:',
      links: ['Chats list description', 'Chats content'],
      // tslint:disable-next-line:max-line-length
      text: ['In these chapters you can learn more about the description of the chat page, as well as the chat list  and dialog  area.'],
      chats_list_description: {
        title: 'Chats list description description',
        text: ['List of user`s chats']
      },
      chats_content: {
        title: 'Chats content',
        text: ['Allows to see users messages in this chat']
      },
    },
    chapter_dashboard_page: {
      title: 'In this chapter you can read about dashboard page..',
      subTitle: 'This chapter consists of such sections:',
      links: ['TODO', 'In Progress', 'On Checking', 'Done'],
      // tslint:disable-next-line:max-line-length
      text: ['In these chapters you can learn more about the description of the chat page, as well as the chat list  and dialog  area.'],
      todo: {
        title: 'TODO description',
        text: ['In this page you can find  the all tasks which can you pick to solve.',
          'Each task have author ,title and explanation which problem developer must solve',
          'User can delete task or get.']
      },
      in_progress: {
        title: 'In progress description',
        text: ['Shows all current user Task.',
          'Solved Task user can send to check']
      },
      on_checking: {
        title: 'On checking description',
        text: ['tasks solved by the user that are awaiting checkup']
      },
      done: {
        title: 'Done description',
        text: ['Tasks solved by a user who have already passed the test']
      },
    },
    chapter_work_space_page: {
      title: 'In this chapter you can read about workspace page..',
      subTitle: 'This chapter consists of such sections:',
      links: ['Class Tree about', 'Editor about', 'Editor menu about'],
      // tslint:disable-next-line:max-line-length
      text: ['In these chapters you can learn more about the description of the chat page, as well as the chat list  and dialog  area.'],
      class_tree_about: {
        title: 'Class Tree  description',
        text: ['Class Tree  represent project files.']
      },
      editor_about: {
        title: 'Editor_about description',
        text: ['Here you can write your own code and run it.']
      },
      editor_menu_about: {
        title: 'Editor_menu_about description',
        text: ['Panel with buttons which send your code to server.']
      }
    },
    chapter_burger_menu_page: {
      title: 'In this chapter you can read about workspace page..',
      subTitle: 'This chapter consists of such sections:',
      links: ['Docs', 'Checks', 'Account', 'Settings'],
      // tslint:disable-next-line:max-line-length
      text: ['In these chapters you can learn more about the description of the chat page, as well as the chat list  and dialog  area.'],
      docs: {
        title: 'Docs description',
        text: ['Here you can read some info about system.'],
        links: ['Tree about', 'Content about'],
        tree_about: {
          title: 'Tree description',
          text: ['It`s tree with chapters.'],
        },
        content_about: {
          title: 'Content_about description',
          text: ['It`s some useful info.'],
        },
      },
      checks: {
        title: 'Checks description',
        text: ['Here you can check tasks and set them some mark.'],
        links: ['Check list about', 'Element content about'],
        check_list_about: {
          title: 'Check_list_about description',
          text: ['Check all tasks that has status: OnChecking.'],
        },
        element_content_about: {
          title: 'Element content about description',
          text: ['Read code and set up  your mark.'],
        },
      },
      account: {
        title: 'Account description',
        text: ['Place where you can edit info.'],
        links: ['Fields about', 'Changing & Saving data'],
        fields_about: {
          title: 'Fields about description',
          text: ['Fields for your personal info.'],
        },
        changing_and_Saving_data: {
          title: 'Changing & Saving data about description',
          text: ['You can add some data py pushing Change after what write down your data and push Save to save it.'],
        },
      },
      settings: {
        title: 'Settings description',
        text: ['Place where you can create task or project or just choose the last one.'],
        links: ['Choose project about', 'Create project about', 'Create tasks about'],
        choose_project_about: {
          title: 'Choose project  about description',
          text: ['Choose project from list of existing projects.'],
        },
        create_project_about: {
          title: 'Create project about description',
          text: ['Here you can set up some data about your project.'],
        },
        create_task_about: {
          title: 'Create tasks about description',
          text: ['Here you can write down some info about task which you want to create.'],
        },
      }
    },
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
        this.currentText.title = this.texts.chapter_home_page.footer.title;
        this.currentText.text = this.texts.chapter_home_page.footer.text;
        break;
      }
      case 'Chats page': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_chats_page.title;
        this.currentText.subTitle = this.texts.chapter_chats_page.subTitle;
        this.currentText.links = this.texts.chapter_chats_page.links;
        this.currentText.text = this.texts.chapter_chats_page.text;
        break;
      }
      case 'Chats list description': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_chats_page.chats_list_description.title;
        this.currentText.text = this.texts.chapter_chats_page.chats_list_description.text;
        break;
      }
      case 'Chats content': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_chats_page.chats_content.title;
        this.currentText.text = this.texts.chapter_chats_page.chats_content.text;
        break;
      }
      case 'Dashboard page': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_dashboard_page.title;
        this.currentText.subTitle = this.texts.chapter_dashboard_page.subTitle;
        this.currentText.links = this.texts.chapter_dashboard_page.links;
        this.currentText.text = this.texts.chapter_dashboard_page.text;
        break;
      }
      case 'TODO': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_dashboard_page.todo.title;
        this.currentText.text = this.texts.chapter_dashboard_page.todo.text;
        break;
      }
      case 'In Progress': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_dashboard_page.in_progress.title;
        this.currentText.text = this.texts.chapter_dashboard_page.in_progress.text;
        break;
      }
      case 'On Checking': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_dashboard_page.on_checking.title;
        this.currentText.text = this.texts.chapter_dashboard_page.on_checking.text;
        break;
      }
      case 'Done': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_dashboard_page.done.title;
        this.currentText.text = this.texts.chapter_dashboard_page.done.text;
        break;
      }
      case 'Work space page': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_work_space_page.title;
        this.currentText.subTitle = this.texts.chapter_work_space_page.subTitle;
        this.currentText.links = this.texts.chapter_work_space_page.links;
        this.currentText.text = this.texts.chapter_work_space_page.text;
        break;
      }
      case 'Class Tree about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_work_space_page.class_tree_about.title;
        this.currentText.text = this.texts.chapter_work_space_page.class_tree_about.text;
        break;
      }
      case 'Editor about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_work_space_page.editor_about.title;
        this.currentText.text = this.texts.chapter_work_space_page.editor_about.text;
        break;
      }
      case 'Editor menu about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_work_space_page.editor_menu_about.title;
        this.currentText.text = this.texts.chapter_work_space_page.editor_menu_about.text;
        break;
      }
      case 'Burger menu': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.title;
        this.currentText.subTitle = this.texts.chapter_burger_menu_page.subTitle;
        this.currentText.links = this.texts.chapter_burger_menu_page.links;
        this.currentText.text = this.texts.chapter_burger_menu_page.text;
        break;
      }
      case 'Docs': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.docs.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.docs.text;
        this.currentText.links = this.texts.chapter_chats_page.links;
        break;
      }
      case 'Tree about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.docs.tree_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.docs.tree_about.text;
        break;
      }
      case 'Content about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.docs.content_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.docs.content_about.text;
        break;
      }
      case 'Checks': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.checks.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.checks.text;
        this.currentText.links = this.texts.chapter_burger_menu_page.checks.links;
        break;
      }
      case 'Check list about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.checks.check_list_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.checks.check_list_about.text;
        break;
      }
      case 'Element content about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.checks.element_content_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.checks.element_content_about.text;
        break;
      }
      case 'Account': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.account.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.account.text;
        this.currentText.links = this.texts.chapter_burger_menu_page.account.links;
        break;
      }
      case 'Fields about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.account.fields_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.account.fields_about.text;
        break;
      }
      case 'Changing & Saving data': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.account.changing_and_Saving_data.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.account.changing_and_Saving_data.text;
        break;
      }
      case 'Settings': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.settings.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.settings.text;
        this.currentText.links = this.texts.chapter_burger_menu_page.settings.links;
        break;
      }
      case 'Choose project about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.settings.choose_project_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.settings.choose_project_about.text;
        break;
      }
      case 'Create project about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.settings.create_project_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.settings.create_project_about.text;
        break;
      }
      case 'Create tasks about': {
        this.clearCurrentText();
        this.currentText.title = this.texts.chapter_burger_menu_page.settings.create_task_about.title;
        this.currentText.text = this.texts.chapter_burger_menu_page.settings.create_task_about.text;
        break;
      }

    }

  }

}
