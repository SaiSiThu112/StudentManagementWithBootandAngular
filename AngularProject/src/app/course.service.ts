import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    private url = "http://localhost:8080/api/ang/course";

    constructor(private httpClient: HttpClient) {}

    createCourse(course:Course):Observable<Course>{
        return this.httpClient.post<Course>(`${this.url}`,course);
    }

    getCourseList():Observable<Course[]>{
        return this.httpClient.get<Course[]>(`${this.url}`);
    }

    getCourseName(name:String):Observable<Course>{
        return this.httpClient.get<Course>(`${this.url}/${name}`);
    }
}

