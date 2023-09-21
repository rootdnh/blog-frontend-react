import { INews } from "../../types/news.types";
import * as S from "./news.styles";
import Card from 'react-bootstrap/Card';

function News({ news }: { news: INews[] }) {
 return (
  <>
   {news.length > 0 &&
    news.map((item) => (
      <S.MyLink to={`/news/${item.slug}`} key={item.id}>
      <Card>
      <Card.Header as="h5">{item.title}</Card.Header>
      <Card.Body>
        <Card.Text>{item.content}</Card.Text>
      </Card.Body>
    </Card>
     </S.MyLink>
    ))}
  </>
 );
}

export default News;
