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
import { api } from "../../../services/api";
import { StandardToast } from "../../../components/toast/toast";
import { Pagination } from "react-bootstrap";
import { Container } from "react-bootstrap";


export function PostManagement() {
 const [posts, setPosts] = useState<{items: INews[], maxPages: number}>({items: [], maxPages: 0});
 const controller = useRef<AbortController | null>(null);
 const [showModal, setShowModal] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [modalProps, setModalPros] = useState<{ id: number; title: string }>();
 const [showToast, setShowToast] = useState<{ open: boolean; message: string }>(
  { open: false, message: "" }
 );

 const getData = () => {
  genericRequest<{ posts: INews[], maxPages: number }>({
   route: `/get-posts?page=${currentPage}&limit=10`,
   signal: controller.current?.signal!,
  }).then((response) => {
   if (response?.posts) {
    setPosts({items: response.posts, maxPages: response.maxPages });
   }
  });
 };

 useEffect(()=>{
  controller.current = new AbortController();
  getData();
  return ()=> controller.current?.abort();
 }, [currentPage])

 const deletePost = (id: number | undefined, title: string | undefined) => {
  if (id && title) {
   setModalPros({ id, title });
   setShowModal(true);
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

 const handleDelete = (confirmed: boolean, id: number) => {
  if (confirmed && id) {
   api
    .delete(`/delete-post/${id}`)
    .then((response) => {
     if (response.data.id) {
      setShowToast({
       open: true,
       message: `Post com id ${id} excluido com sucesso`,
      });
      getData();
     }
    })
    .catch((err) => {
     setShowToast({ open: true, message: err.message });
    });
   setShowModal(false);
  }
 };

 useEffect(() => {
  controller.current = new AbortController();
  getData();

  return () => controller?.current?.abort();
 }, []);

 return (
  <>
   <ModalToConfirm
    modalProps={modalProps!}
    modalState={showModal}
    callback={handleDelete}
    closeModal={() => setShowModal(false)}
   />
   <StandardToast
    showToast={showToast.open}
    closeToast={() => setShowToast({ ...showToast, open: false })}
    message={showToast.message}
   />
   <h1 className="m-3">
    Gerenciamento de posts
    <br />
   </h1>
   <Container className="d-flex flex-column relative" style={{minHeight: "80vh"}}>
   <S.Container
    className="mb-5 post-header"
    style={{ textAlign: "center", maxHeight: "3rem"}}
   >
    <S.Title>Título</S.Title>
    <S.Title>Conteúdo</S.Title>
    <S.Title>Categoria</S.Title>
    <S.Title>Ações</S.Title>
   </S.Container>
   {posts.items?.length <= 0 && (
    <S.Container style={{ textAlign: "center" }}>
     Nenhuma notícia encontrada...
    </S.Container>
   )}
   {posts.items?.length > 0 &&
    posts.items?.map((post) => {
     return (
      <S.Container key={post.id}>
       <S.Title>{post.title}</S.Title>
       <S.Title>{post.content}</S.Title>
       <S.Title>{post.category?.name}</S.Title>
       <S.ButtonsContainer>
        <OverlayTrigger placement="top" overlay={tooltipEdit}>
         <LinkContainer to={`/management/posts/edit/${post.slug}`}>
          <Button variant="dark">
           <SlPencil />
          </Button>
         </LinkContainer>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={tooltipDelete}>
         <Button
          id="delete"
          onClick={() => deletePost(post?.id, post?.title)}
          variant="dark"
         >
          <SlTrash />
         </Button>
        </OverlayTrigger>
       </S.ButtonsContainer>
      </S.Container>
         

     );
    })}

   <Pagination className="d-flex justify-content-center relative mt-auto pt-3">
    {Array.from({length: posts.maxPages}).map((_, idx)=>{
      let page = idx + 1;
      return (
      <Pagination.Item 
        onClick={()=> setCurrentPage(page)}
        active={currentPage === page}
        key={`pagination-${page}`} >
      {page}
      </Pagination.Item>)

      })
    }
   </Pagination>
   </Container>
  </>
 );
}
