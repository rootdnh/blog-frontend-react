import { FormEvent, useEffect, useRef, useState } from "react";
import { createNewsRequest } from "../../services/requests/newsRequest";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext/authProvider";
import { categoriesRequest } from "../../services/requests/categoriesRequest";
import { ICategory } from "../../types/news.types";
import { IAlert } from "../../types/utils.types";
import AlertDefault from "../../components/alert/alertDefault";
import ErrorMessages from "../../utils/error.messages";

function CreateNews() {
 const user = useAuth();
 const [categories, setCategories] = useState<ICategory[]>([]);
 const { id } = user;
 const [showAlert, setShowAlert] = useState<IAlert>({
  isOpen: false,
 } as IAlert);
 const controller = useRef<AbortController | null>(null);
 const titleRef = useRef<HTMLInputElement | null>(null);
 const contentRef = useRef<HTMLTextAreaElement>(null);
 const categoryRef = useRef<HTMLSelectElement>(null);

 const handleHideAlert = () => {
  setShowAlert({ ...showAlert, isOpen: false });
 };

 const handleForm = (e: FormEvent) => {
  e.preventDefault();
  const signal = controller.current!.signal;
  const title = titleRef?.current?.value;
  const content = contentRef?.current?.value;
  const category = categoryRef?.current?.value;

  if (!category) {
   setShowAlert({
    isOpen: true,
    message: "Selecione uma categoria válida",
    type: "warning",
   });
  }

  if (title && content && category) {
   const idCategory = +category;

   createNewsRequest(
    {
     idUser: id,
     title,
     content,
     idCategory,
    },
    signal
   )
    .then((data) => {
      setShowAlert({
       isOpen: true,
       message: data ? "Notícia criada com sucesso" : ErrorMessages.unknownError,
       type: data ? "success" : "danger"
      });
      
      titleRef.current!.value = "";
      contentRef.current!.value = "";
      categoryRef.current!.value = "";
    })
    .catch((error) => {
     setShowAlert({
      isOpen: true,
      message: error.message || ErrorMessages.unknownError,
      type: "danger"
     });
    })
  }
 };

 const getCategories = (signal: AbortSignal) => {
  categoriesRequest({ signal })
   .then((response) => {
    if (response) setCategories(response);
   })
   .catch((error) => {
    console.error(error);
   });
 };

 useEffect(() => {
  controller.current = new AbortController();
  getCategories(controller.current.signal);

  return () => {
   if (controller.current) {
    controller.current.abort();
   }
  };
 }, []);

 return (
  <Container style={{minHeight: '80vh'}} className="mt-4">
   <h1>Criar nova notícia</h1>
   <Form onSubmit={handleForm}>
    <Form.Group className="mt-3">
     <Form.Select
      aria-label="Selecione a categoria"
      title="Selecione a categoria"
      ref={categoryRef}
     >
      <option value="">Categoria</option>
      {categories.length > 0 &&
       categories.map((item) => (
        <option value={item.id} key={item?.name}>
         {item?.name}
        </option>
       ))}
     </Form.Select>
    </Form.Group>
    <Form.Group className="mt-3">
     <Form.Control
      id="title"
      type="text"
      ref={titleRef}
      placeholder="Título da notícia"
      aria-description="cadastro do título da notícia"
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
      placeholder="Conteúdo da notícia"
      aria-description="cadastro do título da notícia"
      maxLength={2000}
      required
     />
     <Form.Text>O título deve conter no maximo 2000 caracteres.</Form.Text>
    </Form.Group>
    <Button type="submit" className="sm w-100 mt-4" variant="dark">
     Criar
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

export default CreateNews;
