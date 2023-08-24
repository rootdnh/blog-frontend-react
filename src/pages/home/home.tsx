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
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMessages from "../../utils/error.messages";

function Home() {
 const [news, setNews] = useState<INews[]>([]);
 const [httpErrors, setHttpErrors] = useState<{
  isNotConnected: boolean;
  isUnauthorized: boolean;
 }>({
  isNotConnected: false,
  isUnauthorized: false,
 });
 const [isLoading, setIsLoading] = useState<boolean>(true);
 const [showToast, setShowToast] = useState<boolean>(false);
 const controller = useRef<AbortController | null>(null);
 const navigate = useNavigate();

 function getNews(signal: AbortSignal) {
  api
   .get<{ msg: INews[] }>("/get-posts", { signal })
   .then((response) => {
    setNews(response.data.msg);
   })
   .catch((error) => {
    if (error.status === 500)
     setHttpErrors({ ...httpErrors, isNotConnected: true });
    if (error.status === 401)
     setHttpErrors({ ...httpErrors, isUnauthorized: true });
    console.error(error);
    setShowToast(true);
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
     bg="Light"
     onClose={() => setShowToast(false)}
     show={showToast}
     delay={3000}
     autohide
    >
     <Toast.Header>
      <strong className="me-auto">Aviso</strong>
     </Toast.Header>
     <Toast.Body>
      {httpErrors.isNotConnected && ErrorMessages.notConnected}
      {httpErrors.isUnauthorized && ErrorMessages.notAuthorized}
     </Toast.Body>
    </Toast>
   </ToastContainer>

   {news?.length > 0 &&
    news.map((data) => (
     <div key={data.title}>
      <h5>{data.title}</h5>
      <p>{data.content}</p>
     </div>
    ))}
   {isLoading && <Spinner size="sm" />}
   {httpErrors.isUnauthorized && (
    <span className="d-block mt-3">
     Não autorizado
     <Button size="sm" variant="dark" onClick={() => navigate("/login")}>
      Login
     </Button>
    </span>
   )}
   {httpErrors.isNotConnected && (
    <span className="d-block mt-3">
     Não conectado ao servidor
     <Button size="sm" variant="dark" onClick={() => window.location.reload()}>
      Recarregar
     </Button>
    </span>
   )}
  </Container>
 );
}

export default Home;
