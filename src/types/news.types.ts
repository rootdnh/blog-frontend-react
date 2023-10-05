import { IUser } from "./authprovider.types";

export interface ICategory {
  id?: number;
  name?: string;
  title?: string;
}

export interface INews {
  id?: number,
  title?: string;
  content?: string;
  idUser?: string;
  idCategory?: number;
  token?: string;
  slug?: string;
  createdAt?: Date;
  category?: ICategory;
  user?: IUser
}

export interface NewsProps {
  posts: INews[];
  maxPages: number;
  actualPage: number
 }