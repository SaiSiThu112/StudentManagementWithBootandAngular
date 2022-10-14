import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user : User = new User();
  userIdFilter!:String;
  id!:number;
  name!:string;
  email!:string;
  password!:string;
  confirmpassword!:string;
  errorMessage!:string;
  successMessage!:string;
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

  constructor(private userService : UserService , private router : Router , private datepipe : DatePipe) { 
    this.id=0;
    this.name="";
    this.email="";
    this.password="";
    this.confirmpassword="";
    this.userIdFilter=""; 
    this.errorMessage="";
    this.successMessage="";
  }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(data => {
      this.userIdFilter= data[data.length-1].userID;
      this.id=parseInt(this.userIdFilter.substring(3))+1;
      if(this.id<10 || data==null)
        this.user.userID="USR00"+this.id;
        else  if(this.id>=10 && this.id<100)
        this.user.userID="USR0"+this.id;
        else  if(this.id>=100)
        this.user.userID="USR"+this.id;
   });
   this.user.userRole="Admin";
  
   if(this.id==0)
  this.user.userID="USR001";
  }

  logOut(){
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  get(){
     return sessionStorage.getItem("session");
   }

   goToUserList(){
    this.router.navigate(['/userdetail']);
  }

  onSubmit(){
    console.log(this.user);
   if(this.user.userName==null || this.user.userEmail==null || this.user.userPassword==null || this.user.userConfirmPassword==null || this.user.userName=="" || this.user.userEmail=="" || this.user.userPassword=="" || this.user.userConfirmPassword=="")
   {
    this.errorMessage="Fields cannot be blank";
     if(this.user.userName==null)
     this.name="Please add User Name!";
     if(this.user.userEmail==null)
     this.email="Please add Email!";
     if(this.user.userPassword==null)
     this.password="Password cannot be blank!";
     if(this.user.userConfirmPassword==null)
     this.confirmpassword="Confirm Password is required";
   }
   
    else if(!this.user.userPassword.match(this.user.userConfirmPassword))

     this.errorMessage="Password and Confirm password does not match";
    else

     this.saveUser();
    
  }
  
  saveUser(){
    this.userService.createUser(this.user)
      .subscribe(data =>{
        console.log(data);
        this.goToUserList();
      }
     );
    }
}
