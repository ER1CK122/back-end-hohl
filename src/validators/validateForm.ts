import { TypeCompiler } from '@sinclair/typebox/compiler'
import { formSchema } from './formValidator'

// Compilar o schema para melhor performance
const validator = TypeCompiler.Compile(formSchema)

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

export function validateForm(data: unknown): ValidationResult {
  if (!validator.Check(data)) {
    const validationErrors = [...validator.Errors(data)];
    
    const errors = validationErrors.map(error => ({
      field: error.path.replace('/', ''),
      message: error.message
    }));

    return {
      isValid: false,
      errors
    };
  }

  return { isValid: true };
} 