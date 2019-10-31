import {INSERT_IMAGE_LINK, 
        INSERT_EMAIL, 
        INSERT_PASS,
        INSERT_NAME_REGISTER,
        INSERT_EMAIL_REGISTER,
        INSERT_PASS_REGISTER} from './constants';

export const setImageLink = (text) =>{
 
 return {
         type: INSERT_IMAGE_LINK,
         payload: text
        }   
}

export const setEmailSignIn = (text) => {
    return {
        type: INSERT_EMAIL,
        payload: text
    }
}

export const setPassSignIn = (text) => {
    return {
        type: INSERT_PASS,
        payload: text
    }
}


export const setNameRegister = (text) => {
    //console.log('actions',text);
    return {
        type: INSERT_NAME_REGISTER,
        payload: text
    }
}

export const setEmailRegister = (text) => {
    return {
        type: INSERT_EMAIL_REGISTER,
        payload: text
    }
}

export const setPassRegister = (text) => {
    return {
        type: INSERT_PASS_REGISTER,
        payload: text
    }
}