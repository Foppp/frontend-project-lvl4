import * as Yup from 'yup';

export const validate = (channels) => Yup.object().shape({
  body: Yup.string()
    .min(3, 'From 3 to 20 characters')
    .max(20, 'From 3 to 20 characters')
    .test(
      'is-exist',
      'This channel name already exist',
      (value) => !_.some(channels, ['name', value]))
});