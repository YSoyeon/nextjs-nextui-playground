'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { defaultNS } from '../i18n/settings';
import { useTranslation } from '../i18n/client';

const Page = ({ params: { lng } }: any) => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const { t } = useTranslation(lng, defaultNS);

  useEffect(() => {
    setTitle(t('title'));
    setSubTitle(t('to-second-page'));
  }, [t]);

  return (
    <>
      <h1>{title}</h1>
      <Link href={`/${lng}/second-page`}>{subTitle}</Link>
    </>
  );
};

export default Page;
