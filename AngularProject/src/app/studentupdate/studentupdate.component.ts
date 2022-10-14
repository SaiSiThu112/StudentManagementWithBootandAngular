import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentupdate',
  templateUrl: './studentupdate.component.html',
  styleUrls: ['./studentupdate.component.css']
})
export class StudentupdateComponent implements OnInit {

  student: Student= new Student();
  name:string;
  dob:string;
  phone:string;
  gender:string;
  course:string;
  courseList: Course[];
  studentId!: string;
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  errorMessage!:String;

  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,public datepipe: DatePipe,private courseService: CourseService) { 
      this.courseList=[];
      this.errorMessage="";
      this.name="";
      this.dob="";
      this.gender="";
      this.phone="";
      this.course="";
    }

  ngOnInit(): void {
       this.studentId = this.route.snapshot.params['studentId'];

      this.studentService.getStudentById(this.studentId).subscribe(data => {
      this.student= data;
    }
   
    //, error => console.log(error)

    );

    this.courseService.getCourseList().subscribe(datas => {
      this.courseList=datas;
     });
  }

  onSubmit(){

    if(this.student.studentName==null || this.student.dob==null || this.student.phone==null || this.student.course==null || this.student.studentName=="" || this.student.dob=="" || this.student.phone=="" )
    {
      this.errorMessage="Fields cannot be blank!";
      if(this.student.studentName=="")
      this.name="Please fill Student Name";
      if(this.student.dob==null)
      this.dob="Please add Date of Birth";
      if(this.student.phone=="")
     
      this.phone="Phone number is requird";
      if(this.student.gender==null)
      this.gender="Please choose Gender";
      if(this.student.course==null)
      this.course="Please add Course";
    }
 
  else
    this.studentService.updateStudent(this.studentId, this.student).subscribe( data =>{
      this.goToStudentList();
    }

    //, error => console.log(error)
    );
  }
  logOut()
  {
    sessionStorage.removeItem("key");
    this.router.navigate(['/userlogin']);
  }
  goToStudentList(){
    this.router.navigate(['/studentdetail']);
  }
  deleteStudent( ){
    this.studentService.deleteStudent(this.studentId).subscribe( data => {
      console.log(data);
     this.goToStudentList();
    })
  }
  shouldCheck(courseid :string){
   Boolean
   {
    let shouldCheck=false;
    for(let course of this.student.course)
    {
      if(course.courseId==courseid)
      {
        shouldCheck=true;
        break;
      }
    }
    return shouldCheck;
   }

  }
showCourse(courseid :string,name:string)
  {
    let shouldadd = true
    let index =0
    for(let i=0;i<this.student.course.length;i++)
    {
      if(this.student.course[i].courseId==courseid)
      {
        shouldadd=false
        index=i
        break
      }
    }
    if(shouldadd)
    {
      this.student.course.push({courseId:courseid,courseName:name})
    }
    else
    {
      this.student.course.splice(index,1)
    }
   
  }
  get(){
  return sessionStorage.getItem("session");
}

}
