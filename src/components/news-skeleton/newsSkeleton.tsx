import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";

function NewsSkeleton() {
 return (
  <>
   {Array.from({ length: 5 }).map((_, idx) => (
    <Card style={{marginTop: '20px'}} key={idx}>
     <Card.Header as="h5">
      <Placeholder as="p" animation="glow">
       <Placeholder xs={12} />
      </Placeholder>
     </Card.Header>
     <Card.Body>
      <Card.Text>
       <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
       </Placeholder>
      </Card.Text>
     </Card.Body>
    </Card>
   ))}
  </>
 );
}

export default NewsSkeleton;
