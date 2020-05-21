import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-webstream',
  templateUrl: './webstream.component.html',
  styleUrls: ['./webstream.component.scss']
})
export class WebstreamComponent implements AfterViewInit{
  socket: any;
  constructor(private Router:Router) {
    var div=document.getElementById('div'); 
    console.log(div);
    this.socket=io('https://app28chat.herokuapp.com/');
    this.socket.emit('chat-message', {
      status:true,
      StmUsr:localStorage.getItem('user')
   });
}
Back(){
this.Router.navigate(['Login/'+localStorage.getItem('user')]);
  }
  ngAfterViewInit(){
    
    this.socket.on('chat-message', function(data,Array){
    navigator.mediaDevices.getUserMedia({video:true, audio:false}).then((stream)=>{
      var div=document.getElementById('div'); 
      var video=document.createElement('video');
      var button=document.createElement('button');
      video.style.width='380px';
      video.style.height='350px';  
      video.srcObject=stream;
      video.play();
      div.appendChild(video);
    }).catch((err)=>{console.log(err)});
  });  
  }
}
