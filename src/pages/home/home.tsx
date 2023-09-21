import { useEffect, useRef, useState } from "react";
import { INews } from "../../types/news.types";
import { api } from "../../services/api";
import {
 Button,
 Container,
 Spinner,
 ToastContainer,
 Toast,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMessages from "../../utils/error.messages";
import News from "../../components/news/news";
import HttpError from "../../utils/HttpError";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const [httpErrors, setHttpErrors] = useState<{
  message: string,
  error: boolean
 }>({
  message: '',
  error: false
 });
 const [isLoading, setIsLoading] = useState<boolean>(true);
 const [showToast, setShowToast] = useState<boolean>(false);
 const controller = useRef<AbortController | null>(null);

 function getNews(signal: AbortSignal) {
  //duplicate setLoading because using .finally method don't work the logic 
  //in !isLoading below, just in ms, but isn't cool
  api
   .get("/get-posts", { signal })
   .then((response) => {
    setNews(response.data);
    setIsLoading(false);
   })
   .catch((error) => {
    console.error(error);
      setHttpErrors({ error: true, message: error.message });
      setShowToast(true);
      setIsLoading(false);
   })
   
 }

 useEffect(() => {
  controller.current = new AbortController();
  getNews(controller.current.signal);

  return () => {
   if (controller?.current) controller.current.abort();
  };
 }, []);

 return (
  <Container>
   <ToastContainer className="p-3" position="top-end" style={{ zIndex: 9999 }}>
    <Toast
     bg="light"
     onClose={() => setShowToast(false)}
     show={showToast}
     delay={3500}
     autohide
    >
     <Toast.Header>
      <strong className="me-auto">Aviso</strong>
     </Toast.Header>
     <Toast.Body>
      {httpErrors.error && httpErrors.message}
     </Toast.Body>
    </Toast>
   </ToastContainer>

   {isLoading && <Spinner size="sm" />}

   {news?.length > 0 &&  <News news={news}/>}

   {news?.length <= 0 && !isLoading && !httpErrors.error && <span>Nenhuma notícia encontrada :) </span>}
  
   
   
   {httpErrors.error && (
    <span className="d-block mt-3">
     {httpErrors.message}
     <Button className="mx-2" size="sm" variant="dark" onClick={() => window.location.reload()}>
      Recarregar
     </Button>
    </span>
   )}

  </Container>
 );
}

export default Home;