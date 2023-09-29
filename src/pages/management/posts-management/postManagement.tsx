import { useEffect, useRef, useState } from "react";
import { genericRequest } from "../../../services/requests/genericRequest";
import { INews } from "../../../types/news.types";
import Button from "react-bootstrap/Button";
import { SlPencil, SlTrash } from "react-icons/sl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import * as S from "./postManagement.styles";
import { LinkContainer } from "react-router-bootstrap";
import { ModalToConfirm } from "../../../components/modal-to-confirm/modalToConfirm";

export function PostManagement() {
 const [posts, setPosts] = useState<INews[]>([]);
 const controller = useRef<AbortController | null>(null);
 const [showModal, setShowModal] = useState(false)
 const [modalProps, setModalPros] = useState<{id: number, title: string}>();

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

 const deletePost = (id: number | undefined, title: string | undefined) => {
  if (id && title) {
   console.log(">>", id, title);
   setModalPros({id, title});
   setShowModal(true)
  }
 };

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

 const handleDelete = (confirmed: boolean) => {
    
    setShowModal(false);
}

 useEffect(() => {
  controller.current = new AbortController();
  getData();

  return () => controller?.current?.abort();
 }, []);

 return (
  <>
   <ModalToConfirm modalProps={modalProps!} modalState={showModal} callback={handleDelete} closeModal={()=> setShowModal(false)}/>
   
   {posts?.length > 0 &&
    posts?.map((post) => {
     return (
      <S.Container key={post.id}>
       <S.Title>{post.title}</S.Title>
       <S.Title>{post.content}</S.Title>
       <S.ButtonsContainer>
        <OverlayTrigger placement="top" overlay={tooltipEdit}>
         <Button variant="dark">
          <LinkContainer to={`/management/posts/edit/${post.id}`}>
           <SlPencil />
          </LinkContainer>
         </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={tooltipDelete}>
         <Button id="delete" onClick={() => deletePost(post?.id, post?.title)} variant="dark">
          <SlTrash />
         </Button>
        </OverlayTrigger>

       </S.ButtonsContainer>
      </S.Container>
     );
    })}
  </>
 );
}
