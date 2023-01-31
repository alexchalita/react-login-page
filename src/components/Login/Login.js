import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  // these are related, one is for the entered value and one is for the validity
  // useReducer is good if you update a state based on a another state
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  /*
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
      // for every keystroke, we are setting a timer and after 500 ms, the function is ran
    }, 500);
    // the trick is to save the timer, and for the next keystroke, we clear it, so we 
    // only have one ongoing timer. so as long as the user keeps typing, all
    // other timers are cleared, and only once the user stops, the final timer starts
    // this is called a Cleanup Function, which runs BEFORE every side Effect function
    // execution
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
  /*
    pass in as dependencies, the instances that are called in the 
    useEffect function. All should be pointers to the function 
    as dependencies. 
    explanation: after every Login function execution, it will 
    rerun the useEffect function ONLY if
    enteredEmail or enteredPassword are changed (in the last 
    component reload cycle)
    setFormIsValid can be omitted because it will never change
  */

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

// listening to keystrokes and we want to trigger another action
// is a sideEffect. (checking and updating formValidity in response
// to a keystroke in the email or password field --> sideEffect 
// of user entering Data)

// useEffect => action to run in RESPONSE to another action!!

// DEBOUNCING, with the old implementation, the useEffect was being
// ran on every keystroke, which creates unessary bloating. For 
// example, when a user is entering their email, we don't want to check
// if it's a valid email on every keystroke, rather when the stop 
// typing or click out of the field
export default Login;
