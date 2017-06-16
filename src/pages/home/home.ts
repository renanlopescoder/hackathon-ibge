import { Component } from '@angular/core';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reply: any;

  constructor(
    private chatProvider: ChatProvider
    ) {

    this.onStarChat();

  }

  onStarChat() {

    this.chatProvider.startChat().then((res: any) => {
      console.log('res', res);
    }, (err) => {
      console.log('err', err);
    });

  }

}
