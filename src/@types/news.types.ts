export interface ICategory {
  name?: string
}

export interface INews{
  title?: string;
  content?: string;
  idUser?: string;
  category: ICategory
}