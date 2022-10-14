import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "./student";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private url = "http://localhost:8080/api/ang/student";
    private reportURL = "http://localhost:8080/api/ang/student/report";

    constructor (private httpClient:HttpClient){}

    getStudentList():Observable<Student[]>{
        return this.httpClient.get<Student[]>(`${this.url}`);
    }

    getStudentById(studentId :string):Observable<Student>{
        return this.httpClient.get<Student>(`${this.url}/${studentId}`);
    }

    getStudentIdOrNameOrCourse(studentId:String,studentName:String,courseName:string):Observable<Student[]>{
        return this.httpClient.get<Student[]>(`${this.url}/${studentId}/${studentName}/${courseName}`);
    }

    createStudent(student:Student):Observable<Student>{
        return this.httpClient.post<Student>(`${this.url}`,student);
    }

    updateStudent(studentId:string,student:Student):Observable<Student>{
        return this.httpClient.put<Student>(`${this.url}/${studentId}`,student);
    }

    deleteStudent(studentId:string):Observable<Student>{
        return this.httpClient.get<Student>(`${this.url}/${studentId}`);
    }

    reportStudent(filetype: string): Observable<Map<string,string>>{
        return this.httpClient.get<Map<string,string>>(`${this.reportURL}/${filetype}`);
      }
}
