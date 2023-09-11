import { INews } from "../../types/news.types";
import * as S from "./news.styles";


function News({news}: {news: INews[]}) {
  
  
  return (
    <>
      {news.length > 0 && news.map((item) => (
        <S.ContainerLink to={`/news:${item.slug}`} key={item.id}>{item.content}</S.ContainerLink>
      ))}
    </>
  )
}

export default News;