'use client';
import React, { useContext, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// Context
import { ThemeContext } from '@/context/ThemeContext';

const Socials = () => {
  const { theme } = useContext(ThemeContext);

  const socialMap = useMemo(
    () => [
      {
        src: theme === 'light' ? '/github.png' : '/github_white.png',
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
    ],
    [theme]
  );
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
