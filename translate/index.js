// place in translate/index.js
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const creds = require("./.credentials/high-essence-410306-10047835f6dd.json");
const i18nextConfig = require("../i18next-scanner.config");

const spreadsheetDocId = "1f9EzH7k9_7Icp-FQOjaNW5yLH_6woN4VWUV_03Tljf8";

const modules = ["test"];

const lngs = i18nextConfig.options.lngs; // [ 'ko' , 'en' ]
const loadPath = i18nextConfig.options.resource.loadPath;
const localesPath = loadPath.replace("/{{lng}}/{{ns}}.json", "");
const rePluralPostfix = new RegExp(/_plural|_[\d]/g);
const sheetId = [2, 3]; // your sheet id
const NOT_AVAILABLE_CELL = "_N/A";

async function loadSpreadsheet() {
	// eslint-disable-next-line no-console
	console.info(
		"\u001B[32m",
		"=====================================================================================================================\n",
		"# i18next auto-sync using Spreadsheet\n\n",
		"  * Download translation resources from Spreadsheet and make /assets/locales/{{lng}}/{{ns}}.json\n",
		"  * Upload translation resources to Spreadsheet.\n\n",
		`The Spreadsheet for translation is here (\u001B[34mhttps://docs.google.com/spreadsheets/d/${spreadsheetDocId}/#gid=${0}\u001B[0m)\n`,
		"=====================================================================================================================",
		"\u001B[0m"
	);

	const serviceAccountAuth = new JWT({
		email: creds.client_email,
		key: creds.private_key,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	const doc = new GoogleSpreadsheet(spreadsheetDocId, serviceAccountAuth);

	await doc.loadInfo();

	return doc;
}

function getPureKey(key = "") {
	return key.replace(rePluralPostfix, "");
}

function getObjectDepth(obj, currentDepth = 0) {
	if (typeof obj !== "object" || obj === null) {
		return currentDepth;
	}

	let maxDepth = currentDepth;

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const depth = getObjectDepth(obj[key], currentDepth + 1);
			maxDepth = Math.max(maxDepth, depth);
		}
	}

	return maxDepth;
}

module.exports = {
	localesPath,
	loadSpreadsheet,
	getPureKey,
	modules,
	lngs,
	sheetId,
	NOT_AVAILABLE_CELL,
	getObjectDepth,
};
