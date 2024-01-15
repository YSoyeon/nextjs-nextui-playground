const fs = require('fs');
const { mkdirp } = require('mkdirp');
const {
  loadSpreadsheet,
  localesPath,
  modules,
  lngs,
  sheetId,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
} = require('./index');

/**
 *
 * @param {*} lngsMap {}
 * @param {*} row string[], ex) ['key1','key2','key3','ko','en']
 */

function gatherKeyMap(lng, lngsMap, headerValues, i, row, prevKey) {
  if (i === headerValues.length) return;

  const headerValue = headerValues[i];
  const key = row.get(headerValue);

  if (headerValue.includes('key')) {
    if (!key) gatherKeyMap(lng, lngsMap, headerValues, i + 1, row, prevKey);
    else {
      if (prevKey) {
        if (!lngsMap[prevKey][key]) lngsMap[prevKey] = { ...lngsMap[prevKey], [key]: {} };
      } else {
        if (!lngsMap[key]) lngsMap[key] = {};
      }

      gatherKeyMap(lng, prevKey ? lngsMap[prevKey] : lngsMap, headerValues, i + 1, row, key);
    }
  } else {
    if (headerValue === lng) {
      lngsMap[prevKey] = key ? key : '';
      return;
    } else {
      gatherKeyMap(lng, lngsMap, headerValues, i + 1, row, prevKey);
    }
  }
}

async function fetchTranslationsFromSheetToJson(doc, sheetId) {
  const sheet = doc.sheetsById[sheetId];

  if (!sheet) {
    return {};
  }

  await sheet.loadHeaderRow();
  const headerValues = sheet.headerValues;

  const lngsMap = {};
  const rows = await sheet.getRows();

  lngs.forEach((lng) => {
    lngsMap[lng] = {};
    rows.forEach((row) => {
      gatherKeyMap(lng, lngsMap[lng], headerValues, 0, row, null);
    });
  });

  return lngsMap;
}

function checkAndMakeLocaleDir(dirPath, subDirs) {
  return new Promise((resolve, reject) => {
    const promises = subDirs.map((subDir) => {
      const fullPath = `${dirPath}/${subDir}`;
      return new Promise((resolve) => {
        mkdirp(fullPath)
          .then(() => {
            resolve();
          })
          .catch((e) => console.error(e));
      });
    });

    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function updateJsonFromSheet() {
  await checkAndMakeLocaleDir(localesPath, lngs);

  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      throw error;
    }

    modules.forEach(async (module, i) => {
      const doc = await loadSpreadsheet();
      const lngsMap = await fetchTranslationsFromSheetToJson(doc, i);

      lngs.forEach((lng) => {
        const localeJsonFilePath = `${localesPath}/${lng}/${module}.json`;

        const jsonString = JSON.stringify(lngsMap[lng], null, 2);

        fs.writeFile(localeJsonFilePath, jsonString, 'utf8', (err) => {
          if (err) {
            throw err;
          }
        });
      });
    });
  });
}

updateJsonFromSheet();
