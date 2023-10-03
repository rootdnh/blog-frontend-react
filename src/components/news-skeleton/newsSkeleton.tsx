import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";

function NewsSkeleton() {
 return (
  <>
   {Array.from({ length: 5 }).map((_, idx) => (
    <Card style={{marginTop: '20px'}} key={`item-${idx}1`}>
     <Card.Header as="h5">
      <Placeholder as="span" animation="glow">
        <Placeholder as="span" xs={12} />
      </Placeholder>
     </Card.Header>
     <Card.Body>
      <Card.Text>
       <Placeholder as="span" animation="glow">
       <Placeholder as="span" xs={12} />

       </Placeholder>
      </Card.Text>
     </Card.Body>
    </Card>
   ))}
  </>
 );
}

export default NewsSkeleton;
