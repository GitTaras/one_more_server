import * as Yup from 'yup';

export const postMessageSchema = Yup.object().shape({
  message: Yup.string().trim().max(250, 'max length is 250 charts').required('type message'),
});

export const usersAutocompleteSchema = Yup.object().shape({
  limit: Yup.number()
    .transform((value) => parseInt(value, 10) || 15)
    .min(1)
    .max(30)
    .default(15),
  name: Yup.string().strict().default(''),
});

export const getMessagesSchema = Yup.object().shape({
  limit: Yup.number().min(10).max(30).default(15),
  page: Yup.number().min(1).default(1),
  // hashtag: Yup.mixed().default([]),
});

export const deleteMessageSchema = Yup.object().shape({
  id: Yup.string().trim().required('missing id'),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  lastName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  email: Yup.string()
    .required()
    .email()
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
  password: Yup.string()
    .required()
    .trim()
    .min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
});

export const editUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  lastName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  email: Yup.string()
    .required()
    .email()
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
  // password: Yup.string().required().trim().min(6, 'min length is 6 charts').max(50, 'max length is 50 charts'),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('bad email')
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
  password: Yup.string()
    .required()
    .trim()
    .min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
});
