import { ValidatorBase } from './_validator.base';

import { ValidationError, ValidationErrorType } from './validation-error';
import { Sausage } from '../model/identity/sausage';

import { isEmail } from 'validator';

export class SausageValidator extends ValidatorBase<Sausage> {
  public default(model: Sausage): Promise<ValidationError[]> {
    let promise: Promise<ValidationError[]>
      = new Promise<ValidationError[]>((resolve, reject) => {
        let errors = new Array<ValidationError>();

        // email validator
        let emailError = this.emailValidator(model.email);
        if (emailError) {
          errors.push(emailError);
        }

        // password validator
        let passwordError = this.requiredStringValidator(model.password, 'password');
        if (passwordError) {
          errors.push(passwordError);
        }
        // TODO - password complexity validator (from config?)

        // any errors? reject the promise
        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve();
        }
    });

    return promise;
  }

  public register(model: Sausage): Promise<ValidationError[]> {
    return this.default(model);
  }

  public login(email: string, password: string): Promise<ValidationError[]> {
    let promise: Promise<ValidationError[]>
      = new Promise<ValidationError[]>((resolve, reject) => {
        let errors = new Array<ValidationError>();

        // email validator
        let emailError = this.emailValidator(email);
        if (emailError) {
          errors.push(emailError);
        }

        // password validator
        let passwordError = this.requiredStringValidator(password, 'password');
        if (passwordError) {
          errors.push(passwordError);
        }

        // any errors? reject the promise
        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve();
        }
    });

    return promise;
  }

  private emailValidator(email: string): ValidationError {
    if (!email) {
      return {
        errorType: ValidationErrorType.missingRequiredField,
        propertyName: "email",
        errorMessage: "Required field email is missing"
      } as ValidationError;
    } else if (!isEmail(email)) {
      return {
        errorType: ValidationErrorType.invalidFormat,
        propertyName: "email",
        errorMessage: "email has invalid format"
      } as ValidationError;
    } else {
      return undefined;
    }
  }
}
