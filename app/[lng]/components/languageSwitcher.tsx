import React from "react";
import { useParams, usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { ChangeEvent } from "react";

const LanguageSwitcher = ({ lng }: any) => {
	const router = useRouter();
	const params = useParams();
	const urlSegments = useSelectedLayoutSegments();

	function handleLocaleChange(e: ChangeEvent<HTMLSelectElement>) {
		const newLocale = e.target.value;
		router.push(`/${newLocale}/${urlSegments.join("/")}`);
	}

	return (
		<select onChange={handleLocaleChange} value={params.lang}>
			<option value={"ko"}>한국어</option>
			<option value={"en"}>영어</option>
		</select>
	);
};

export default LanguageSwitcher;
