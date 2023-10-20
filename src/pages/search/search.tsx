import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NewsProps } from "../../types/news.types";
import { genericRequest } from "../../services/requests/genericRequest";
import NewsSkeleton from "../../components/news-skeleton/newsSkeleton";
import News from "../../components/news/news";
import { DefaultPagination } from "../../components/pagination/defaultPagination";

interface SearchProps extends NewsProps{
  registers: number
}
export function Search() {
  const location = useLocation();
  const controller = useRef<AbortController | null>(null);
  const [news, setNews] = useState<SearchProps>({
    posts: [],
    maxPages: 0,
    actualPage: 1,
    registers: 0
   } as SearchProps);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [queryParam, setQueryParam] = useState<string | null>(null);

  const changePage = (page: number) => {
    setNews(prev => {
      return {...prev, actualPage: page};
    })
  }

  const getNews = (query: string, page = 1) =>{
    const signal = controller.current?.signal!;
    genericRequest<SearchProps>({route: `/posts?query=${query}&page=${page}`, signal})
      .then((response)=>{
        if(response?.posts) {
          const {maxPages, posts, registers} = response;
          setNews((prev)=> {
            return {...prev, maxPages, posts, registers}
          });
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
    const page = rawQuery.get("page")?.trim();

    if(!query) return;
    
    setQueryParam(query);

    if(!page) return navigate(`?q=${query}&page=1`);
    
    getNews(query, +page);
  
    return () => {
      controller.current?.abort();
    }

  }, [location.search])

  useEffect(()=>{
    if(!queryParam) return;
    navigate(`?q=${queryParam}&page=${news.actualPage}`);
  }, [news.actualPage, queryParam]);

 return (
  <Container className="pt-3">

   {isLoading && [...Array(10)].map(()=> <NewsSkeleton />)}
  
   {!isLoading && news.posts.length <= 0 && <span className="p-3">Nenhum item correspondente :(</span>}

   {news.posts.length > 0 && <>
    <p>{news.registers} resultados encontrados.</p>
    <News news={news.posts} />
    </>
   }

   {news.registers > 5 && (
    <DefaultPagination
     changePage={changePage}
     maxPages={news.maxPages}
     actualPage={news.actualPage}
    />)
    }
  </Container>
 );
}
