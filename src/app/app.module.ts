
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { MemberComponent } from './Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner"; 
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
