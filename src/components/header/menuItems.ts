import { IMenuLinks } from "../../types/utils.types";

export const menuLinks: Record<string, IMenuLinks> = {
  home: {
   path: "/",
   name: "Home"
  },
  createNews: {
   path: "/create-news",
   name: "Criar notícia"
  },
  configs: {
   path: "/settings",
   name: "Configurações"
  },
  login: {
   path: "/login",
   name: "Logar"
  },
  logout: {
   path: "/",
   name: "Sair"
  }
};
