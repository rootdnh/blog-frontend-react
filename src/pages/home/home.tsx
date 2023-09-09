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
import { useAuth } from "../../context/AuthProvider/authProvider";
import News from "../../components/news/news";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const [httpErrors, setHttpErrors] = useState<{
  isNotConnected: boolean
 }>({
  isNotConnected: false
 });
 const [isLoading, setIsLoading] = useState<boolean>(true);
 const [showToast, setShowToast] = useState<boolean>(false);
 const controller = useRef<AbortController | null>(null);
 const {isAuthenticated} = useAuth();

 function getNews(signal: AbortSignal) {
  api
   .get<{ msg: INews[] }>("/get-posts", { signal })
   .then((response) => {
    setNews(response.data.msg);
   })
   .catch((error) => {
    console.error(error);

    if (error.status === 500) {
     setHttpErrors({ ...httpErrors, isNotConnected: true });
     setShowToast(true);
    return;
    }
    
   })
   .finally(() => {
    setIsLoading(false);
   });
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
   <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
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
      {httpErrors.isNotConnected && ErrorMessages.notConnected}
     </Toast.Body>
    </Toast>
   </ToastContainer>

   {news?.length > 0 && isAuthenticated() &&  <News news={news}/>}

   {news?.length <= 0 && !httpErrors.isNotConnected && <span>Nenhuma notícia encontrada :) </span>}

   {isLoading && <Spinner size="sm" />}
   
   {httpErrors.isNotConnected && (
    <span className="d-block mt-3">
     Não conectado ao servidor
     <Button className="mx-2" size="sm" variant="dark" onClick={() => window.location.reload()}>
      Recarregar
     </Button>
    </span>
   )}

  </Container>
 );
}

export default Home;
