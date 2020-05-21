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
    navigator.mediaDevices.getUserMedia({video:true, audio:false}).then((stream)=>{
      this.socket.emit('chat-message', {
        stream:stream,
        StmUsr:localStorage.getItem('user')
     });
    }).catch((err)=>{console.log(err)});
}
Back(){
this.Router.navigate(['Login/'+localStorage.getItem('user')]);
  }
  ngAfterViewInit(){
    
    this.socket.on('chat-message', function(data){
      var div=document.getElementById('div'); 
      var video=document.createElement('video');
      video.style.width='400px';
      video.style.height='300px';  
      video.srcObject=data.stream;
      video.play();
      div.appendChild(video);
  });  
  }
}
