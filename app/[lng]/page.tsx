import Link from '../components/Link';
import { useTranslation } from '../i18n';

interface Props {
  params: {
    lang: Locale;
  };
}
export default async function Page({ params: { lang } }: Props) {
  const { t } = await useTranslation(lang, 'translation');

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/second-page">{t('to-second-page')}</Link>
    </div>
  );
}
