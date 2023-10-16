import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { INews } from "../../types/news.types";
import { genericRequest } from "../../services/requests/genericRequest";
import NewsSkeleton from "../../components/news-skeleton/newsSkeleton";
import News from "../../components/news/news";

export function Search() {
  const location = useLocation();
  const controller = useRef<AbortController | null>(null);
  const [news, setNews] = useState<INews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNews = (query: string) =>{
    const signal = controller.current?.signal!;
    genericRequest<INews[]>({route: `/posts?search=${query}`, signal})
      .then((response)=>{
        if(response) {
          setNews(response);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
      .finally(()=>{
        setIsLoading(false);
      })
  }

  useEffect(()=>{
    controller.current = new AbortController();
    const rawQuery = new URLSearchParams(location.search);
    const query = rawQuery.get("q")?.trim();

    if(query){
      getNews(query);
    }

  }, [location.search])

 return (
  <Container className="pt-3">
    {isLoading && [...Array(10)].map((_,idx)=>{
      return <NewsSkeleton />
    })}

  {!isLoading && news.length <= 0 && <span className="p-3">Nenhum item correspondente :(</span>}

    {news.length > 0 && <News news={news} />}
  </Container>
 );
}
