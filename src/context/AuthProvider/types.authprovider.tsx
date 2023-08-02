import React from "react";

export interface IUser {
  id?: string;
  email?: string;
  token?: string;
  password?: string
}
 
export interface IContext extends IUser{
  authenticate: (email: string, password: string)=> Promise<void>;
  logout: ()=> void
}

export interface IAuthProvider {
  children: React.JSX.Element;
}