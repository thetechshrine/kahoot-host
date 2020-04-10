import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../../helpers/FormInput';
import Button from '../../helpers/Button';

const Login = ({ valid, onChange, onSubmit }) => {
  return (
    <div className="auth-form-container">
      <div className="auth-form-inner-container">
        <h1>Log in</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <FormInput
            type="text"
            label="Username"
            name="login.username"
            required
            onChange={onChange}
          />
          <FormInput
            type="password"
            label="Password"
            name="login.password"
            required
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="one"
            className="fluid"
            disabled={!valid}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  valid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
  valid: false,
};

export default Login;
