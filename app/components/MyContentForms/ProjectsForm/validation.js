import * as yup from 'yup';

const validationHandler = validation =>
  new Promise((resolve, reject) => {
    validation.then(valid => resolve(valid)).catch(err => reject(err));
  });
const validationMap = {
  title: value => validationHandler(yup.string().isValid(value)),
  summary: value => validationHandler(yup.string().isValid(value)),
  keywords: value => validationHandler(yup.string().isValid(value)),
  url: value => validationHandler(yup.string().isValid(value)),
  start: value => validationHandler(yup.date().isValid(value)),
  end: value => validationHandler(yup.date().isValid(value)),
  tillDate: value => validationHandler(yup.bool().isValid(value)),
  description: value => validationHandler(yup.string().isValid(value)),
};
export { validationMap };