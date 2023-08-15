import { useCallback, useEffect, useRef, useState } from "react";
import { INews } from "../../@types/news.types";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const [isConnected, setIsConnected] = useState<boolean>(false);
 const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
 const controller = useRef<AbortController | null>(null);

  const bringNews = useCallback(async ()=> {
    try {
      controller.current = new AbortController();
      const response = await api.get<{ msg: INews[] }>("/get-posts", {signal: controller.current.signal});
      if (response?.data?.msg) setNews(response?.data?.msg);
    } catch (error: any) {
      if(error.status === 500) setIsConnected(true);
      if(error.status === 401) setIsAuthorized(true);
      console.error(error.message);
    }
  }, []);

 useEffect(() => {
  bringNews();
  
  return ()=>{
    if(controller.current){
      controller.current.abort();
    }
  }
}, []);

 return (
  <>
 
   {news.length > 0 ? (
    news.map((data) => 
    <>
     <h5 key={data.title}>{data.title}</h5>
     <p>{data.content}</p>
    </>
    )
   ) : <h2>Nenhuma notícia encontrada :)</h2>
   }
   {isConnected && <span>Não conectado ao servidor <Button size="sm" variant="dark" onClick={()=> window.location.reload()}>Recarregar</Button></span>}
   {isAuthorized && <span>Não autorizado! <Link to={"/login"}>Entrar?</Link></span>}
  </>
 );
}

export default Home;
