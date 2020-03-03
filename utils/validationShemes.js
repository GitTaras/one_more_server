import * as Yup from 'yup';

module.exports.postMessageSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .max(250, 'max length is 250 charts')
    .required('type message'),
});

module.exports.deleteMessageSchema = Yup.object().shape({
  id: Yup.string()
    .trim()
    .required('missing id'),
});

module.exports.signupSchema = Yup.object().shape({
  firstName: Yup.string().required().trim().min(2, 'min length is 2 charts').max(16, 'max length is 16 charts'),
  lastName: Yup.string().required().trim().min(2, 'min length is 2 charts').max(16, 'max length is 16 charts'),
  email: Yup.string().required().email().trim().max(30, 'max length is 30 charts').min(6, 'min length is 6 charts'),
  password: Yup.string().required().trim().min(6, 'min length is 6 charts').max(50, 'max length is 50 charts'),
});

module.exports.signinSchema = Yup.object().shape({
  email: Yup.string().required().email().trim().max(30, 'max length is 30 charts').min(6, 'min length is 6 charts'),
  password: Yup.string().required().trim().min(6, 'min length is 6 charts').max(50, 'max length is 50 charts')
});