'use client';
import useInput from '@/hooks/useInput';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import styles from './contactPage.module.css';

const isNotEmptyMessage = (value: string) => value.trim().length >= 10;
const isNotEmptyName = (value: string) => value.trim().length >= 2;
const isEmailOrEmpty = (value: string) =>
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const {
    value: message,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessage,
    setIsTouched: messageIsSubmitted,
  } = useInput(isNotEmptyMessage);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
    setIsTouched: emailIsSubmitted,
  } = useInput(isEmailOrEmpty);
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
    setIsTouched: nameIsSubmitted,
  } = useInput(isNotEmptyName);

  let formIsValid = false;

  if (messageIsValid && emailIsValid && nameIsValid) {
    formIsValid = true;
  }
  const resetForm = () => {
    resetMessage();
    resetEmail();
    resetName();
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid && form.current) {
      if (
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID &&
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      ) {
        emailjs
          .sendForm(
            process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
          )
          .then(
            () => {
              alert(
                'Poczta została wysłana. Skontaktuję się z Tobą tak szybko, jak to możliwe. Dziękuję.\n'
              );
            },
            () => {
              alert('Coś poszło nie tak. Spróbuj ponownie później\n');
            }
          );
      } else {
        alert('Wystąpił błąd wewnętrzny. Spróbuj ponownie później\n');
      }
      resetForm();
    } else {
      if (!messageIsValid) messageIsSubmitted(true);
      if (!emailIsValid) emailIsSubmitted(true);
      if (!nameIsValid) nameIsSubmitted(true);
      alert('Popraw błednie wypełnione pola\n');
    }
  };

  return (
    <div className={styles.container}>
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <input
              name='name'
              onChange={e => {
                nameChangeHandler(e.target.value);
              }}
              onBlur={nameBlurHandler}
              value={name}
              className={styles.input}
              type='text'
              placeholder={'Wpisz swoje imię'}
            />

            <span className={styles.inputError}>
              {nameHasError && 'Imie musi zawierać minimum dwa znaki'}
            </span>
          </div>
          <div className={styles.inputContainer}>
            <input
              name='email'
              onChange={e => {
                emailChangeHandler(e.target.value);
              }}
              onBlur={emailBlurHandler}
              value={email}
              className={styles.input}
              type='text'
              placeholder={'Wpisz swój email'}
            />

            <span className={styles.inputError}>
              {emailHasError && 'Wpisz poprawny adres e-mail'}
            </span>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            name='message'
            onChange={e => {
              messageChangeHandler(e.target.value);
            }}
            onBlur={messageBlurHandler}
            value={message}
            className={`${styles.input} ${styles.message}`}
            placeholder={'Wpisz swoją wiadomość'}
          />

          <span className={styles.inputError}>
            {messageHasError &&
              'Wiadomość musi zawierać minimum dziesieć znaków'}
          </span>
        </div>

        <button className={styles.button} type='submit'>
          Wyślij wiadomość
        </button>
      </form>
    </div>
  );
};

export default Contact;
