import { UntypedFormGroup } from '@angular/forms';

export class PasswordValidator {
  static MatchPassword(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MatchPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static RegexPassword(controlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // check if contains any uppercase letter
      if (!control.value.match(/[a-z]/g)) {
        control.setErrors({ noLowerCase: true });
      }

      // check if contains any uppercase letter
      if (!control.value.match(/[A-Z]/g)) {
        control.setErrors({ noUpperCase: true });
      }

      if (!control.value.match(/\d/g)) {
        control.setErrors({ noNumber: true });
      }
    };
  }
}
