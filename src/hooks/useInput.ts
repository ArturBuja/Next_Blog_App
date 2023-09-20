'use client';
import { useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: string) => {
    setEnteredValue(event);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    reset,
    inputBlurHandler,
    hasError,
    valueChangeHandler,
    setIsTouched,
  };
};

export default useInput;
