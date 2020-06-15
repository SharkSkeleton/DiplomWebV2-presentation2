import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postAuthenticationData(user: User) {
    const body = { login: user.login, password: user.password };
    return this.http.post('http://localhost:3000/entry-form/', body);
  }

  postAddedUser(user: User) {
    const body = { login: user.login, password: user.password, role: user.role, projects: user.projects,
      currentProject: user.currentProject, tasks: user.tasks, commonTasks: user.commonTasks, surName: user.surName,
    lastName: user.lastName, birthDate: user.birthDate, city: user.city, about: user.about, picture: user.picture};
    return this.http.post('http://localhost:3000/admin-panel/add-user/', body);
  }

  postGetUser(user: string) {
    const body = { login: user };
    return this.http.post('http://localhost:3000/admin-panel/get-user/', body);
  }

  postGetAllUsers() {
    return this.http.post('http://localhost:3000/admin-panel/get-users/', 'msg');
  }

  postDeleteUser(user: string) {
    const body = { login: user };
    return this.http.post('http://localhost:3000/admin-panel/delete-user/', body);
  }

  postUpdateUser(user: User, currentLogin: string) {
    // tslint:disable-next-line:max-line-length
    const body = { currentUserLogin: currentLogin, login: user.login, password: user.password, role: user.role };
    return this.http.post('http://localhost:3000/admin-panel/update-user/', body);
  }

  postUpdateUserInfo(userId: string, user: User) {
    // tslint:disable-next-line:max-line-length
    const body = { id: userId, name: user.name, lastName: user.lastName, surName: user.surName, birthDate: user.birthDate, city: user.city, about: user.about };
    return this.http.post('http://localhost:3000/account/update/', body);
  }

  postGetAllDataAboutUser(userId: string) {
    // tslint:disable-next-line:max-line-length
    const body = { id: userId };
    return this.http.post('http://localhost:3000/account/', body);
  }


  postAddedTask(task: Task) {
    const body = { userTask: task };
    return this.http.post('http://localhost:3000/settings/add-task/', body);
  }

  postGetAllTasks() {
    return this.http.post('http://localhost:3000/dashboard/todo/', 'msg');
  }

  postGetAllTasksInProgress(userLogin: string) {
    const body = { executor: userLogin };
    return this.http.post('http://localhost:3000/dashboard/inProgress/', body);
  }

  postUpdateTaskInProgress(task: Task) {
    const body = { userTask: task };
    return this.http.post('http://localhost:3000/dashboard/in-progress/', body);
  }

  postGetAllFilesOFProject(path) {
    const body = { projectPath: path };
    return this.http.post('http://localhost:3000/settings/', body);
  }

  postSetProject(uId: string) {
    const body = { id: uId };
    return this.http.post('http://localhost:3000/work-space/', body);
  }

  postOpenFile(uId: string, fileName: string) {
    const body = { id: uId, fName: fileName };
    return this.http.post('http://localhost:3000/work-space/data', body);
  }

  postGetProject(uId: string) {
    const body = { id: uId };
    return this.http.post('http://localhost:3000/work-space/user-get', body);
  }

  postGetOnCheckingTask(pId: string, task) {
    const body = {id: pId, myTask: task};
    return this.http.post('http://localhost:3000/on-checking/get', body);
  }

  postSetTaskMark(mark: string, task) {
    const body = {myMark: mark, myTask: task};
    return this.http.post('http://localhost:3000/on-checking/set-mark', body);
  }

  postGetAllTasksNames() {
    return this.http.post('http://localhost:3000/settings/get-all-task-names', 'msg');
  }

  postUserChanges(myId: string, data: string) {
    const body = { userId: myId, content: data };
    return this.http.post('http://localhost:3000/work-space/changes', body);
  }

  postGetProjectName(myId: string) {
    const body = { pId: myId};
    return this.http.post('http://localhost:3000/work-space/console/get-project-name', body);
  }
}
