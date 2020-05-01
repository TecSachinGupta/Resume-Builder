import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cx from 'classnames';
import { Formik, Form, FieldArray } from 'formik';
import { createStructuredSelector } from 'reselect';
import { makeUpdateResumeJSONState } from 'containers/Builder/selectors';
import {
  updateResumeJSONState,
  updateEditorCanvas,
} from 'containers/Builder/actions';
import { defaultTo } from 'lodash';
import { formatDateValue } from '../../../utils/app/textFormating';
import Accordian from '../../Accordion';
import ProjectInputs from './ProjectItems';
import Button from '../../Button';

function ProjectForm({ resumeJSONState, dispatch }) {
  const skillData = [
    'Music',
    'Singing',
    'Reading',
    'Writing',
    'Bloging',
    'Poetry',
    'Sketching',
    'Photography',
    'Designing',
    'Painting',
    'Volunteering',
    'Socializing',
    'Gaming',
    'Sport',
  ];

  const blankProFields = {
    title: '',
    summary: '',
    keywords: '',
    url: '',
    start: null,
    end: null,
    tillDate: false,
    description: '',
  };
  const componentMap = {
    title: { valueMap: 'title', componentType: 'content' },
    summary: { valueMap: 'summary', componentType: 'content' },
    keywords: { valueMap: 'keywords', componentType: 'content' },
    url: {
      key: ['href'],
      valueMap: ['url'],
      componentType: 'attribute',
      addHiddenClass: [],
    },
    start: { valueMap: 'start', componentType: 'content' },
    end: { valueMap: 'end', componentType: 'content' },
    description: { valueMap: 'description', componentType: 'content' },
  };

  // useEffect(() => {
  //   console.log(resumeJSONState);
  //   const storeProject = defaultTo(resumeJSONState, 'project.history', null);
  //   if (storeProject) {
  //     setProjects([{ ...storeProject }]);
  //   }
  // }, [resumeJSONState]);
  // const [projects, setProjects] = useState([{ ...blankProFields }]);

  let storeProject = null;
  if (resumeJSONState.project) {
    storeProject = resumeJSONState.project.history;
  }
  const [projects, setProjects] = useState(
    storeProject || [{ ...blankProFields }],
  );

  const formatValues = values => {
    const tempValues = values;
    tempValues.forEach((value, index) => {
      tempValues[index].start = formatDateValue(tempValues[index].start);
      if (tempValues[index].tillDate === true) {
        tempValues[index].end = 'Present';
      } else {
        tempValues[index].end = formatDateValue(tempValues[index].end);
      }
      if (tempValues[index].url === '') {
        componentMap.url.addHiddenClass.push(true);
      } else {
        componentMap.url.addHiddenClass.push(false);
      }
    });
    return tempValues;
  };
  const handleSave = values => {
    const updatedPro = formatValues(JSON.parse(JSON.stringify(values.project)));
    const history = { history: values.project };
    dispatch(updateEditorCanvas('project', 'ADD', updatedPro, componentMap));
    dispatch(updateResumeJSONState(history, 'project'));
  };

  return (
    <div>
      <Formik
        initialValues={{ project: projects }}
        onSubmit={(values, actions) => {
          console.log(values);
          handleSave(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray
              name="project"
              render={arrayHelpers => (
                <React.Fragment>
                  {values.project.map((item, idx) => (
                    <Accordian
                      key={idx}
                      id={idx}
                      label={item.title ? item.title : `Project ${idx + 1}`}
                      onClickRemove={() => arrayHelpers.remove(idx)}
                    >
                      <ProjectInputs
                        idx={idx}
                        values={item}
                        setFieldValue={setFieldValue}
                        skillData={skillData}
                      />
                    </Accordian>
                  ))}

                  <Button
                    onClick={() => arrayHelpers.push(blankProFields)}
                    fullWidth
                    type="flat"
                  >
                    Add Another
                  </Button>
                  <div className={cx('footerContainer')}>
                    <Button as="submit" fullWidth type="primary">
                      Save Details
                    </Button>
                  </div>
                </React.Fragment>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

ProjectForm.propTypes = {
  resumeJSONState: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resumeJSONState: makeUpdateResumeJSONState(),
});
const mapDispatchToProps = null;
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withCompose = compose(
  withConnect,
  memo,
);
export default withCompose(ProjectForm);
