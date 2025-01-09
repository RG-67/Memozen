import { useState } from "react"
import { ValidateEmail, ValidatePassword, ValidatePhone } from "../utility/Validation";





const RegisterValidation = () => {
    const [error, setError] = useState('');

    const validateRegister = (email, phone, password) => {
        if (!ValidateEmail(email)) {
            setError('Invalid Email Address');
            return false;
        }
        if (!ValidatePhone(phone)) {
            setError('Invalid Phone Number');
            return false;
        }
        if (!ValidatePassword(password)) {
            setError('Password at least 8 characters long and include uppercase, lowercase, number, and special character.')
            return false;
        }
        setError('');
        return true
    }
}

export default RegisterValidation;
