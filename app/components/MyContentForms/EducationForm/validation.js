import * as yup from 'yup';

const validationHandler = validation =>
  new Promise((resolve, reject) => {
    validation.then(valid => resolve(valid)).catch(err => reject(err));
  });
const validationMap = {
  title: value => validationHandler(yup.string().isValid(value)),
  institution: value => validationHandler(yup.string().isValid(value)),
  fieldOfStudy: value => validationHandler(yup.string().isValid(value)),
  state: value => validationHandler(yup.string().isValid(value)),
  country: value => validationHandler(yup.string().isValid(value)),
  start: value => validationHandler(yup.date().isValid(value)),
  end: value => validationHandler(yup.date().isValid(value)),
  tillDate: value => validationHandler(yup.bool().isValid(value)),
  summary: value => validationHandler(yup.string().isValid(value)),
};
export { validationMap };
