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
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

}
