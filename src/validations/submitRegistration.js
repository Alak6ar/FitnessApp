import { object, string, boolean, ref} from 'yup';
import { otp } from './validation';

export let confirmKey = object({
    confirmKey: string().required(otp.required).min(6, otp.minLength),
})