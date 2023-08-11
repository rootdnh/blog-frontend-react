import { useEffect, useState } from "react";
import { INews } from "../../@types/news.types";
import { api } from "../../services/api";

function Home() {
 const [news, setNews] = useState<INews[]>([]);

 useEffect(() => {
  async function bringNews() {
   const response = await api.get<{ msg: INews[] }>("/get-posts");
   if (response?.data?.msg) setNews(response?.data?.msg);
  }

  bringNews();
 }, []);

 return (
  <>
 
   {
   news.length > 0 ? (
    news.map((data) => <h3 key={data.title}>{data.title}</h3>)
   ) : <h2>Nenhum item cadastrado :)</h2>
   }
  </>
 );
}

export default Home;
