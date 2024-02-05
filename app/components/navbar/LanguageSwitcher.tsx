'use client';

import React from 'react';
import { locales } from '../../i18n/settings';
import Link from '../Link';

const LanguageSwitcher = ({ lng }: any) => (
  <div>
    {/* <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{lng}</strong> to:{' '}
      </Trans> */}
    {locales
      .filter((l) => lng !== l)
      .map((l, index) => (
        <span key={l}>
          {index > 0 && ' or '}
          <Link href={`/${l}`}>{l}</Link>
        </span>
      ))}
  </div>
);

export default LanguageSwitcher;
