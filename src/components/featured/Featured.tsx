'use client';
import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Featured = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>
        <b>Lorem ipsum</b> dolor sit amet consectetur.
      </h1> */}
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src={'/p1.jpg'}
            alt='Logo'
            sizes='100%'
            priority
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            console.log(<q>Hello world!</q>);
          </h1>
          <p className={styles.postDesc}>
            Dziś z niebywałą radością witam Was na moim autorskim blogu, który
            będzie miejscem, gdzie będę dzielić się moją pasją do programowania
            oraz nieco ciekawymi aspektami mojego życia. Jeśli jesteś fanem
            kodowania, odkrywania nowych technologii lub po prostu szukasz
            inspiracji do osobistego rozwoju, to jesteś we właściwym miejscu!
          </p>
          <button
            onClick={() => router.push(`/posts/consoleloghello-world`)}
            className={styles.button}
          >
            Czytaj więcej
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
