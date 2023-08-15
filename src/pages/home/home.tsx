import { useCallback, useEffect, useRef, useState } from "react";
import { INews } from "../../@types/news.types";
import { api } from "../../services/api";
import { Button, Spinner } from "react-bootstrap";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const [isConnected, setIsConnected] = useState<boolean>(false);
 const [isLoading, setIsLoading] = useState<boolean>(true);


 useEffect(() => {
  const controller = new AbortController();

   function bringNews(){
    api.get<{msg: INews[]}>("/get-posts", {signal: controller.signal})
    .then((response)=>{
      setNews(response.data.msg);
      setIsLoading(false);
    })
    .catch((error)=>{
      if(error.status === 500) setIsConnected(true);
      setIsLoading(false);
      console.error(error);
    })
   }
  bringNews();
  
  return ()=>{
      controller.abort();
  }
}, []);

 return (
  <>
 
   {news.length > 0 && (
    news.map((data) => 
    <div key={data.title}>
     <h5 >{data.title}</h5>
     <p >{data.content}</p>
    </div>
    ) )}
   {isLoading && <Spinner size="sm"/>}
   {!isLoading &&  news.length === 0 && <span>Nenhuma noticia encontrada</span>}
   {isConnected && <span>Não conectado ao servidor <Button size="sm" variant="dark" onClick={()=> window.location.reload()}>Recarregar</Button></span>}
  </>
 );
}

export default Home;
