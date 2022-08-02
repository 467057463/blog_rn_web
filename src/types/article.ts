export type ArticleItem = {
  author: {
    username: string;
    _id: string;
  };
  category: 'TECHNICAL' | 'LIFE' | 'PRIVACY' | 'DRAFT';
  comments: any[];
  content: string;
  createdAt: string;
  cover: string;
  describe: string;
  id: string;
  meta: {
    view: number;
    likeUsers: any[];
    like: number;
  };
  tags: { _id: string; name: string }[];
  title: string;
  updatedAt: string;
  _id: string;
};

export type GetArticlesRespon = {
  list: ArticleItem[];
  meta: {
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    size: number;
    total: number;
    totalPage: number;
  };
};
