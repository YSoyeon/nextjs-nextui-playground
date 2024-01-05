import Link from 'next/link';
import React from 'react';
import { defaultNS } from '../i18n/settings';
import { useTranslation } from '../i18n/client';

const Page = ({ params: { lng } }: any) => {
  const { t } = useTranslation(lng, defaultNS);

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>{t('to-second-page')}</Link>
    </>
  );
};

export default Page;
