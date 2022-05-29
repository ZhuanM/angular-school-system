import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../auth/store/auth.actions';
import { appLoading } from '../loader/store/loader.actions';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {
  public hideRegisterPassword: boolean = true;
  public hideRegisterRepeatPassword: boolean = true;

  public classes: Array<string> = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ];
  public subjects: Array<string> = [ 'Mathematics', 'Literature', 'English', 'Chemistry', 'Physics', 'Geography', 'History', 'Arts' ];
  
  public registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, this.passwordConfirming),
    role: new FormControl(''),
    school: new FormControl(''),
    class: new FormControl(''),
    subject: new FormControl('')
  });
  
  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.registerForm.get('role').setValue('STUDENT');
  }

  public onRadioChange(event: MatRadioChange) {
    if (event.value == 'STUDENT') {
      this.registerForm.get('school').clearValidators();
      this.registerForm.get('school').setValue('');
      this.registerForm.get('school').markAsPristine();
      this.registerForm.get('school').markAsUntouched();

      this.registerForm.get('school').setValidators(Validators.required);

      this.registerForm.get('class').clearValidators();
      this.registerForm.get('class').setValue('');
      this.registerForm.get('class').markAsPristine();
      this.registerForm.get('class').markAsUntouched();

      this.registerForm.get('class').setValidators(Validators.required);
    } else if (event.value == 'TEACHER') {
      this.registerForm.get('school').clearValidators();
      this.registerForm.get('school').setValue('');
      this.registerForm.get('school').markAsPristine();
      this.registerForm.get('school').markAsUntouched();

      this.registerForm.get('school').setValidators(Validators.required);

      this.registerForm.get('subject').clearValidators();
      this.registerForm.get('subject').setValue('');
      this.registerForm.get('subject').markAsPristine();
      this.registerForm.get('subject').markAsUntouched();

      this.registerForm.get('subject').setValidators(Validators.required);
    } else if (event.value == 'PRINCIPAL') {
      this.registerForm.get('school').clearValidators();
      this.registerForm.get('school').setValue('');
      this.registerForm.get('school').markAsPristine();
      this.registerForm.get('school').markAsUntouched();

      this.registerForm.get('school').setValidators(Validators.required);
    } else if (event.value == 'PARENT') {
      this.registerForm.get('school').clearValidators();
      this.registerForm.get('school').setValue('');
      this.registerForm.get('school').markAsPristine();
      this.registerForm.get('school').markAsUntouched();
      
      this.registerForm.get('class').clearValidators();
      this.registerForm.get('class').setValue('');
      this.registerForm.get('class').markAsPristine();
      this.registerForm.get('class').markAsUntouched();

      this.registerForm.get('subject').clearValidators();
      this.registerForm.get('subject').setValue('');
      this.registerForm.get('subject').markAsPristine();
      this.registerForm.get('subject').markAsUntouched();
    }

    this.cdr.detectChanges();
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(AuthActions.register(
        {
          fullName: this.registerForm.get('fullName').value,
          username: this.registerForm.get('username').value,
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('passwords')?.get('password').value,
          role: this.registerForm.get('role').value
        }
      ));
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('repeatPassword').value) {
      return { invalid: true };
    }
  }
  
  // ERRORS
  public getRegisterFullNameErrorMessage() {
    let fullName = this.registerForm.get('fullName');
    if (fullName.hasError('required')) {
      return 'Please enter your full name';
    }

    return fullName.hasError('fullName') ? 'Please enter a valid full name' : '';
  }

  public getRegisterUsernameErrorMessage() {
    let username = this.registerForm.get('username');
    if (username.hasError('required')) {
      return 'Please enter your username';
    }

    return username.hasError('username') ? 'Please enter a valid username' : '';
  }

  public getRegisterEmailErrorMessage() {
    let email = this.registerForm.get('email');
    if (email.hasError('required')) {
      return 'Please enter your email';
    }

    return email.hasError('email') ? 'Please enter a valid email' : '';
  }

  public getPasswordErrorMessage() {
    let password = this.registerForm.get('passwords')?.get('password');
    if (password.hasError('required')) {
      return 'Please enter your password';
    }

    if (password.errors) {
      return 'Please enter a minimum of eight characters, at least one letter, one number and one special character';
    }
    // return password.hasError('password') ? 'Please enter a minimum of eight characters, at least one letter, one number and one special character' : '';
  }

  public getRepeatPasswordErrorMessage() {
    let repeatPassword = this.registerForm.get('passwords')?.get('repeatPassword');
    if (repeatPassword.hasError('required')) {
      return 'Please confirm your password';
    }

    let password = this.registerForm.get('passwords')?.get('password');
    if (password.errors) {
      return 'Please enter a valid password first';
    }

    if (repeatPassword.errors) {
      return 'Password does not match';
    }
    // return repeatPassword.hasError('repeatPassword') ? 'Password does not match' : '';
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.resetErrorState());
  }
}
