import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { api } from "../../../../services/api";
import { ICategory, INews } from "../../../../types/news.types";
import { categoriesRequest } from "../../../../services/requests/categoriesRequest";

export function PostEdit(){
  const {postSlug} = useParams();
  const [post, setPost] = useState<INews>({} as INews);
  const controller = useRef<AbortController | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getPost = () =>{
    api.get(`/get-post/${postSlug}`, {signal: controller?.current?.signal})
      .then((response)=>{
        if(response.data){
          setPost(response.data);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
  }

  const getCategories = () =>{
    categoriesRequest({signal: controller?.current?.signal})
      .then((response)=>{
        if(response){
          setCategories(response);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
  }

  useEffect(()=>{
    controller.current = new AbortController();
    getPost();
    getCategories();

    return ()=> controller?.current?.abort();
  }, [])
  
  return(
    <>
    PostEdit <br/>
    {post.id && <>
        {post.title}<br/>
        {post.category}<br/>
        {post.content}<br/>
      </> 
    }

    {categories.length > 0 && categories.map((category)=>(
      <>
        {category.name}
      </>
    ))
    }
    </>
  )
}