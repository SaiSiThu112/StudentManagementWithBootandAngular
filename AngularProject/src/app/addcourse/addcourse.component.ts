import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { DatePipe } from '@angular/common';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
declare function dropDownList(): any;

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course : Course = new Course();
  courseIdFilter!:String;
  id:number;
  name:string;
  currentDateTime=this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');
  errorMessage!:string;
  successMessage!:string;
  click!:boolean;

  constructor(private courseService :CourseService , private router : Router 
              ,public datepipe : DatePipe) { 
    this.courseIdFilter="";
    this.id=0;
    this.name="";
    this.errorMessage="";
    this.successMessage="";
    this.click=false;
  } 

  ngOnInit(): void {
    this.getId();
    if(this.id==0)
      this.course.courseId="COU00"+1;
  }

  getId(){
    this.courseService.getCourseList().subscribe(data =>{
      this.courseIdFilter=data[data.length-1].courseId;
      this.id = parseInt((this.courseIdFilter.substring(3)))+1;
      if(this.id<10)
          this.course.courseId="COU00"+this.id;
          else if(this.id>=10 && this.id<100)
          this.course.courseId="COU0"+this.id;
          if(this.id>100)
          this.course.courseId="COU"+this.id;
    });
  }

  goToCourseList(){
    this.router.navigate(['/addCourse']);
  }

  insertCourse(){
    this.courseService.createCourse(this.course).subscribe(data=>{
        console.log(data);
        this.goToCourseList();
    })
  }

  get(){
    return sessionStorage.getItem("session");
  }

  logOut(){
    sessionStorage.removeItem("session");
    this.router.navigate(['/logIn']);
  }

  onSubmit(){
    if(this.course.courseId==null || this.course.courseName==null){
      this.name="Add Course Name!";
      this.errorMessage="Course Name cannot be blank!!!";
    }
    else{
      this.courseService.getCourseName(this.course.courseName).subscribe(data =>{
        if(data!=null)
          this.errorMessage=this.course.courseName+" is already exit!"
        if(data==null){
          this.successMessage="Successfully Added";
          this.insertCourse();
          this.course=new Course();
          this.getId();
        }

      })
    }
  }

onClick(b:boolean){
  this.click=b;
}
}
