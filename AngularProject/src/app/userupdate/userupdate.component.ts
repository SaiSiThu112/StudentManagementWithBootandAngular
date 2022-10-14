import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  user: User= new User();
  userID!: string;
  name!:string;
  email!:string;
  password!:string;
  confirmpassword!:string;
  errorMessage!:string;
  successMessage!:string;
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

  constructor(private userService : UserService , private router : Router , private datepipe : DatePipe ,  private route: ActivatedRoute) { 
    this.userID="";
    this.name="";
    this.email="";
    this.password="";
    this.confirmpassword="";
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'];
    this.errorMessage="";
    this.userService.getUserByUserId(this.userID).subscribe(data => {
    this.user=data;
    });
  }

  get(){
    return sessionStorage.getItem("session");
  }

  logOut(){
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  goToUserList(){
    this.router.navigate(['/userdetails']);
  }

  onSubmit(){
    if(this.user.userName==null || this.user.userEmail==null || this.user.userPassword==null || this.user.userConfirmPassword==null || this.user.userName=="" || this.user.userEmail=="" || this.user.userPassword=="" || this.user.userConfirmPassword=="")
   {
    this.errorMessage="Fields cannot be blank!";
     if(this.user.userName==null)
     this.name="Please add User Name!";
     if(this.user.userEmail==null)
     this.email="Email cannot be blank!";
     if(this.user.userPassword==null)
     this.password="Please fill Password!";
     if(this.user.userConfirmPassword==null)
     this.confirmpassword="Please fill Confirm Password!";
   }
    else if(!this.user.userPassword.match(this.user.userConfirmPassword))
    this.errorMessage="Password and Confirm password does not match";
    else
    this.userService.updateUser(this.userID, this.user).subscribe( data =>{
      this.goToUserList();
    });
  }

}
