export interface ICategory {
  id?: number;
  name?: string;
  title?: string;
}

export interface INews{
  title?: string;
  content?: string;
  idUser?: string;
  idCategory?: number;
  token?: string;
  category?: ICategory
}