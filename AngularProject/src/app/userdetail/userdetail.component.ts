import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  userList !: User [];
  user : User = new User();
  message!:string;
  click!:boolean;
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

  constructor(private userService : UserService , private datepipe : DatePipe , private router : Router) { 
    this.userList=[];
    this.message="";
    this.click=false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(){
    this.userService.getUserList().subscribe(data => {
      this.userList = data;
    });
  }

  getByIdAndName(){
    this.userService.getUserByUserIdAndName(this.user.userID,this.user.userName).subscribe(data => {
    this.userList = data;
    });

  }

  get(){
    return sessionStorage.getItem("session");
  }

  logOut(){
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  isClick(con:boolean,filetype:string){
  this.userService.reportUser(filetype).subscribe(data=>
    {
      console.log(Object.values(data)[0]);
      this.message=Object.values(data)[0];
     
    });
    this.click=con;
  }
onSubmit(){
  if(this.user.userID==null && this.user.userName==null || this.user.userID=="" && this.user.userName=="")
   this.getUser();
   else
   this.getByIdAndName();
  }

  showAll(){
    this.getUser();
    this.user=new User();
   
  }

  updateUser(userId: string){
    this.router.navigate(['updateuser', userId]);
  }
  
  deleteUser(userId: string){
    this.userService.deleteUser(userId).subscribe( data => {
      console.log(data);
      this.getUser();
    })
  }
}
