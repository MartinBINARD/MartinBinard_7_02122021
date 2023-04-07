import PasswordValidator from 'password-validator';
const schemaPassword = new PasswordValidator();

schemaPassword
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces();                          // Should not have spaces

export default (pwd) => {
  return schemaPassword
    .validate(pwd, { details: true })
    .map((v) => v.message)
};
