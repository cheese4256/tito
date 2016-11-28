import { ValidationError, ValidationErrorType } from './validation-error';

export abstract class ValidatorBase<T> {
  public abstract default(model: T): Promise<ValidationError[]>;
  public create(model: T): Promise<ValidationError[]> {
    return this.default(model);
  }

  protected requiredStringValidator(value: string, propertyName: string): ValidationError {
    if (!value || value.length < 1) {
      return {
        errorType: ValidationErrorType.missingRequiredField,
        propertyName: "propertyName",
        errorMessage: `Required field ${propertyName} is missing`
      } as ValidationError;
    } else {
      return undefined;
    }
  }
}
