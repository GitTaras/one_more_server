import * as Yup from 'yup';

export const postMessageSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .max(250, 'max length is 250 charts')
    .required('type message'),
});

export const deleteMessageSchema = Yup.object().shape({
  id: Yup.string()
    .trim()
    .required('missing id'),
});