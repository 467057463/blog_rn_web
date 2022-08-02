export type TagItem = {
  _id: string;
  name: string;
};

export type GetTagRespon = TagItem[];

export type AddTagRespon = {
  _id: string;
  name: string;
  articles: any[];
};
