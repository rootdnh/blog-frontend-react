export interface ICategory {
  id?: number;
  name?: string;
  title?: string;
}

export interface INews{
  id?: number,
  title?: string;
  content?: string;
  idUser?: string;
  idCategory?: number;
  token?: string;
  slug?: string;
  category?: ICategory
}