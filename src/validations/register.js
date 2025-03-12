import { object, string, boolean, ref} from 'yup';
import { register } from './validation';

export let registerSchema = object({
    FirstName: string().required(register.firstname.required).min(3, register.firstname.minLength),
    LastName: string().required(register.lastname.required).min(3, register.lastname.minLength),
    Username: string().required(register.username.required).min(3, register.username.minLength),
    Email: string().email(register.email.isEmail).required(register.email.required),
    Password: string().required(register.Password.required).min(8, register.Password.minLength).test('numbers', register.Password.isSymbol, value => /\d/.test(value)),
    ConfirmPassword: string().required(register.ConfirmPassword.required).oneOf([ref('Password', string().password)], register.ConfirmPassword.isSame).min(8, register.ConfirmPassword.minLength).test('numbers', register.ConfirmPassword.isSymbol, value => /\d/.test(value)),
})


