import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {api} from "../../services/api"; 
import { INews } from "../../types/news.types";

function NewsDetails(){
  const [news, setNews] = useState<INews | null >(null);
  const controller = useRef<AbortController | null>(null);
  const {slug} =  useParams();
   
  useEffect(()=>{
    controller.current = new AbortController();

    api.get(`/get-post/${slug}`, {signal: controller.current.signal})
      .then((response)=>{
        setNews(response.data);
      })
      .catch((error)=>{
        console.error(error);
      })
    
      return ()=>{
       if (controller?.current) controller.current.abort()
    }
  }, [])
  return (
    <>
      {news?.slug}  
      {news?.title} 
      {news?.content} 
    </>
  );
}
 
export default NewsDetails;