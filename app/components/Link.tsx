'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '../i18n/settings';

type Props = {
  href: string;
  children: React.ReactNode;
};

const Link = ({ href, children }: Props) => {
  const currentPathname = usePathname();
  const currentLocale = currentPathname.split('/')[1];
  const isExistsLanguage = locales.some((v) => v === currentLocale);

  if (isExistsLanguage)
    return <NextLink href={`/${currentLocale}/${href}`}>{children}</NextLink>;

  return <NextLink href={href}>{children}</NextLink>;
};

export default Link;
