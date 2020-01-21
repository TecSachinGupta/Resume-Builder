import * as yup from 'yup';

const validationHandler = validation =>
  new Promise((resolve, reject) => {
    validation.then(valid => resolve(valid)).catch(err => reject(err));
  });
const validationMap = {
  title: value => validationHandler(yup.string().isValid(value)),
  rank: value => validationHandler(yup.string().isValid(value)),
  date: value => validationHandler(yup.date().isValid(value)),
  summary: value => validationHandler(yup.string().isValid(value)),
};
export { validationMap };