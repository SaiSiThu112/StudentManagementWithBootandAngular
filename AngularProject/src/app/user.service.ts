import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    private url ="http://localhost:8080/api/ang/user";
    private reportUrl="http://localhost:8080/api/ang/report";

    constructor(private httpClient: HttpClient) { 
    
    }
  
    getUserList(): Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.url}`);
    }
    
    getUserByUserId(userId: string): Observable<User>{
        return this.httpClient.get<User>(`${this.url}/${userId}`);
      }

    getUserByUserIdAndName(userId:String,userName:String): Observable<User[]>{
        return this.httpClient.get<User[]>(`${this.url}/${userId}/${userName}`);
      }

    getUserByUserNameAndPassword(userName:String,userPassword:String,userID:String): Observable<User>{
        return this.httpClient.get<User>(`${this.url}/${userName}/${userPassword}/${userID}`);
      }

    createUser(user:User): Observable<Object>{
      return this.httpClient.post(`${this.url}`, user);
    }
     
    updateUser(userId: string, user: User): Observable<Object>{
      return this.httpClient.put(`${this.url}/${userId}`, user);
    }
  
    deleteUser(userId: string): Observable<Object>{
      return this.httpClient.delete(`${this.url}/${userId}`);
    }
    reportUser(filetype: string): Observable<Map<string,string>>{
      return this.httpClient.get<Map<string,string>>(`${this.reportUrl}/${filetype}`);
    }
}
