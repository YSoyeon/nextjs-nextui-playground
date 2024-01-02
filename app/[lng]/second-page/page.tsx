import Link from "next/link";
import React from "react";
import { useTranslation } from "../../i18n";

const Page = async ({ params: { lng } }: any) => {
	const { t } = await useTranslation(lng, "second-page");

	return (
		<>
			<h1>{t("title")}</h1>
			<Link href={`/${lng}`}>{t("back-to-home")}</Link>
		</>
	);
};

export default Page;
