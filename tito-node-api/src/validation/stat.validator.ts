import { ValidatorBase } from './_validator.base';

import { ValidationError, ValidationErrorType } from './validation-error';
import { Stat } from '../model/tito/stat';

export class StatValidator extends ValidatorBase<Stat> {
  public default(model: Stat): Promise<ValidationError[]> {
    let promise: Promise<ValidationError[]>
      = new Promise<ValidationError[]>((resolve, reject) => {
        let errors = new Array<ValidationError>();

        // name validator
        let nameError = this.requiredStringValidator(model.name, 'name');
        if (nameError) {
          errors.push(nameError);
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
}
