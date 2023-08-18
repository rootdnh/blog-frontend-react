import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { createNewsRequest } from "../../services/requests/newsRequest";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider/authProvider";
import { categoriesRequest } from "../../services/requests/categoriesRequest";
import { ICategory } from "../../@types/news.types";

function CreateNews() {
 const user = useAuth();
 const [categories, setCategories] = useState<ICategory[]>([]);
 const { id } = user;
 const controller = useRef<AbortController | null>(null);
 const titleRef = useRef<HTMLInputElement>(null);
 const contentRef = useRef<HTMLTextAreaElement>(null);
 const categoryRef = useRef<HTMLSelectElement>(null);

 const handleForm = (e: FormEvent) => {
  e.preventDefault();
  console.log(
   "title",
   titleRef?.current?.value.trim(),
   "content",
   contentRef?.current?.value
  );
  const signal = controller.current!.signal;

  const title = titleRef?.current?.value;
  const content = contentRef?.current?.value;
  const category = categoryRef?.current?.value;
  console.log("cat", category)
  if(!category) alert("Selecione uma categoria válida!")
  
  if (title && content && category) {
   const idCategory = +category;

   console.log({
       idUser: id,
       title,
       content,
       idCategory,
      })
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
     console.log(data);
    })
    .catch((error) => {
     console.log(error);
    })
    .finally(() => {
     console.log("TERMINOU");
    });
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
 const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {};

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
  <Container className="mt-4">
   <h1>Criar nova notícia</h1>
   <Form onSubmit={handleForm}>
    <Form.Group className="mt-3">
     <Form.Select
      onChange={handleSelectCategory}
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
  </Container>
 );
}

export default CreateNews;
