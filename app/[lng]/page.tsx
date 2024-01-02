import Link from "next/link";
import React from "react";
import { useTranslation } from "../i18n";
import { defaultNS } from "../i18n/settings";

const Page = async ({ params: { lng } }: any) => {
	const { t } = await useTranslation(lng, defaultNS);

	return (
		<>
			<h1>{t("title")}</h1>
			<Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
		</>
	);
};

export default Page;
