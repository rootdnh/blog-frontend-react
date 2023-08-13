import { useCallback, useEffect, useRef, useState } from "react";
import { INews } from "../../@types/news.types";
import { api } from "../../services/api";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const controller = useRef<AbortController | null>(null);

  const bringNews = useCallback(async ()=> {
    try {
      controller.current = new AbortController();
      const response = await api.get<{ msg: INews[] }>("/get-posts", {signal: controller.current.signal});
      if (response?.data?.msg) setNews(response?.data?.msg);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

 useEffect(() => {
  bringNews();
  
  return ()=>{
    if(controller.current){
      controller.current.abort();
    }
  }
}, [bringNews]);

 return (
  <>
 
   {news.length > 0 ? (
    news.map((data) => 
    <>
     <h5 key={data.title}>{data.title}</h5>
     <p>{data.content}</p>
    </>
    )
   ) : <h2>Nenhuma notícia encontrado :)</h2>
   }
  </>
 );
}

export default Home;
