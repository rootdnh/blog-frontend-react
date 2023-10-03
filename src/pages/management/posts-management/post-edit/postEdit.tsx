import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../services/api";
import { ICategory, INews } from "../../../../types/news.types";
import { categoriesRequest } from "../../../../services/requests/getCategoriesRequest";
import { Form, Button } from "react-bootstrap";
import AlertDefault from "../../../../components/alert/alertDefault";
import { Container } from "react-bootstrap";
import { IAlert } from "../../../../types/utils.types";

export function PostEdit() {
 const { postSlug } = useParams();
 const [post, setPost] = useState<INews>({} as INews);
 const controller = useRef<AbortController | null>(null);
 const [showAlert, setShowAlert] = useState<IAlert>({isOpen: false} as IAlert);
 const [categories, setCategories] = useState<ICategory[]>([]);
 const categoryRef = useRef<HTMLSelectElement | null>(null);
 const titleRef = useRef<HTMLInputElement | null>(null);
 const contentRef = useRef<HTMLTextAreaElement | null>(null);

 const getPost = () => {
  api
   .get(`/get-post/${postSlug}`, { signal: controller?.current?.signal })
   .then((response) => {
    if (response.data) {
      const {title, idCategory, content} = response.data;
      if(title && idCategory && content){
        titleRef.current!.value = title;
        categoryRef.current!.value = idCategory;
        contentRef.current!.value = content;

        setPost(response.data);
      }
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };

 const handleHideAlert = () => {
  setShowAlert({ ...showAlert, isOpen: false });
 };

 const getCategories = () => {
  categoriesRequest({ signal: controller?.current?.signal })
   .then((response) => {
    if (response) {
     setCategories(response);
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };

 useEffect(() => {
  controller.current = new AbortController();
  getPost();
  getCategories();

  return () => controller?.current?.abort();
 }, []);

 const update = (e: FormEvent) =>{
  e.preventDefault();
  const idCategory = categoryRef?.current?.value;
  const title = titleRef?.current?.value; 
  const content = contentRef?.current?.value;
  const {id, idUser} = post;

  if(idCategory && title && content && id && idUser){
    api.put("/update-post", {
      id, 
      idUser,
      idCategory,
      title,
      content
    }, {
      signal: controller?.current?.signal
    })
      .then(()=>{
        setShowAlert({type: "success", message: "Notícia atualizada com sucesso" , isOpen: true });
      })
      .catch((err)=>{
        setShowAlert({type: "danger", message: err.message , isOpen: true });
        console.error(err);
      })
  }
 }

 return (
   <Container style={{ minHeight: "80vh" }} className="mt-4">
    <h1>Alterar notícia</h1>
    <Form onSubmit={update}>
     <Form.Group className="mt-3">
      <Form.Select
       aria-label="Selecione a categoria"
       title="Selecione a categoria"
       ref={categoryRef}
      >
       {categories.length > 0 &&
        categories.map((item) => {
         if (item.id == post?.idCategory) {
          return (
           <option selected={true} value={item.id} key={item?.name}>
            {item?.name}
           </option>
          );
         }
         return (
          <option value={item.id} key={item?.name}>
           {item?.name}
          </option>
         );
        })}
      </Form.Select>
     </Form.Group>
     <Form.Group className="mt-3">
      <Form.Control
       id="title"
       type="text"
       ref={titleRef}
       placeholder="Título da notícia"
       aria-description="Título da notícia"
       maxLength={60}
       required
      />
      <Form.Text>O título deve conter no máximo 60 caracteres.</Form.Text>
     </Form.Group>
     <Form.Group className="mt-3">
      <Form.Control
       id="content"
       type="text"
       ref={contentRef}
       as="textarea"
       placeholder={post.content}
       aria-description="Atualizar conteúdo da notícia" 
       style={{minHeight: "200px"}}
       maxLength={2000}
       required
      />
      <Form.Text>O título deve conter no maximo 2000 caracteres.</Form.Text>
     </Form.Group>
     <Button type="submit" className="sm w-100 mt-4" variant="dark">
      Atualizar
     </Button>
    </Form>
    <AlertDefault
     handleHideAlert={handleHideAlert}
     isOpen={showAlert.isOpen}
     message={showAlert.message}
     type={showAlert.type}
    />
   </Container>
 );
}
