import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cx from 'classnames';
import { Formik, Form, FieldArray } from 'formik';
import { createStructuredSelector } from 'reselect';
import {
  makeUpdateResumeJSONState,
  makeUpdateEditorState,
} from 'containers/Builder/selectors';
import { updateResumeJSONState } from 'containers/Builder/actions';
import { updateCanvas } from 'components/Builder/BuilderEditor/ComponentEditor';
import { formatDateValue } from '../../../utils/app/textFormating';
import { defaultTo } from 'lodash';
import Accordian from '../../Accordion';
import ProjectInputs from './ProjectItems';
import Button from '../../Button';

function ProjectForm({ editorState, resumeJSONState, dispatch }) {
  // const skillData = [
  //   { name: 'Music' },
  //   { name: 'Singing' },
  //   { name: 'Reading' },
  //   { name: 'Writing' },
  //   { name: 'Blogginging' },
  //   { name: 'Poetry' },
  // ];
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
    title: { valueMap: 'title', componetType: 'content' },
    summary: { valueMap: 'summary', componetType: 'content' },
    keywords: { valueMap: 'keywords', componetType: 'content' },
    url: {
      key: ['href'],
      valueMap: ['url'],
      componetType: 'attribute',
      RemoveHiddenClass: [],
    },
    start: { valueMap: 'start', componetType: 'content' },
    end: { valueMap: 'end', componetType: 'content' },
    description: { valueMap: 'description', componetType: 'content' },
  };
  const [projects, setProjects] = useState([{ ...blankProFields }]);
  // let storeProject = null;
  useEffect(() => {
    console.log(resumeJSONState);
    const storeProject = defaultTo(resumeJSONState, 'project.history', null);
    console.log(storeProject);
    if (storeProject) {
      setProjects([{ ...storeProject }]);
    }
    // setProjects(storeProject);
  }, [resumeJSONState]);



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
        componentMap.url.RemoveHiddenClass.push(false);
      } else {
        componentMap.url.RemoveHiddenClass.push(true);
      }
    });
    return tempValues;
  };
  const handleSave = values => {
    const updatedPro = formatValues(JSON.parse(JSON.stringify(values.project)));
    // const updatedPro = [...values.project];
    const history = { history: values.project };
    updateCanvas('project', 'ADD', updatedPro, editorState, componentMap);
    dispatch(updateResumeJSONState(history, 'project'));
  };

  const getValues = data => {
    setHobbies([...hobbies, data]);
    const hobbyDataTemp = hobbiesData.filter(
      hData => hData.value.toLowerCase() !== data.value.toLowerCase(),
    );
    setHobbiesData(hobbyDataTemp);
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
                        getValues={getValues}
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
  editorState: PropTypes.object,
  resumeJSONState: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editorState: makeUpdateEditorState(),
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
