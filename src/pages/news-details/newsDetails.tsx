import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import {format} from "date-fns"
import NotFound from "../not found/notFound";
import { INews } from "../../types/news.types";
import * as S from "./newsDetails.styles";

function NewsDetails() {
 const [news, setNews] = useState<INews | null>(null);
 const controller = useRef<AbortController | null>(null);
 const [error, setError] = useState<boolean>(false);
 const { slug } = useParams();

 useEffect(() => {
  controller.current = new AbortController();

  api
   .get(`/get-post/${slug}`, { signal: controller.current.signal })
   .then((response) => {
    setNews(response.data);
   })
   .catch((error) => {
    setError(true);
    console.error(error);
   });

  return () => {
   if (controller?.current) controller.current.abort();
  };
 }, []);

 return (
  <>
   {error && <NotFound />}

   {!error &&  
   <S.Container>
    <h1>{news?.title}</h1>
    <p>{news?.content} </p>
   
  
     <span>Criado por: {news?.user?.name}, em {news?.createdAt ? format(new Date(news?.createdAt), 'dd/MM/yyyy') : "Data não informada"}</span>
   </S.Container>
   }
  </>
 );
}

export default NewsDetails;
