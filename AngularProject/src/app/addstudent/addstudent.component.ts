import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  student : Student=new Student();
  id:number;
  name:string;
  dob:string;
  phone:string;
  gender:string;
  course:string;
  studentIdFilter:String;
  courseList : Course[];
  currentDateTime = this.datepipe.transform((new Date) , 'MM/dd/yyyy h:mm:ss');
  errorMessage : string;
  successMessage : string;

  constructor(private studentService : StudentService , private courseService : CourseService,
              private router : Router ,public datepipe : DatePipe) { 
        
        this.id=0;      
        this.name="";
        this.dob="";
        this.phone="";
        this.gender="";
        this.course="";
        this.studentIdFilter="";
        this.courseList=[];
        this.errorMessage="";
        this.successMessage="";

  }

  ngOnInit(): void {

    this.student.course=[];
    this.getStudent();
    this.getId();
    
    if(this.id==0)
    this.student.studentId="STU00"+1;
   this.student.education="Diploma in IT";
  }

  get(){
    return sessionStorage.getItem("session");
  }

  logOut(){
    sessionStorage.removeItem("session");
    this.router.navigate(['/login']);
  }

  toStudentList(){
    this.router.navigate(['/addStudent']);
  }

  getId(){
    this.studentService.getStudentList().subscribe(data =>{
      this.studentIdFilter =data [data.length-1].studentId;
      this.id = parseInt(this.studentIdFilter.substring(3))+1;
      if(this.id<10)
        this.student.studentId="STU00"+this.id;
        else if(this.id>=10 && this.id<100)
          this.student.studentId="STU0"+this.id;
        if(this.id>100)
          this.student.studentId="STU"+this.id;
    })
  }

  getStudent() {
    this.courseService.getCourseList().subscribe(datas => {
    this.courseList=datas;
   });
 
  }

  saveStudent(){
    this.studentService.createStudent(this.student).subscribe(data =>{
      console.log(data);
      this.toStudentList();
    });
  }
 
  onSubmit(){
    if(this.student.studentName==null || this.student.dob==null || this.student.gender==null
      || this.student.phone==null || this.student.course==null){
        this.errorMessage="Fields cannot be blank!";
        if(this.student.studentName==null)
        this.name="Please fill Studet Name";
        if(this.student.dob==null)
        this.dob="Please fill Date of Birth";
        if(this.student.gender==null)
        this.gender="Please choose Gender";
        if(this.student.phone==null)
        this.phone="Please add Phone Number";
        if(this.student.course==null)
        this.course="Please choose Course";
      }else{
        this.successMessage="Add Successfully";
        this.saveStudent();
        this.showAll();
      }
  }

 
  shouldCheck(courseid :string)
  {
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
  coursedisplay( courseid : string,name:string){
  
    this.student.course.push({courseId:courseid,courseName:name})
  
  }
  showAll()
  {
    this.student=new Student();
    this.student.course=[];
    this.student.education="Diploma in IT";
    this.getId();
  }

}
