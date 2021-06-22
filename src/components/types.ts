export type Info = {
  _id: string;
  title: string;
  author: string;
  content: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type Data = {
  posts: Info[];
};
export type Status = {
  success: boolean;
};
export type Post = {
  success: Status;
  data: Data[];
};
