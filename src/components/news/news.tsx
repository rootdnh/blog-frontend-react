import { INews } from "../../types/news.types";

function News({news}: {news: INews[]}) {
  
  
  return (
    <>
      {news.length > 0 && news.map((item) => (
        <h2 key={item.id}>{item.content}</h2>
      ))}
    </>
  )
}

export default News;