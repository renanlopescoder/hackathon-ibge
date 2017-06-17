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
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
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

  newUserReply(aswerFormat, reply) {
    return new Promise((resolve, reject) => {

      let data = [
        `aswerFormat:${aswerFormat}`,
        `reply:${reply}`
      ];

      this.setHeaders();
      this.http.post(`${Config.postNewReply}`, data.join('&'), {
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

  

}
