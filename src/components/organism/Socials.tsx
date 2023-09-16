import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const socialMap = [
  {
    src: '/github.png',
    alt: 'github',
    href: 'https://github.com/ArturBuja',
  },
  {
    src: '/gitlab.png',
    alt: 'gitlab',
    href: 'https://gitlab.com/ArturBuja',
  },
  {
    src: '/linkedn.png',
    alt: 'linkedin',
    href: 'https://www.linkedin.com/in/artur-buja/',
  },
];
const Socials = () => {
  return (
    <>
      {socialMap.map(item => (
        <Link
          key={item.alt}
          target='_blank'
          rel='noopener noreferrer'
          href={item.href}
        >
          <Image src={item.src} alt={item.alt} width={24} height={24} />
        </Link>
      ))}
    </>
  );
};

export default Socials;
