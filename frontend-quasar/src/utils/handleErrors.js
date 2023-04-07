import { Notify } from 'quasar';

export default (dispatch, error) => {
  if (500 === error.response.status) {
    Notify.create({
      message: 'The application has crashed ! Please reload the page.',
      color: 'red',
    });
  }
  if (403 === error.response.status) {
    Notify.create({
      icon: 'warning',
      message: error.response.data.message || 'Access restricted.',
      color: 'orange',
    });
  }
  if (401 === error.response.status) {
    Notify.create({
      icon: 'warning',
      message: error.response.data.message,
      color: 'orange',
    });
  }
  if (404 === error.response.status) {
    console.dir(error);
    Notify.create({
      icon: 'warning',
      message: error.response.data.message,
      color: 'orange',
    });
  }
};
