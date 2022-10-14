import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserdetailComponent} from './userdetail/userdetail.component';
import {LoginComponent} from './login/login.component';
import { UserupdateComponent} from './userupdate/userupdate.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { StudentdetailComponent} from './studentdetail/studentdetail.component';
import { StudentupdateComponent} from './studentupdate/studentupdate.component';
import { MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: 'addcourse', component: AddcourseComponent},
  {path: 'adduser', component: AdduserComponent}, 
 {path: 'userdetail', component: UserdetailComponent},
 {path: 'logIn', component: LoginComponent},
 {path: 'updateuser/:userID', component: UserupdateComponent},
 {path: 'addstudent', component: AddstudentComponent}, 
 {path: 'studentdetail', component: StudentdetailComponent},
 {path: 'updatestudent/:studentId', component: StudentupdateComponent},
 {path: 'menu', component: MenuComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
