import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostWorkspaceService {

  constructor(private http: HttpClient) { }

  postSend(pId: string, uLogin: string) {
    const body = { projectId: pId, userLogin: uLogin };
    return this.http.post('http://localhost:8080/project/execute/', body);
  }
}
