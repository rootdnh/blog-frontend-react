export interface IAlert {
  type: "warning" | "success" | "danger";
  isOpen: boolean;
  message: string;
 }

 export interface IMenuLinks {
  path: string,
  name: string,
  visible: boolean
 }