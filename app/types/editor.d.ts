declare type BlockType = {
  id: string;
  content: string;
  from: number;
  to: number;
};

declare type CommentType = {
  parentId: string;
  content: string;
  comments: {
    id: string;
    userName: string;
    comment: string;
    replies: string[];
    createdAt: Date;
  }[];
};
