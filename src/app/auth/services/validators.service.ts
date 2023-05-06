import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public usernamePattern = "^[a-zA-Z0-9_]{1,20}$";
  public passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
