import { INews } from "../../types/news.types";
import * as S from "./news.styles";
import Card from 'react-bootstrap/Card';

function News({ news }: { news: INews[] }) {

  const limitText = (text: string, limit: number) =>{
    const arrText = text.split("");
    
    if(arrText.length <= limit) return text;

    return arrText.splice(0, limit).join("") + "...";
    
  }
  return (
  <>
   {news.length > 0 &&
    news.map((item) => (
      <S.MyLink to={`/news/${item.slug}`} key={item.id}>
      <Card>
      <Card.Header as="h5">{item.title}</Card.Header>
      <Card.Body>
        <Card.Text>{limitText(item.content!, 250)}</Card.Text>
      </Card.Body>
    </Card>
     </S.MyLink>
    ))}
  </>
 );
}

export default News;
