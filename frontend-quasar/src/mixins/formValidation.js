import addrs from "email-addresses";
import { passwordValidatorMessage } from 'src/utils';

const formValidation = {
  data() {
    return {
      rules: {
        email: [
          val => val !== null && val !== '' || 'Please type your email',
          val => this.validEmail(val) || 'Must be a valid email',
        ],
        password: [
          val => val !== null && val !== '' || 'Please type your password',
          val => passwordValidatorMessage(val).length === 0 || `${passwordValidatorMessage(val).toString().replace(/(,)/g, '. ')}`,
        ],
        checkPassword: [
          val => val !== null && val !== '' || 'Please type your password again',
          val => val === this.form.password || 'Your password do no match',
        ],
      },
    };
  },
  methods: {
    validEmail(email) {
      return addrs.parseOneAddress(email);
    },
  },
};

export default formValidation;
