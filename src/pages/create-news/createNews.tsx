import { useEffect, useRef, useState } from "react";
import { createNewsRequest } from "../../services/requests/newsRequest";
import { Form } from "react-bootstrap";
import { getLocalStorage } from "../../utils/localStorageManage";
import { IUser } from "../../@types/authprovider.types";

function CreateNews(){
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState<IUser | null>(null);
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(()=>{
    const user = getLocalStorage("@utk");
    setUser({id: user?.id});
    
    

  }, [])
  return (
  <Form>
    <h1>Cretae news</h1>
  </Form>
  )
}

export default CreateNews;