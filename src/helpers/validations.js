import { emailRegex } from "./regex.js";

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateRequiredFields(values) {
    return !Object.values(values).includes('');
}


function validateLoginForm(values) {
    const errors = {}
    const isValidEmail = validateEmail(values.email);
    const isValidPassword = validatePassword(values.password);
    if (!isValidEmail) errors.email = 'Email no válido';
    if (!isValidPassword) errors.password = 'La contraseña debe tener almenos 6 caracteres';

    return errors;
}

function validateUserForm(values) {
    const { secondName, secondSurName, ...requiredData } = values;
    const isFormFull = validateRequiredFields(requiredData);
    const isValidEmail = validateEmail(requiredData.email);

    if (!isFormFull) return { error: 'Faltan campos por llenar', isValid: false }
    if (!isValidEmail) return { error: 'Email no válido', isValid: false }
    return { isValid: true }
}

function validateQuestionCreateForm(values) {
    if (values.title === '') return false;
    for (let i = 0; i < values.options.length; i++) {
        if (Object.values(values.options[i]).includes('')) return false;
    }
    return true;
}

function validateStudentFormAnswers(formData) {
    const answers = Object.values(formData.answers);
    if(answers.length !== formData.totalQuestions || answers.includes('')){
        return {isValid: false, msg: 'Por favor responda todas las preguntas'}
    }

    return { isValid : true }
    
}

export {
    validateRequiredFields,
    validateLoginForm,
    validateQuestionCreateForm,
    validateUserForm,
    validateStudentFormAnswers
}