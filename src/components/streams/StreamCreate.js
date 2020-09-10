import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderInput({ input, label, id }) {
    return (
      // <></> is shorthand <React.Fragment></React.Fragment>
      <>
        <label htmlFor={id} className="field">
          {label}
          <input {...input} id={id} />
        </label>
      </>
    );
  }

  render() {
    return (
      <form className="ui form">
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
      </form>
    );
  }
}

export default reduxForm({
  form: 'streamCreate',
})(StreamCreate);
