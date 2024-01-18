import React from 'react';
import Link from '@/app/components/Link';
import { useTranslation } from '@/app/i18n';

const Page = async ({ params: { lng } }: any) => {
  const { t } = await useTranslation(lng, 'second-page');

  return (
    <>
      knlkjdlkqwjd
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>{t('back-to-home')}</Link>
    </>
  );
};

export default Page;
