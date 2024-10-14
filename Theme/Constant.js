const Constant = {
  REGEX_CODE: {
    EMAIL_VALIDATION:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_VALIDATION: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/gm, // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number,  Special chars allowed// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
  },
  ERROR_MESSAGES: {
    TIMEOUT: 'Server timeout! Please reload',
    NO_INTERNET: 'Cannot connect to network',
    EMAIL_NOT_VALID: 'Email address is invalid!',
    EMAIL_NOT_VERIFIED:
      'This email has not been registered in the App. Using the 6-digit code sent in your invitation email, Please verify your account.',
    PASSWORD_NOT_VALID:
      'Oops! Password Incorrect. If you don’t remember your password, recover it.',
    EMAIL_PASSWORD_INVALID: 'Oops! Email or Password are incorrect.',
    OTP_INVALID: 'Oops! The code you have entered is incorrect.',
    CANCELLED: 'You have cancelled request',
    INTERNAL_SERVER_ERROR: 'Internal Server Error! Please try again later',
    APPLICATION_ERROR: 'Application Error',
    SERVER_ERROR: 'Please try again later',
    POST_NOT_FOUND: 'Post not found',
    PASSWORD_INVALID: 'Oops! Password does not meet the criteria.',
    PASSWORD_DONT_MATCH: 'Oops! Passwords do not match.',
    TRANSACTION_ERROR: {
      ERROR_403:
        'Please try again after 10 minutes! The product will be available',
    },
    NO_ACTIVE_SESSION: 'No active session',
    IMAGE_UPLOAD_ERROR: 'Image upload error. Please try again!',
    IMAGE_UPLOAD_ERROR2: 'Some of your images may not uploaded!',
  },
  SUCCESS_MESSAGES: {
    PASSWORD_SUCCESS: 'Your password has been sucessfully updated',
  },
  
};

export default Constant;
