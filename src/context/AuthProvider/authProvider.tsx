import { useEffect, useState, createContext } from "react";
import { IAuthProvider, IUser, IContext } from "./types.authprovider";
import { LoginRequest } from "../../utils/loginRequest";

const AuthContext = createContext<IContext>({} as IContext);

function authProvider({children}: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);

  async function authenticate(email: string, password: string){
    const response = await LoginRequest(email, password);
    setUser(response);
  }
  async function logout(){

  }

  return (
    <AuthContext.Provider value={{...user, authenticate, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default authProvider;