import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { IUser } from "../../context/AuthProvider/types.authprovider";
import LoginRequest from "../../utils/loginRequest";
import { setLocalStorage } from "../../utils/localStorageManage";
import { useNavigate } from "react-router-dom";

interface IAlert {
 type: string;
 isOpen: boolean;
 message: string;
}

export function Login() {
 const [user, setUser] = useState<IUser | null>({} as IUser);
 const [showAlert, setShowAlert] = useState<IAlert | null>({} as IAlert);
 const navigate = useNavigate();

 const handleForm = async (event: React.FormEvent) => {
  event.preventDefault();

  if (user?.email && user?.password) {
   const data = await LoginRequest(user?.email, user?.password);

   if (!data) {
    setShowAlert({
     type: "warning",
     isOpen: true,
     message: "Email ou senha estão incorretos",
    });
   } else {
    const { token } = data;
    const isStored = setLocalStorage("@utk", token);

    if (isStored) {
     setShowAlert({
      type: "success",
      isOpen: true,
      message: "Logado com sucesso!",
     });
     navigate("/home");
    }
   }
  }
 };

 return (
  <form onSubmit={handleForm}>
   <label htmlFor="email">email</label>
   <input
    type="text"
    id="email"
    placeholder="email"
    value={user?.email ?? ""}
    onChange={(e) => {
     setUser({ ...user, email: e.target.value });
    }}
   />
   <label htmlFor="pass">password</label>
   <input
    type="text"
    id="pass"
    placeholder="password"
    value={user?.password ?? ""}
    onChange={(e) => {
     setUser({ ...user, password: e.target.value });
    }}
   />

   <button type="submit">Send</button>
   {showAlert?.isOpen && (
    <Alert
     variant={showAlert?.type}
     onClose={() => setShowAlert({ ...showAlert, isOpen: false })}
     dismissible
    >
     {showAlert?.message}
    </Alert>
   )}
  </form>
 );
}
