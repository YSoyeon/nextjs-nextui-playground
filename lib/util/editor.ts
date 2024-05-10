import CryptoJS from 'crypto-js';

export const getRandomSecuredLength = (length: number): number => {
  // length ~ length+5 범위의 난수를 생성
  const randomOffset = Math.floor(Math.random() * 6);

  // length와 같은 값이 나올 경우 다시 추출
  const result =
    length + randomOffset === length
      ? getRandomSecuredLength(length)
      : length + randomOffset;

  return result;
};

export const encrypt = (text: string) =>  CryptoJS.AES.encrypt(
    text,
    process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY!,
  ).toString()


export const descrypt = (text: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      text,
      process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY!,
    );
    const descrypted = bytes.toString(CryptoJS.enc.Utf8);
    return descrypted;
  } catch (err) {
    console.error(err);
    return '';
  }
};
