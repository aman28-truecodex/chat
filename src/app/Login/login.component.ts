import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from '@angular/router';
@Component({
  selector: 'app-member',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class MemberComponent implements OnInit {
public GroupS:FormGroup;
  constructor(public Service:ServiceService, public Fb:FormBuilder,public Router:Router, 
    private SpinnerService: NgxSpinnerService) { 
    if(localStorage.getItem('user')){
      this.Router.navigate(['chat']);
    }
       this.GroupS=this.Fb.group({
        gmail:['',Validators.required],
        password:['', Validators.required]
       });
  }

  ngOnInit(): void {
  }
  LoginMEM(){
    this.SpinnerService.show();
    this.Service.LOGINMEM(this.GroupS.value).subscribe((S:any)=>{
      this.SpinnerService.hide();
       let user=JSON.parse(S)[0].gmail;
       localStorage.setItem('user',user);
      this.Router.navigate(['Login/'+user]);
      });
  }
}
