import { useState, createContext, useContext, useEffect } from "react";
import { IAuthProvider, IUser, IContext } from "../../types/authprovider.types";
import LoginRequest  from "../../services/requests/loginRequest";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorageManage";
const AuthContext = createContext<IContext>({} as IContext);
import { api } from "../../services/api";

export function AuthProvider({children}: IAuthProvider): React.JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(()=>{
    const data = getLocalStorage("@utk");
    api.get("/auth-verify")
    .then((response)=>{
      if(response) setUser({...data});
    })
    .catch((error)=>{
      console.error(error);
    });
    }, [])

    async function authenticate(email: string, password: string): Promise<boolean> {
      try {
        const response = await LoginRequest(email, password);
        const avatar = response?.avatar?.url || null;
    
        if (response) {
          setUser({ ...response, avatar });
          const toSaveInLocal = {
            id: response.id,
            email: response.email,
            token: response.token,
            avatar,
          };
          setLocalStorage("@utk", toSaveInLocal);
          return true; 
        } 
        return false; 
      } catch (error) {
        console.error(error);
        throw error; 
      }
    }
    

  async function logout(){
    setLocalStorage("@utk",{});
    setUser(null);
  }

  function isAuthenticated(): boolean{
    return (user?.id) ?  true : false;
  }

  return (
    <AuthContext.Provider value={{...user, authenticate, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
