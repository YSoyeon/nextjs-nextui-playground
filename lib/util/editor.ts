export const getRandomSecuredLength = (length: number): number => {
	// length ~ length+5 범위의 난수를 생성
	const randomOffset = Math.floor(Math.random() * 6);

	// length와 같은 값이 나올 경우 다시 추출
	const result = length + randomOffset === length ? getRandomSecuredLength(length) : length + randomOffset;

	return result;
};
