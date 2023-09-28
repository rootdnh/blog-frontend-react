import { useEffect, useRef, useState } from "react";
import { genericRequest } from "../../../services/requests/genericRequest";
import  {INews} from "../../../types/news.types";
import * as S from "./postManagement.styles";

export function PostManagement(){
  const [posts, setPosts] = useState<INews[]>([]);
  const controller = useRef<AbortController | null>(null);

  const getData = () =>{
    genericRequest<{posts: INews[]}>({route: '/get-posts', signal: controller.current?.signal!})
      .then((response)=>{
        if(response?.posts){
          setPosts(response.posts);
        }
      })
  }

  useEffect(()=>{
    controller.current = new AbortController();
    getData();

    return ()=> controller?.current?.abort();
  }, [])

  return(
    <>
      {posts?.length > 0 && posts?.map((post)=>{
        return (
        <S.Container key={post.id}>
          <S.Title>
            {post.title}
          </S.Title>
          <S.Title>
            {post.content}
          </S.Title>
        </S.Container>)
      })}
    </>
  )
}