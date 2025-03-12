import { object, string, ref} from 'yup';
import { resetPassword } from './validation';

export let resetPasswordSchema = object({
    password: string().required(resetPassword.password.required).min(8, resetPassword.password.minLength).test('numbers', resetPassword.password.isSymbol, value => /\d/.test(value)),
    confirmPassword: string().required(resetPassword.confirmPassword.required).oneOf([ref('password', string().password)], resetPassword.confirmPassword.isSame).min(8, resetPassword.confirmPassword.minLength).test('numbers', resetPassword.confirmPassword.isSymbol, value => /\d/.test(value)),
});