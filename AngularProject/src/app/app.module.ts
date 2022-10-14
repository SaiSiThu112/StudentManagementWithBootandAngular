import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { StudentupdateComponent } from './studentupdate/studentupdate.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    UserdetailComponent,
    UserupdateComponent,
    AddcourseComponent,
    AddstudentComponent,
    StudentdetailComponent,
    StudentupdateComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
