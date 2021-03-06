import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderInput = ({ input, label, id, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      // <></> is shorthand <React.Fragment></React.Fragment>
      <>
        <label htmlFor={id} className={className}>
          {label}
          <input {...input} id={id} autoComplete="off" />
          <div>{this.renderError(meta)}</div>
        </label>
      </>
    );
  };

  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="ui form error" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          id="title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          id="description"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
