'use client';

function traverseObject(path: string, json: any) {
  const paths = path.split('.');
  let j: any = null;
  paths.forEach((p) => {
    if (!j) {
      j = json[p];
    } else {
      j = j[p];
    }
  });
  return j;
}

function makeStringWithOptions(str: string, options: any) {
  let resultString = str;
  Object.keys(options).forEach((k) => {
    resultString = resultString.replaceAll(`{${k}}`, options[k]);
  });

  return resultString;
}

export function useTranslation(locale: string, file: string, options = {}) {
  const loadJson = import(`/app/lib/locales/${locale}/${file}.json`).then((module) => {
    return module.default;
  });

  return {
    t: (path: string, options = {}) =>
      loadJson.then((res) => {
        let str = traverseObject(path, res);
        if (options) {
          str = makeStringWithOptions(str, options);
        }
        return str;
      }),

  };
}
