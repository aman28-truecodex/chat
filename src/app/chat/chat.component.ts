import { Component, ViewChild, ElementRef,HostListener, AfterViewInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SimplePeer} from 'simple-peer';
import * as io from 'socket.io-client';
import { Stream } from 'stream';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public MessageArray=[];
  public LoginUser=[];
  public user=localStorage.getItem('user');
  public Speer:SimplePeer;
  socket:any;
  @ViewChild('Myfriend', {static:true}) public Myfriend:ElementRef;
  @ViewChild('SMS', {static:true}) public SMS:ElementRef;
  public MyfrindAry=[];
  userTypeR: string;
  stream: void;
  constructor(public Service:ServiceService, public route:ActivatedRoute,public Router:Router) {
    this.route.paramMap.subscribe(queryParams => {
      this.userTypeR = queryParams.get("user");
   });
    if(!localStorage.getItem('user')){
      this.Router.navigate(['Login']);
    }
    this.socket=io('http://localhost:2020/');
    this.socket.on('chat-message', function(data,Array){
      if(data.SMS){
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
      } 
      if(Array){
        let flag=true;
       let Num=document.getElementById('Num');
       Num.innerHTML=Array.length;
       let loginUsr=document.getElementById('loginUsr');
       loginUsr.innerHTML=null;
       Array.forEach((ele, index) => {
        let DivTag=document.createElement('div');
        if(flag){
          DivTag.style.backgroundColor='green';
          flag=false;
        }else{
          DivTag.style.backgroundColor='blue';
          flag=true;
        }

        DivTag.style.textAlign='center';
        DivTag.innerHTML=index+1+'.'+ele +"<span style='color:red; font-size:25px; position:relative;\
        top:8px; left:10px;'>*</span>";
        loginUsr.prepend(DivTag);
       });
       if(data.StmUsr){
         var Con=document.querySelector('.cont');
         var video=document.createElement('video');
         video.id=data.StmUsr;
         switch(data.status){
           case true:
              navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream)=>{
                stream=stream;
                video.srcObject=stream;
                video.play();
                Con.append(video);
              }).catch((err)=>{console.log(err)});
              break;
            case false:
              navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream)=>{
                stream.getTracks().forEach((d)=>{d.stop()});
                document.getElementById(data.StmUsr).innerHTML=null;
                //video.srcObject=null;
              }).catch((err)=>{console.log(err)});
              break;
         }
       }
      } 
       
     });
    setTimeout(()=>{
      this.socket.emit('chat-message', {
        LogInUser:this.userTypeR
    })},1000); 
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
  this.socket.emit('chat-message', {
    LogoutUser:this.userTypeR
});
  this.socket.disconnect();
  this.socket.close();
  this.socket=null;
  localStorage.removeItem('user');
  this.Router.navigate(['Login']);
}
@HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
   this.LogOut();
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    this.LogOut();
  }
  Start(B){
    switch(B){
     case true:
      this.socket.emit('chat-message', {
       status:true,
       StmUsr:this.userTypeR
    });
     break;
     case false:
      this.socket.emit('chat-message', {
        status:false,
        StmUsr:this.userTypeR
     });
     break;
    }
    
  }
  VidCall(){
   
    this.Router.navigate(["webstream"]);
      }
}