import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Course } from '../course';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  searchStudent:Student=new Student();
  msg:string;
  courseList: Course[];
  student: Student[];
  coursename:Course;
  
  click:boolean;
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

  constructor(private studentService: StudentService,
    private router: Router,public datepipe: DatePipe,private courseService: CourseService) { 
      this.student=[];
      this.courseList=[];
      this. coursename=new Course();
      this.click=false;
      this.msg="";
    }
   
  ngOnInit(): void {
    this.getStudent();
  }
  logOut()
  {
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  get(){
    return sessionStorage.getItem("session");
  }

  getByIdAndName(){
   
    this.studentService.getStudentIdOrNameOrCourse(this.searchStudent.studentId,this.searchStudent.studentName,this.coursename.courseName as string).subscribe(data => {
    this.student= data;
    });

  }

  private getStudent(){
    this.studentService.getStudentList().subscribe(data => {
      this.student = data;
    });
    this.courseService.getCourseList().subscribe(datas => {
      this.courseList=datas;
     });
  }
  updateStudent(studentId: string){
    this.router.navigate(['updatestudent', studentId]);
  }

  deleteStudent(student: string){
    this.studentService.deleteStudent(student).subscribe( data => {
      console.log(data);
      this.getStudent();
    })
  }
  showAll(){
 this.searchStudent=new Student();
    this.coursename=new Course();
   this.getStudent();
  }
 
  onSubmit(){
    if((this.searchStudent.studentId==null && this.searchStudent.studentName==null && this.coursename.courseName==null)  || (this.searchStudent.studentId=="" && this.searchStudent.studentName==""  && this.coursename.courseName=="") )
     this.getStudent();
     else
     this.getByIdAndName();
    }
  
  isClick(con:boolean,filetype:string){
  this.studentService.reportStudent(filetype).subscribe(data=>
    {
      console.log(Object.values(data)[0]);
      this.msg=Object.values(data)[0];
     // this.getStudent();
    });
    
 this.click=con;
}
}
