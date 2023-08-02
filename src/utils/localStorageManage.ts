
export function setLocalStorage(key: string, data: string){
  try {
   localStorage.setItem(key, JSON.stringify(data));
   return true;
  } catch (error) {
   console.log("Error when trying to save a data in local storage");
   return false;
  }
 };

 
 export function getLocalStorage(key: string){
  try {
   const data = localStorage.getItem(key);
   return data;
  } catch (error) {
   console.log("Error when trying to get a data in local storage");
   return false;
  }
 };


