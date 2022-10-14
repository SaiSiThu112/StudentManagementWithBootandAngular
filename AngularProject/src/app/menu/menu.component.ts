import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

  constructor(private datepipe : DatePipe , private router : Router) { }

  ngOnInit(): void {
  }

  get(){
  return sessionStorage.getItem("session");
  }

  logOut(){
  sessionStorage.removeItem("session");
  this.router.navigate(['/login']);
  }
}
