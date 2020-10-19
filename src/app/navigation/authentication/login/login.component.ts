import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../shared/classes/auth/login';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/authentication/user.service';
import { Validator } from '../../../validation/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: Login;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      // Validation
      username: ['',
        [
          Validators.required,
          Validators.maxLength(30),
          Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters'),
          Validator.Regex(/^\S*$/, 'noWhiteSpace')
        ]
      ],
      password: ['', Validators.required]
    });

    this.user = {
      username: '',
      password: ''
    };
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const payload = {

        // Get the values from the form
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      };

      // Set the values from the form into the model
      this.user.username = payload.username;
      this.user.password = payload.password;

      // Persist the data
      this.userService.login(this.user)
        .subscribe(
          () => {
            this.router.navigate(['home']);
          },
          (err) => { console.log(err); });
    }
  }
}
