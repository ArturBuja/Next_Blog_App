import Image from 'next/image';
//styles
import styles from './aboutPage.module.css';

const AboutMe = () => {
  const paragraphs = [
    'Cześć! Mam na imię Artur 😃',
    'Swoją przygodę z blogowaniem rozpocząłem latem 2023 roku. Przeglądając internet i przyswajając treści związane z programowaniem, wpadł mi do głowy pomysł na założenie bloga. W międzyczasie na popularnym serwisie wpadł projekt związany z blogiem, zastanawiałem się, dlaczego by nie napisać własnego bloga i nie spróbować rozpocząć nowej pasji.',
    'Pochodzę ze Śląska, a swoje pierwsze kroki w programowaniu postawiłem w technikum. Udało mi się zakończyć naukę z kierunkiem informatyka, ale niestety nie udało mi się zdobyć technicznego wykształcenia. Niestety w trakcie nauki w technikum nauczycielom udało się zabić moją pasję do programowania, a ja przestałem się czuć komfortowo w tej dziedzinie. W związku z tym wybrałem studia, które zupełnie nie były związane z programowaniem.',
    'Po ukończeniu studiów znalazłem pracę, która nie była satysfakcjonująca. Po rozmowach z przyjaciółmi i bliskimi, zdecydowałem się rzucić obecną pracę i rozpocząć kurs programowania. Miałem trochę oszczędności, więc wystarczyło na kurs, a ja sam miałem nadzieję na szybkie znalezienie nowej pracy. To był zwrotny moment.',
    'Kurs wymagał ode mnie dużo wysiłku i wiele godzin spędziłem na nauce programowania (zarówno samodzielnej, jak i tej prowadzonej na kursie), ale wysiłek się opłacił!',
    'Szczęście uśmiechnęło się do mnie, gdy na kursie poznałem mentora, który zauważył moje zdolności i dał mi szansę. Dzięki temu już w marcu 2022 roku, na trwającym od listopada do przełomu lutego/marca kursie, zdobyłem swoją pierwszą pracę! Tak rozpoczęła się moja przygoda z programowaniem na rynku pracy komercyjnej. 😊',
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>O mnie</h1>
      <div className={styles.imageContainer}>
        <Image
          src={'/p2_lepsza.jpg'}
          blurDataURL='/p2.jpg'
          placeholder='blur'
          alt={'Zdjecie autora'}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.text} style={{ textIndent: 20 }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
