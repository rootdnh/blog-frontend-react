import { useEffect, useRef, useState } from "react";
import { genericRequest } from "../../../services/requests/genericRequest";
import { INews } from "../../../types/news.types";
import Button from "react-bootstrap/Button";
import { SlPencil, SlTrash } from "react-icons/sl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import * as S from "./postManagement.styles";
import { LinkContainer } from "react-router-bootstrap";


export function PostManagement() {
 const [posts, setPosts] = useState<INews[]>([]);
 const controller = useRef<AbortController | null>(null);

 const getData = () => {
  genericRequest<{ posts: INews[] }>({
   route: "/get-posts",
   signal: controller.current?.signal!,
  }).then((response) => {
   if (response?.posts) {
    setPosts(response.posts);
   }
  });
 };

 const deletePost = (id: number | undefined)=>{
  if(id){
    //implements delete
  }
 }

 const tooltipEdit = (props: any) => (
  <Tooltip id="tooltip-top" {...props}>
   Editar
  </Tooltip>
 );

 const tooltipDelete = (props: any) => (
  <Tooltip id="tooltip-top" {...props}>
   Deletar
  </Tooltip>
 );

 useEffect(() => {
  controller.current = new AbortController();
  getData();

  return () => controller?.current?.abort();
 }, []);

 return (
  <>
   {posts?.length > 0 &&
    posts?.map((post) => {
     return (
      <S.Container key={post.id}>
       <S.Title>{post.title}</S.Title>
       <S.Title>{post.content}</S.Title>
       
       <OverlayTrigger placement="top" overlay={tooltipEdit}>
        <Button variant="dark">
         <LinkContainer to={`/edit/post/${post.id}`}>
          <SlPencil />
         </LinkContainer>
        </Button>
       </OverlayTrigger>

       <OverlayTrigger placement="top" overlay={tooltipDelete}>
        <Button onClick={() => deletePost(post?.id)} variant="dark">
         <SlTrash />
        </Button>
       </OverlayTrigger>
      </S.Container>
     );
    })}
  </>
 );
}
