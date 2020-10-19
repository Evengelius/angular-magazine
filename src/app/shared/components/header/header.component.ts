import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/authentication/user.service';
import { AuthenticationStorageService } from '../../services/authentication/authentication-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor
  (
    private userService: UserService,
    public authenticationStorageService: AuthenticationStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['home']);
  }
}
