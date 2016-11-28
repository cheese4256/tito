export class ValidationError {
  public errorType: ValidationErrorType;
  public propertyName: string;
  public errorMessage: string;
}

export enum ValidationErrorType {
  missingRequiredField = 1,
  invalidFormat = 2
}
