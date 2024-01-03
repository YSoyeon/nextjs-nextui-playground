import React from "react";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

const LanguageSwitcher = ({ lng }: any) => {
	const { t } = useTranslation(lng, "footer");

	return (
		<div>
			<Trans i18nKey="languageSwitcher" t={t}>
				Switch from <strong>{lng}</strong> to:{" "}
			</Trans>
			{languages
				.filter((l) => lng !== l)
				.map((l, index) => {
					return (
						<span key={l}>
							{index > 0 && " or "}
							<Link href={`/${l}`}>{l}</Link>
						</span>
					);
				})}
		</div>
	);
};

export default LanguageSwitcher;
