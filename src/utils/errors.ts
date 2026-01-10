export class ValidationError extends Error {
  code = 422
  fieldErrors: Record<string, string[]>

  constructor(fieldErrors: Record<string, string[]>) {
    super("Validation failed")
    this.fieldErrors = fieldErrors
  }
}
