import { useEffect, useRef, useState, useCallback } from "react";
import { api } from "../../services/api";
import Pagination from "react-bootstrap/Pagination";
import { Button, Container } from "react-bootstrap";
import NewsSkeleton from "../../components/news-skeleton/newsSkeleton";
import News from "../../components/news/news";
import { useNavigate, useParams } from "react-router-dom";
import { StandardToast } from "../../components/toast/toast";
import { NewsProps } from "../../types/news.types";
import { DefaultPagination } from "../../components/pagination/defaultPagination";

function Home() {
 const [news, setNews] = useState<NewsProps>({
  posts: [],
  maxPages: 0,
  actualPage: 1,
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
 const { page } = useParams();
 const navigate = useNavigate();

 const getNews = useCallback(
  (page = 1) => {
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
  },
  [controller, setHttpErrors, setShowToast, setIsLoading, setNews]
 );

 const changePage = (page: number) => {
  navigate(`/page/${page}`);
 };

 useEffect(() => {
  if (page) {
   setNews((prev) => {
    return { ...prev, actualPage: +page };
   });

   controller.current = new AbortController();
   getNews(+page);
  }

  return () => {
   if (controller?.current) controller.current.abort();
  };
 }, [page]);

 useEffect(() => {
  if (!page) {
   controller.current = new AbortController();
   getNews();
   document.title = "BLOG";
  }
  return () => {
   if (controller?.current) controller.current.abort();
  };
 }, []);

 return (
  <Container className="d-flex flex-column" style={{ minHeight: "93vh" }}>
   <StandardToast
    showToast={showToast}
    message={httpErrors.message}
    closeToast={() => setShowToast(false)}
   />

   {httpErrors.error && (
    <span className="d-block m-3">
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

   {news.posts?.length <= 0 && isLoading && <NewsSkeleton />}

   {news.posts?.length > 0 && <News news={news.posts} />}

   {news.posts?.length <= 0 && !isLoading && !httpErrors.error && (
    <span>Nenhuma notícia encontrada :) </span>
   )}

   {news.posts?.length >= 0 && (
    <DefaultPagination
     changePage={changePage}
     maxPages={news.maxPages}
     actualPage={news.actualPage}
    />
   )}
  </Container>
 );
}

export default Home;
