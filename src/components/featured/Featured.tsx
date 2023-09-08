import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Lorem ipsum</b> dolor sit amet consectetur.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={'/p1.jpeg'} alt='' fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
            velit.
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
            odit ad amet possimus vero id animi atque cumque culpa ipsam alias,
            ratione, accusamus fugit soluta! Ab reiciendis porro velit
            perspiciatis?
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
