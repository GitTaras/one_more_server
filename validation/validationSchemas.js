import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
  message: Yup.string().max(250, 'max length is 250 charts').required('type message'),
});

export const usersAutocompleteSchema = Yup.object().shape({
  limit: Yup.number().min(1).max(30).default(15),
  name: Yup.string().strict().default(''),
});

export const getPostsSchema = Yup.object().shape({
  limit: Yup.number().min(10).max(30).default(15),
  page: Yup.number().min(1).default(1),
  // hashtag: Yup.mixed().default([]),
});

export const deletePostSchema = Yup.object().shape({
  id: Yup.string().trim().required('missing id'),
});

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
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
  username: Yup.string()
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