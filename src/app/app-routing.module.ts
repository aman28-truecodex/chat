import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MemberComponent } from './Login/login.component';
const routes: Routes = [
  {path:'Login',component:MemberComponent},
  {path:'Login/:user',component:ChatComponent},
  {path:'', redirectTo:'Login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
