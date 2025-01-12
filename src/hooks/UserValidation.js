import { useState } from "react"
import { ValidateEmail, ValidatePassword, ValidatePhone } from "../utility/Validation";





export const RegisterValidation = () => {
    const validateRegister = (name, phone, email, password) => {
        if(name === "") {
            return 'Enter Name';
        }
        if (!ValidatePhone(phone)) {
            return 'Invalid Phone Number';
        }
        if (!ValidateEmail(email)) {
            return 'Invalid Email Address';
        }
        if (!ValidatePassword(password)) {
            return 'Password at least 8 characters long and include uppercase, lowercase, number, and special character.';
        }
        
        return '';
    }
    return {validateRegister};
}

export const LoginValidation = (email, password) => {
    if(!ValidateEmail(email)) {
        return 'Invalid Email Address';
    }
    if(password === "") {
        return 'Enter Password';
    }
    return '';
}

export default RegisterValidation;
