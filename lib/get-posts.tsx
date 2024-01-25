export const getPosts = async (): Promise<PostType[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, title: "json-server 공부하기" },
				{ id: 2, title: "시리즈 읽어보기" },
				{ id: 3, title: "취약점 제보" },
				{ id: 4, title: "ptaas" },
			]);
		}, 500);
	});
};
