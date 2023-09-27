import { IMenuLinks } from "../../types/utils.types";

export const menuLinks: Record<string, IMenuLinks> = {
  home: {
   path: "/",
   name: "Home",
   visible: true
  },
  createNews: {
   path: "/create-news",
   name: "Criar notícia",
   visible: true
  },
  login: {
   path: "/login",
   name: "Entrar",
   visible: true

  },
  logout: {
   path: "/",
   name: "Sair",
   visible: true
  }
};
