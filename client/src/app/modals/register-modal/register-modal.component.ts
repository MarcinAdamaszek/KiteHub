import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), 
          Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }  

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value === control.parent?.get(matchTo)?.value)
      {
        return null;
      }
      else {
        return {notMatching: true};
      }
    } 
  }

  register() {
    const registerValues = this.registerForm.value;
    this.accountService.register(registerValues).subscribe({
      next: () => this.cancel(),
      error: error => {
        this.validationErrors = error;
      }
    });
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
