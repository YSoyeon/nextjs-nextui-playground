import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { useEffect, useState } from 'react';
import { getGoogleSheet } from './getGoogleSheet';

// 구글 시트 조회하는 custom useHook
/*
const useGoogleSheet = (sheetId: any) => {
  const [googleSheetRows, setGoogleSheetRows] = useState<GoogleSpreadsheetRow[]>([]);

  const fetchGoogleSheetRows = async () => {
    const googleSheet = await getGoogleSheet();
    const sheetsByIdElement = googleSheet.sheetsById[sheetId];
    const rows = await sheetsByIdElement.getRows();
    setGoogleSheetRows(rows);
  };

  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);

  return [googleSheetRows];
};

export default useGoogleSheet;
*/

export async function fetchGoogleSheetRows(sheetId: any) {
  const googleSheet = await getGoogleSheet();
  const sheetsByIdElement = googleSheet.sheetsById[sheetId];
  const rows = await sheetsByIdElement.getRows();
  console.log('fetchGoogleSheetRows');
  console.log(rows);
  return rows;
  // setGoogleSheetRows(rows);
}
