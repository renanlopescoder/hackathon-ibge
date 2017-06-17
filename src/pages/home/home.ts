import { Component } from '@angular/core';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public botName: string = 'Alfred';

  private replies: any = {
        text: '',
        number: '',
        option: ''
      };
  private activeReplyField: string;

  private currentQuestion: any;
  public messages: Array<any> = [];

  public isLoading: boolean = true;

  constructor(
    private chatProvider: ChatProvider
    ) {
      this.onStarChat();
  }

  onStarChat() {

    this.chatProvider.startChat().then((res: any) => {
      console.log('res', res);

      this.chatProvider.saveUserId(res.userId);

      this.newQuestion(res);

    }, (err) => {
      console.log('err', err);
    });

  }

  newQuestion(question: any) {
    let t = this;
    setTimeout(function() {
      t.showMessage('bot', question);
      t.showAvailableReply(question);
      t.hideLoader();
      t.currentQuestion = question;
    }, question.delay);
  }

  showLoader() {
    this.isLoading = true;
  }
  hideLoader() {
    this.isLoading = false;
  }

  showAvailableReply(question: any) {
    this.activeReplyField = question.answerFormat;
    switch(this.activeReplyField) {

      case 'text':
      break;

      case 'number':
      break;

      case 'options':
      break;

      default:

    }
  }

  newUserReply() {
    let reply = this.replies[this.activeReplyField];
    console.log('active', this.activeReplyField);
    console.log('replies', this.replies);
    console.log('msg', reply);

    // this.showLoader();
    // this.showMessage('user', reply);
    // this.chatProvider.newUserReply(this.currentQuestion.answerFormat, reply).then((res) => {
    //   this.newQuestion(res);
    // });
  }

  showMessage(user, msg) {
    console.log('message', msg);
    msg.user = user;
    msg.dateTime = new Date().toLocaleTimeString();
    this.messages.push(msg);
    console.log('messages', this.messages);
  }

}