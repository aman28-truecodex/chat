import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit{
  public MessageArray=[];
  public LoginUser=[];
  public user=localStorage.getItem('user');
  socket:any;
  @ViewChild('Myfriend', {static:true}) public Myfriend:ElementRef;
  @ViewChild('SMS', {static:true}) public SMS:ElementRef;
  public MyfrindAry=[];
  userTypeR: string;
  constructor(public Service:ServiceService, public route:ActivatedRoute,public Router:Router ) {
    if(!localStorage.getItem('user')){
      this.Router.navigate(['Login']);
    }
    this.route.paramMap.subscribe(queryParams => {
      this.userTypeR = queryParams.get("user");
   });
    this.socket=io('https://app28chat.herokuapp.com/');
    this.socket.on('chat-message', function(data){
      var smsn=document.createElement('p');
                smsn.innerHTML +="<li  style='margin-top:-15px;\
                background:#2F4F4F;border-radius:4px'>\
                <div class='ml-1 text-center' style='width:320px;color:#FFFACD\
                '>\
                  <span style='font-size:13px;opacity:0.9'>"+data.SMS+"</span>\
                   <i id='userLogin' style='font-size:14px;'>/"+data.userName+"</i>\
                  </div>\
                   </li>";      
              let x=document.getElementById('disChat');
              x.appendChild(smsn);
              smsn.scrollIntoView(true);
     })
   }

  StartChat(){
    if(this.SMS.nativeElement.value){
    this.MessageArray.push(this.SMS.nativeElement.value);
    this.socket.emit('chat-message', {
    userName:this.userTypeR,
    SMS:this.SMS.nativeElement.value,
});
this.SMS.nativeElement.value=null;
}
  }
LogOut(){
  this.socket.disconnect();
  this.socket.close();
  this.socket=null;
  localStorage.removeItem('user');
  this.Router.navigate(['Login']);
}
ngAfterViewInit(){
 this.Service.LOGINMEM({gmail:this.userTypeR}).subscribe((success:any)=>{
  this.LoginUser.push(JSON.parse(success)[0].gmail);
  console.log(this.LoginUser);
 }) 
}
}