import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../app/config';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  private headers: Headers;

  constructor(public http: Http) { }

  setHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  startChat() {
    return new Promise((resolve, reject) => {
      this.setHeaders();
      this.http.post(`${Config.postStartChat}`, {}, {
        headers: this.headers
      }).subscribe((res: any) => {
        let json = res.json();
        resolve(json);
      }, (err) => {
        reject(err);
      })
    });
  }

  newUserReply(reply: any) {
    return new Promise((resolve, reject) => {

      let data = {
        userId: reply.userId,
        questionId: reply.questionId,
        message: reply.message
      }

      // let data = [
      //   `userId=${reply.userId}`,
      //   `questionId=${reply.questionId}`,
      //   `reply=${reply.message}`
      // ];

      this.setHeaders();
      this.http.post(`${Config.postNewReply}`, data, {
        headers: this.headers
      }).subscribe((res:any) => {
        let json = res.json();
        resolve(json);
      }, (err) => {
        reject(err);
      })
    })
  }

  saveUserId(userId: number) {
    localStorage.setItem('alfredUserId', JSON.stringify(userId));
  }

  getUserId() {
    return new Promise((resolve) => {
      let userId = JSON.parse(localStorage.getItem('alfredUserId'));
      resolve(userId);
    });
  }

  saveUserName(userName: string) {
    localStorage.setItem('alfredUserName', JSON.stringify(userName));
  }

  getUserName() {
    return new Promise((resolve, reject) => {
      let json = localStorage.getItem('alfredUserName');
      if (json) {
        let userName = JSON.parse(json);
        resolve(userName);
      } else {
        reject(false);
      }
    });
  }
  

}
