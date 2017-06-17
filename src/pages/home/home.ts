import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private navController: NavController
    ) { }

    onGoToChat() {
      this.navController.setRoot(ChatPage);
    }
  
}