import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../../../../../../../shared/classes/user';
import { UserService } from '../../../../../../../../shared/services/authentication/user.service';

@Component({
    selector: 'app-user-one',
    templateUrl: './user-one.component.html',
    styleUrls: ['./user-one.component.scss']
})
export class UserOneComponent implements OnInit {

    title = 'User | Name';
    id: number;
    user: User;

    constructor(private  route: ActivatedRoute, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });

        this.userService.findOneBy(this.id)
            .subscribe(
                (data) => this.user = data,
                (err) => {
                    console.log(err);
                }
            );
    }

    delete(): void {
        if (confirm('Do you really want to delete this user ?')) {
            this.userService.destroy(this.user.id)
                .subscribe({
                    next: () => this.router.navigate(['/dashboard/users']),
                    error: err => console.log(err)
                });
        }
    }
}
