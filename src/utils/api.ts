export interface ICategory {
  id: string;
  slug: string;
  title: string;
  img: string;
}
export interface IPage {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img: null;
  views: number;
  catSlug: string;
  userEmail: string;
}
interface IUser {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
}
export interface IPost extends IUser, IPage {}

export interface IComment extends IUser {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;
  postSlug: string;
}
