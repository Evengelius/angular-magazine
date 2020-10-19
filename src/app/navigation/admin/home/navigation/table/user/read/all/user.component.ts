import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../../../shared/classes/user';
import { UserService } from '../../../../../../../../shared/services/authentication/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // User List
  users: User[] = [];
  filteredUser: User[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private userService: UserService) {
  }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUser = this.filteredUser ? this.performFilter(this.listFilter) : this.users;
  }

  // Filtering | Method
  performFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) => user.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.userService.findAll()
      .subscribe(
        (users) => {
          this.users = users;
          this.filteredUser = this.users;
          this.totalRecords = this.filteredUser.length;
        },
        err => { console.log(err); }
      );
  }
}
