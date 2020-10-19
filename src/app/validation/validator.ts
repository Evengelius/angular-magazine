import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export class Validator {


  // tslint:disable-next-line:typedef
  public static Matching(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public static Regex(regex: RegExp | string, key: string): ValidatorFn {
    const regexExp = new RegExp(regex);
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = regexExp.test(control.value);
      const res = [] as any;
      if (!isValid) {
        res[key] = {value: control.value};
        return res;
      }
      return null;
    };
  }
}
