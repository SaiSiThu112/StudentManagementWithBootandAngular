import { Course } from "./course";
export class Student {

    studentId!:string;
    studentName!:string;
    dob!:string;
    gender!:string;
    phone!:string;
    education!:string;
    course: Array<Course> =[];
}
