declare type BlockType = {
  id: string;
  encrypted: string;
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
