import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aman-chat-app';
  socket:any;
  public Louser:any;
  constructor(public Router:Router, public NewTitle:Title){
    this.NewTitle.setTitle(this.title);
    var user=localStorage.getItem('user');
      if(user){
        this.Router.navigate(['Login/'+user]);
      }
      this.socket=io('http://localhost:2020/');
  }
}
