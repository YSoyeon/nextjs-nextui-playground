'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { defaultNS } from '../i18n/settings';
import { useTranslation } from '../i18n/client';

const Page = ({ params: { lng, data } }: any) => {
  const { t } = useTranslation(lng, defaultNS);

  useEffect(() => {
    console.log('data');
    console.log(data);
  }, []);

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>{t('to-second-page')}</Link>
    </>
  );
};

export default Page;
