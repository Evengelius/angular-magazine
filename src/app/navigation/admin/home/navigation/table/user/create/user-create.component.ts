import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Validator} from '../../../../../../../validation/validator';
import { UserService } from '../../../../../../../shared/services/authentication/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({

            // Validation
            name: ['', [Validators.required, Validators.maxLength(20)]],
            firstname: ['', [Validators.required, Validators.maxLength(20)]],
            username: ['',
              [
                Validators.required,
                Validators.maxLength(30),
                Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters'),
                Validator.Regex(/^\S*$/, 'noWhiteSpace')
              ]
            ],
            email: ['',
              [
                Validators.required,
                Validators.maxLength(50),
                Validators.email
              ]
            ],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {validators: Validator.Matching('password', 'confirmPassword')});
    }

    submit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        } else {
            const payload = {

                // Get the values from the form
                name: this.registerForm.controls.name.value,
                firstname: this.registerForm.controls.firstname.value,
                username: this.registerForm.controls.username.value,
                email: this.registerForm.controls.email.value,
                password: this.registerForm.controls.password.value
            };

            this.userService.register(payload)
                .subscribe(
                    () => {
                        this.router.navigate(['/dashboard/users']);
                    },
                    (err) => {
                        console.log(err);
                    });
        }
    }
}
