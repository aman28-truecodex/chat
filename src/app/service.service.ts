import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
public BehSubj=new BehaviorSubject('');
public BaseUrllocalURL='http://localhost:2020';
public BaseUrl='https://app28chat.herokuapp.com';
  constructor(public http:HttpClient) { }
UPDATEMEM(obj){
  return this.http.post(this.BaseUrl+'/insert_member',  obj, {responseType:'text'});
}
LOGINMEM(obj){
  return this.http.post(this.BaseUrl+'/Login_member',  obj, {responseType:'text'});
}

AddFrd(obj){
  return this.http.post(this.BaseUrl+'/AddFrd', obj, {responseType:'text'});
}
}
