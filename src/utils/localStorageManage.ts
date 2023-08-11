import { IUser } from "../@types/authprovider.types";

export function setLocalStorage(key: string, data: object){
  try {
   localStorage.setItem(key, JSON.stringify(data));
   return true;
  } catch (error) {
   console.error("Error when trying to save a data in local storage");
   return false;
  }
 };

 export function getLocalStorage(key: string): IUser | null{
  try {
   const data = localStorage.getItem(key);
   if(data) return JSON.parse(data) ;
  } catch (error) {
   console.error("Error when trying to get a data in local storage");
  }
  return null;
 };



