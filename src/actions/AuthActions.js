import {
    PHONE_CHANGED,
    OTP_CHANGED,
    USER_AUTHENTICATED,
    SIGN_OUT,
    NAME_CHANGED,
    EMAIL_CHANGED,
    SET_LOADING
} from './types';

//phone input on the signup/login page
export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    };
};

//otp input 
export const otpChanged = (text) => {
    return {
        type: OTP_CHANGED,
        payload: text
    };
};

//name input on the signup/login page
export const nameChanged = (text) => {
  return {
      type: NAME_CHANGED,
      payload: text
  };
};

//email input on the signup/login page
export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const loginFirebase = (phoneNumber) => {
    return (dispatch) => {
        // login here
    }
}
