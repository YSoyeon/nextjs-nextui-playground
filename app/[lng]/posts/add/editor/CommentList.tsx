import React, { useEffect } from "react";
import useInput from "@/lib/hooks/useInput";
import { Input } from "@nextui-org/react";

type Props = {
	commentObj: CommentType;
	addComment: (parentId: string, comment: string) => void;
};

/**
 * @todo 전체 댓글 목록 조회

 * @param param0 
 * @returns 
 */
const CommentList = ({ commentObj, addComment }: Props) => {
	const { value, onChange, setValue } = useInput();
	const inputRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log("comment obj");
		console.log(commentObj);
	}, [commentObj]);

	if (!commentObj) return <>Comments</>;

	return (
		<div className="h-full">
			<h1 className="text-black">Comments</h1>
			<div style={{ padding: "0 1rem" }}>
				<h4 style={{ borderLeft: "3px solid black", paddingLeft: "0.5rem" }}>{commentObj.content}</h4>
			</div>
			<div className="text-black">
				{commentObj.comments && commentObj.comments.length ? (
					commentObj.comments.map((comment) => (
						<div className="comment" key={comment.id}>
							<div>
								<span className="userName">{comment.userName}</span>
								<span className="createdAt">{comment.createdAt.toLocaleDateString()}</span>
							</div>

							<span className="content">{comment.comment}</span>
						</div>
					))
				) : (
					<span className="pt-8 text-center text-slate-400">No comments yet</span>
				)}
				<div>
					<Input ref={inputRef} value={value} onChange={onChange} placeholder="Add a comment" />
					<button
						onClick={() => {
							addComment(commentObj.parentId, value);
							setValue("");
						}}
					>
						add
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommentList;
