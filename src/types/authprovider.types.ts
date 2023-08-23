import React from "react";

export interface IUser {
  id?: string;
  email?: string;
  token?: string;
  password?: string;
  avatar?: string | null
}
 
export interface IContext extends IUser{
  authenticate: (email: string, password: string)=> Promise<boolean>;
  logout: ()=> void;
  isAuthenticated: ()=> boolean
}

export interface IAuthProvider {
  children: React.JSX.Element;
}