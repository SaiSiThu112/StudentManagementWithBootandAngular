import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : User = new User();
  userInfo!: string;
  flag!:string;

  constructor(private userService : UserService , private router : Router) { }

  ngOnInit(): void {

  }
  getUser(name:string,password:string,id:string)
  {
    this.userService.getUserByUserNameAndPassword(name,password,id).subscribe(data => {
      this.userInfo= data.userName;
      });
  }
  onSubmit(){

    if(this.login.userName==null || this.login.userPassword==null || this.login.userName=="" || this.login.userPassword=="")
       this.flag="Please fill User Name and Password!!!";
    else
    {
    this.getUser(this.login.userName.trim(),this.login.userPassword.trim(),this.login.userID);
    if(this.userInfo.trim().match(this.login.userName.trim()))
    {
      this.router.navigate(['/menu']);
      this. save();
    }
      
     else
     {
      this.flag="Wrong User Name or Password!";
   
     }
    }
    
     
    }
    save()
    {
      sessionStorage.setItem("session",this.userInfo);
    }
}
