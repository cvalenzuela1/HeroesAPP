import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public myForm: FormGroup = this._fb.group({
    user: ['', [Validators.required, Validators.pattern(this._validatorsService.usernamePattern)]],
    password: ['', [Validators.required, Validators.pattern(this._validatorsService.passwordPattern)]]
  });

  
  constructor
    (
      private _router: Router,
      private _authService: AuthService,
      private _validatorsService: ValidatorsService,
      private _fb: FormBuilder
    ) { }

  isValidField(field: string) {
    return this._validatorsService.isValidField(this.myForm, field);
  }

  login(): void {
    this._authService.login(this.myForm.get('user')!.value, this.myForm.get('password')!.value)
      .subscribe(resp => {
        if (resp[0]?.id) {
          this._authService.jwtAuthentication( resp[0]?.username, resp[0]?.id)
          this._router.navigate(["/heroes"]);
        }
      });
  }

  noLogin(): void {
    this._router.navigate(["/heroes"]);
  }

  cancelar(): void {
    this.myForm.reset();
  }

}
