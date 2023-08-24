export interface IAlert {
  type: "warning" | "success" | "danger";
  isOpen: boolean;
  message: string;
 }