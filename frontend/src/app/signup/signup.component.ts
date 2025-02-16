import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupServiceService } from '../signup-service.service';
import { ParentErrorStateMatcher, PasswordValidator } from './validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  errorMessage!: string;
  matchingPasswordsGroup!: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();


  validation_messages = {
    'FirstName':[{ type: 'required', message: 'First name is required' }],
    'LastName': [{ type: 'required', message: 'Last name is required' }],
    'ResearchAreas': [{ type: 'required', message: 'This field is required' }],
    'Email': [{ type: 'required', message: 'Email is required' }, { type: 'pattern', message: 'Enter a valid email' }],
    'Password': [{ type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },],
    'RepeatPassword': [{ type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password must match' }]
  }

  constructor(private fb: FormBuilder, private signupService: SignupServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.matchingPasswordsGroup = new FormGroup({
      Password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      RepeatPassword: new FormControl('', Validators.required)
    }, {validators: PasswordValidator.areEqual});


    this.signUpForm = this.fb.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      ResearchAreas: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      matchingPasswords: this.matchingPasswordsGroup,
  });
  }


  onSubmit() {
    if (this.signUpForm.valid) {
      const formValue= {
        FirstName: this.signUpForm.value.FirstName,
        LastName: this.signUpForm.value.LastName,
        ResearchAreas: this.signUpForm.value.ResearchAreas,
        Email: this.signUpForm.value.Email,
        Password: this.signUpForm.value.matchingPasswords.Password  // Extract the Password
      };
      this.signupService.postSignUp(formValue).subscribe(
        () => {
          this.router.navigate(['../']);  // Redirect to home page on success
        },
         error => {
           if (error.status === 400) {  // Assuming 409 Conflict for existing email
             this.errorMessage = 'Email address already in use';
           } else {
             this.errorMessage = 'An error occurred. Please try again.';
           }
         }
      );

    }

}

onReset() {
  this.submitted = false;
  this.signUpForm.reset();
  this.errorMessage = '';
}
}
