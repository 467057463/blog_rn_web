export type LoginRespon = {
  token: string;
  user: {
    _id: string;
    username: string;
  };
};
