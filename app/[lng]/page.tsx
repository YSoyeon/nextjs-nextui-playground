import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "../lib/hooks/useTranslation";

const Page = async ({ params: { lng, data } }: any) => {
	const { t } = await useTranslation(lng, "ko");

	return (
		<>
			<h1>{t("title")}</h1>
			<Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
		</>
	);
};

export default Page;
