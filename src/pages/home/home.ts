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

      this.chatProvider.saveUserId(res.userId);
      this.newQuestion(res);

    }, (err) => {
      console.log('err', err);
    });

  }

  newQuestion(questionObj) {
    // let t = this;

    if (questionObj.comment != "") {

      // setTimeout(() => {
        this.showMessage('bot', questionObj, questionObj.comment).then(() => {
        // setTimeout(() => {
          this.showMessage('bot', questionObj, questionObj.question);
          this.showAvailableReply(questionObj);
          this.currentQuestion = questionObj;
          this.hideLoader();
        // }, questionObj.delay);
        });
      // }, questionObj.delay);


    } else {

      // setTimeout(() => {
        this.showMessage('bot', questionObj, questionObj.question);
        this.showAvailableReply(questionObj);
        this.hideLoader();
        this.currentQuestion = questionObj;
      // }, questionObj.delay);

    }

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
    let reply:any = {};
    reply.message = this.replies[this.activeReplyField];

    this.showLoader();

    this.showMessage('user', reply, reply.message);
    this.chatProvider.newUserReply(this.currentQuestion.answerFormat, reply).then((res) => {
      this.newQuestion(res);
    });

    this.replies[this.activeReplyField] = "";
  }

  showMessage(userType, msgObj, text) {
    return new Promise((resolve) => {
      console.log('message', msgObj);
      console.log('message txt', text);
      msgObj.user = userType;
      msgObj.text = text;
      msgObj.dateTime = new Date().toLocaleTimeString();
      this.messages.push(msgObj);
      console.log('messages', this.messages);
      resolve();
    });
  }

}