'use client';
import React, { useState } from 'react';

//utils
import { isEmailOrEmpty } from '@/utils/helpers';
//styles
import styles from './subscribePage.module.css';

const SubscribePage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailOrEmpty(email)) {
      return setMessage('Wpisz poprawny adres email');
    }
    setLoading(true);
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await res.json();

    const { message } = data;
    if (message) {
      setMessage(message);
      setLoading(false);
      return;
    }

    setEmail('');
    setMessage('Sukces! 🎉 Twoj adres mailowy został zapisany do newslettera.');
    setLoading(false);
  };

  return (
    <form onSubmit={subscribe} className={styles.form}>
      <input
        id='email-input'
        name='email'
        placeholder={'Wpisz swój email'}
        value={email}
        className={styles.input}
        onChange={e => setEmail(e.target.value)}
        required
        type='email'
      />
      <div className={styles.message}>
        {message
          ? message
          : ` Zapisz się do newslettera! Wysyłam tylko powiadomienie o nowych wpisach, bez spamu. Możesz zrezygnować w dowolnym momencie. W przypadku zapisania się, a nie otrzymywania wiadomości mailowej, czasem wiadomości wpadają do folderu SPAM.`}
      </div>
      <button className={styles.button} disabled={loading} type='submit'>
        {'Subskrybuj'}
      </button>
    </form>
  );
};

export default SubscribePage;
