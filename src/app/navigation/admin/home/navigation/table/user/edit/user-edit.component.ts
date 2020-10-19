import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validator } from '../../../../../../../validation/validator';
import { UserService } from '../../../../../../../shared/services/authentication/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  id: number;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {

    this.userRequest(this.route.snapshot.params.id);
    this.userForm = this.formBuilder.group({

      // Validation
      name: ['', [Validators.required, Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      role: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: Validator.Matching('password', 'confirmPassword') });
  }

  userRequest(id: any) {
    this.userService.findOneBy(id)
      .subscribe(
        (data) => {
          this.id = data.id;
          this.userForm.setValue(
            {
              name: data.name,
              firstname: data.firstname,
              username: data.username,
              email: data.email,
              role: data.role,
              password: data.password,
              confirmPassword: data.password,
            },
          );
          console.log(data);
        });
  }

  update(form: NgForm) {
    this.submitted = true;
    this.userService.update(this.id, form)
      .subscribe(
        () => {
          // @ts-ignore
          if ((this.userForm.get('password').dirty && this.userForm.get('confirmPassword').dirty) || this.userForm.get('role').dirty) {
            this.userService.logout();
            this.router.navigateByUrl('/login');
          } else {
            this.router.navigate(['/dashboard/users']);
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }
}
