// place in translate/upload.js
const fs = require('fs');
const {
  loadSpreadsheet,
  localesPath,
  getPureKey,
  modules,
  lngs,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
  getObjectDepth,
  sheetId,
} = require('./index');

async function addNewSheet(doc, title, sheetId, header) {
  const sheet = await doc.addSheet({
    sheetId,
    title,
    headerValues: header,
  });

  return sheet;
}

function traverseObject(header, i, addedRows, obj, prevKey, row) {
  for (const key in obj) {
    if (key === 'ko' || key === 'en') {
      const added = { ...row, ko: obj['ko'], en: obj['en'] };
      addedRows.push(added);
      return;
    } else {
      traverseObject(header, i + 1, addedRows, obj[key], key, { ...row, [header[i]]: key });
    }
  }
}

async function updateTranslationsFromKeyMapToSheet(doc, lngMap, title, sheetId, header) {
  /**
   * 1. sheetId에 해당하는 시트가 없으면 새로운 시트를 추가한다.
   */

  let sheet = doc.sheetsById[sheetId];
  if (!sheet) {
    sheet = await addNewSheet(doc, title, sheetId, header);
  } else {
    /**
     * 2. clear (기존 시트 내용을 제거하고 덮어씌우기)
     */
    const rows = await sheet.getRows();
    await sheet.clear(`A2:Z${rows.length * header.length}`);
  }

  /**
   * 3. keyMap 업로드
   */

  let addedRows = [];

  traverseObject(header, 0, addedRows, lngMap, null, {});

  await sheet.addRows(addedRows);
}

function gatherKeyMap(keyMap, lng, json) {
  for (const key in json) {
    if (!keyMap[key]) {
      keyMap[key] = {};
    }

    if (typeof json[key] === 'object' && json[key] !== null) {
      gatherKeyMap(keyMap[key], lng, json[key]);
    } else {
      keyMap[key][lng] = json[key];
    }
  }
}

async function updateSheetFromJson() {
  const doc = await loadSpreadsheet();

  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      throw error;
    }

    modules.forEach((module, i) => {
      const lngMap = {};

      lngs.forEach((lng) => {
        const localeJsonFilePath = `${localesPath}/${lng}/${module}.json`;

        // eslint-disable-next-line no-sync
        const json = fs.readFileSync(localeJsonFilePath, 'utf8');

        //lngMap[lng] = JSON.parse(json);
        gatherKeyMap(lngMap, lng, JSON.parse(json));
      });

      const maxDepth = getObjectDepth(lngMap) - 1;

      const header = Array.from({ length: maxDepth }, (_, index) => `key${index + 1}`).concat(['ko', 'en']);

      updateTranslationsFromKeyMapToSheet(doc, lngMap, module, sheetId[i], header);
    });
  });
}

updateSheetFromJson();
