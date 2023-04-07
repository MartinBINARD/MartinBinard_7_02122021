const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                  // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    // .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        console.log('Strong password !');
        next();
    } else {
        res.status(403).json({ 
            message: 'Weak password ! Minimun length is 8. Maximum length 100. Must have uppercase letters. Must have lowercase letters. Must have at least 2 digits. Must have at least 2 digits. Must have at least 2 digits. Should not have spaces. And not these kinds of password: Ex: Passw0rd, Password123' })
    }
};
