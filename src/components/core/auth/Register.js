import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../../helpers/FormInput';
import Button from '../../helpers/Button';

const Register = ({ valid, loading, onChange, onSubmit }) => {
  return (
    <div className="auth-form-container">
      <div className="auth-form-inner-container">
        <h1>Register</h1>
        <p>
          Just a little bit of information and you can start creating your
          game's sessions
        </p>
        <form className="auth-form" onSubmit={onSubmit}>
          <FormInput
            type="text"
            label="Lastname"
            name="register.lastName"
            required
            onChange={onChange}
          />
          <FormInput
            type="text"
            label="Firstname"
            name="register.firstName"
            required
            onChange={onChange}
          />
          <FormInput
            type="text"
            label="Username"
            name="register.username"
            required
            onChange={onChange}
          />
          <FormInput
            type="password"
            label="Password"
            name="register.password"
            required
            onChange={onChange}
          />
          <FormInput
            type="password"
            label="Confirm password"
            name="register.confirmPassword"
            required
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="one"
            className="fluid"
            disabled={!valid || loading}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  valid: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Register.defaultProps = {
  valid: false,
};

export default Register;
