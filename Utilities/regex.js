import { Constant } from '../Theme';

function emailRegex(text) {
  if (text !== '' && !text.match(Constant.REGEX_CODE.EMAIL_VALIDATION)) {
    return Constant.ERROR_MESSAGES.EMAIL_NOT_VALID;
  } else {
    return null;
  }
}

function passwordRegex(text) {
  if (text !== '' && !text.match(Constant.REGEX_CODE.PASSWORD_VALIDATION)) {
    return Constant.REGEX_CODE.PASSWORD_VALIDATION;
  } else {
    return null;
  }
}

export { emailRegex, passwordRegex };
