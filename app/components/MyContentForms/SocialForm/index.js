import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  FaFacebook,
  FaTwitter,
  FaDribbble,
  FaLinkedin,
  FaGlobeAsia,
} from 'react-icons/fa';
import { Formik, Form, FieldArray } from 'formik';
import cx from 'classnames';
import { createStructuredSelector } from 'reselect';
import {
  makeUpdateResumeJSONState,
  makeUpdateEditorState,
} from 'containers/Builder/selectors';
import { updateResumeJSONState } from 'containers/Builder/actions';
import updateCanvas from 'components/Builder/BuilderEditor/ComponentEditor';
import { validationMap } from './validation';
import Button from '../../Button';
import Input from '../../FormComponents/Input';
import './style.scss';

function SocialForm({ editorState, resumeJSONState, dispatch }) {
  const blankSocialFields = {
    icon: FaGlobeAsia,
    name: 'other',
    placeholder: 'Other',
  };
  const storeSocial = null;

  // const [allInputs, setAllInputs] = useState([
  const allInputs = [
    {
      icon: FaFacebook,
      name: 'facebook',
      placeholder: 'https://facebook.com',
      url: '',
    },
    {
      icon: FaTwitter,
      name: 'twitter',
      placeholder: 'https://twitter.com',
      url: '',
    },
    {
      icon: FaDribbble,
      name: 'dribble',
      placeholder: 'https://dribbe.com',
      url: '',
    },
    {
      icon: FaLinkedin,
      name: 'linkedIn',
      placeholder: 'https://linkedIn.com',
      url: '',
    },
    {
      icon: FaGlobeAsia,
      name: 'website',
      placeholder: 'your website url',
      url: '',
    },
  ];

  const socailDataURLMap = {
    'facebook.com': {
      icon: FaFacebook,
      name: 'facebook',
      placeholder: 'https://facebook.com',
    },
    'twitter.com': {
      icon: FaTwitter,
      name: 'twitter',
      placeholder: 'https://twitter.com',
    },
    'dribble.com': {
      icon: FaDribbble,
      name: 'dribble',
      placeholder: 'https://dribbe.com',
    },
    'linkedIn.com': {
      icon: FaLinkedin,
      name: 'linkedIn',
      placeholder: 'https://linkedIn.com',
    },
  };

  const updateSocialValue = (e, setFieldValue, value, name, idx) => {
    let data = {};
    const baseURL = e.target.value
      .replace(/^(www.|http[s]*:\/\/[www\.]*)/gim, '')
      .split('/')[0];
    data = socailDataURLMap[baseURL];
    if (!data) {
      data = value;
    }
    setFieldValue(`social.${idx}`, data);
  };

  const httpsValidation = (e, setFieldValue, idx) => {
    let baseURL = e.target.value;
    if (baseURL !== '') {
      const prefixHttp = 'http://';
      if (baseURL.substr(0, prefixHttp.length) === prefixHttp) {
        baseURL = baseURL.replace(prefixHttp, '');
      }
      const prefixHttps = 'https://';
      if (baseURL.substr(0, prefixHttps.length) !== prefixHttps) {
        baseURL = prefixHttps + baseURL;
      }

      e.target.value = baseURL;
      setFieldValue(`social.${idx}.url`, baseURL);
    }
  };

  const [socials, setSocials] = useState(storeSocial || allInputs);

  const handleSave = values => {
    const updatedSoc = [...values.social];
    const history = { history: updatedSoc };
    updateCanvas('social', 'ADD', values.social, editorState);
    dispatch(updateResumeJSONState(history, 'Social'));
  };

  return (
    <div>
      <Formik
        initialValues={{ social: socials }}
        onSubmit={(values, actions) => {
          console.log(values);
          handleSave(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray
              name="social"
              render={arrayHelpers => (
                <React.Fragment>
                  {values.social.map((item, idx) => (
                    <Input
                      inputIcon={<item.icon />}
                      placeholder={item.placeholder}
                      label={item.placeholder}
                      clearable
                      validate={validationMap.url}
                      name={`social.${idx}.url`}
                      key={`social.${idx}`}
                      onInput={e => {
                        updateSocialValue(
                          e,
                          setFieldValue,
                          values.social[idx],
                          item.name,
                          idx,
                        );
                      }}
                      onBlur={e => {
                        httpsValidation(e, setFieldValue, idx);
                      }}
                      onKeyDown={e => {
                        if (e.keyCode === 13)
                          httpsValidation(e, setFieldValue, idx);
                      }}
                    />
                  ))}

                  <Button
                    onClick={() => arrayHelpers.push(blankSocialFields)}
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

SocialForm.propTypes = {
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
export default withCompose(SocialForm);
