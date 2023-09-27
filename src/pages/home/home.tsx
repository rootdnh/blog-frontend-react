import { useEffect, useRef, useState } from "react";
import { INews } from "../../types/news.types";
import { api } from "../../services/api";
import Pagination from "react-bootstrap/Pagination";
import { Button, Container, ToastContainer, Toast } from "react-bootstrap";
import NewsSkeleton from "../../components/news-skeleton/newsSkeleton";
import News from "../../components/news/news";
import { useNavigate, useParams } from "react-router-dom";

interface NewsProps {
 posts: INews[];
 maxPages: number;
 actualPage: number
}

function Home() {
 const [news, setNews] = useState<NewsProps>({
  posts: [],
  maxPages: 0,
  actualPage: 1
 } as NewsProps);

 const [httpErrors, setHttpErrors] = useState<{
  message: string;
  error: boolean;
 }>({
  message: "",
  error: false,
 });
 const [isLoading, setIsLoading] = useState<boolean>(true);
 const [showToast, setShowToast] = useState<boolean>(false);
 const controller = useRef<AbortController | null>(null);
 const {page} = useParams();
 const navigate = useNavigate();

 function getNews(page = 1) {
  //duplicate setLoading because using .finally method don't work the logic
  //in !isLoading below, just in ms, but isn't cool
  api
   .get(`/get-posts?page=${page}`, { signal: controller.current?.signal })
   .then((response) => {
    const { maxPages, posts } = response.data;
    setNews((prev) => {
     return { ...prev, posts, maxPages };
    });
    setIsLoading(false);
   })
   .catch((error) => {
    console.error(error);
    setHttpErrors({ error: true, message: error.message });
    setShowToast(true);
    setIsLoading(false);
   });
 }

 const changePage = (page: number) =>{
  navigate(`/page/${page}`);
 }
 
 useEffect(()=>{
  if(page){
    setNews((prev)=>{
      return {...prev, actualPage: +page}
    })

    controller.current = new AbortController();
    getNews(+page);
  }

  return () => {
    if (controller?.current) controller.current.abort();
   };
 }, [page])

 useEffect(() => {
  if(!page){
    controller.current = new AbortController();
    getNews();
    document.title = "BLOG";
  }
  return () => {
   if (controller?.current) controller.current.abort();
  };
 }, []);

 return (
  <Container className="d-flex flex-column" style={{minHeight: "90vh"}}>
   {/* remove toast of here */}
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
     <Toast.Body>{httpErrors.error && httpErrors.message}</Toast.Body>
    </Toast>
   </ToastContainer>

   {news.posts?.length <= 0 && isLoading && <NewsSkeleton />}

   {news.posts?.length > 0 && <News news={news.posts} />}

   {news.posts?.length <= 0 && !isLoading && !httpErrors.error && (
    <span>Nenhuma notícia encontrada :) </span>
   )}

   {httpErrors.error && (
    <span className="d-block mt-3">
     {httpErrors.message}
     <Button
      className="mx-2"
      size="sm"
      variant="dark"
      onClick={() => window.location.reload()}
     >
      Recarregar
     </Button>
    </span>
   )}

   {news.posts?.length >= 0 && (
    <Pagination className="d-flex justify-content-center relative mt-auto">
     {Array.from({ length: news.maxPages }).map((_, idx) => {
      let page = idx + 1;
      return <Pagination.Item 
        onClick={() => changePage(page)} 
        key={`page-${idx}`}
        active={news.actualPage === (page)}
        >{page}</Pagination.Item>;
     })}
    </Pagination>
   )}
  </Container>
 );
}

export default Home;
