import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
	return (
		<div className="flex h-screen w-screen justify-center align-center">
			<Spinner />
		</div>
	);
};
export default Loading;
