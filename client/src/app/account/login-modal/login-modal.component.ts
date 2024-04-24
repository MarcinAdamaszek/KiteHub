import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  username = '';
  password = '';
  model: any = {}
  loginForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(public bsModalRef: BsModalRef, 
    private accountService: AccountService,
    private fb: FormBuilder) {}

    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm() {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
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

  login() {
    const loginValues = this.loginForm.value;
    this.accountService.login(loginValues).subscribe({
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