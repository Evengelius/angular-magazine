import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor() { }

  ngOnInit() {
    this.currentUser();
  }

  public currentUser(): any {
    this.user = {
      token: sessionStorage.getItem('token'),
      name: sessionStorage.getItem('name'),
      firstname: sessionStorage.getItem('firstname'),
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      // @ts-ignore
      role: JSON.parse(sessionStorage.getItem('role')),
    };
    return this.user;
  }

}
