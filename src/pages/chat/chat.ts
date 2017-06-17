import { Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  public firstReply: boolean = true;

  private botName: string = 'Alfred';

  public replies: any = {
        text: '',
        number: '',
        option: ''
      };
  public activeReplyField: string;

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
    let t = this;

    if (questionObj.comment != "") {

      setTimeout(() => {
        t.showMessage('bot', t.botName, questionObj.comment).then(() => {
        setTimeout(() => {
          t.showMessage('bot', t.botName, questionObj.question);
          t.showAvailableReply(questionObj);
          t.currentQuestion = questionObj;
          t.hideLoader();
        }, questionObj.delay);
        });
      }, questionObj.delay);


    } else {

      setTimeout(() => {
        t.showMessage('bot', t.botName, questionObj.question);
        t.showAvailableReply(questionObj);
        t.hideLoader();
        t.currentQuestion = questionObj;
      }, questionObj.delay);

    }

  }

  showLoader() {
    this.isLoading = true;
  }
  hideLoader() {
    this.replies[this.activeReplyField] = "";
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

    this.chatProvider.getUserId().then((userId) => {
      
      this.showLoader();

      let reply = {
        userId: userId,
        questionId: this.currentQuestion.questionId,
        message: this.getCurrentReply()
      };

      if (this.firstReply) {
        let userName = this.getCurrentReply();
        this.chatProvider.saveUserName(userName);
        this.firstReply = false;
      }

      this.chatProvider.getUserName().then((userName) => {
        this.showMessage('user', userName, reply.message);
      });

      this.chatProvider.newUserReply(reply).then((res) => {
        this.newQuestion(res);
      }, (err) => {
        this.showMessage('bot', this.botName, "Ops, aconteceu algo inesperado ao tentar ler sua resposta...");
        this.showMessage('bot', this.botName, "Por favor, envie novamente!");
        this.hideLoader();
      });

    });

  }

  showMessage(userType, userName, text) {
    return new Promise((resolve) => {
      let obj = {
        userType: userType,
        userName: userName,
        text: text,
        dateTime: new Date().toLocaleTimeString()
      }
      this.messages.push(obj);
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 600);
      resolve(obj);
    });
  }

  getCurrentReply() {
    return this.replies[this.activeReplyField];
  }

}