import { object, string} from 'yup';
import { forgetPassword } from './validation';

export let forgetPasswordSchema = object({
    email: string().email(forgetPassword.isEmail).required(forgetPassword.required)
});