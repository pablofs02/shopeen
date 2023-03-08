import { Button, Card } from "react-bootstrap";

type StoreItemsProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export function StoreItem(props: StoreItemsProps) {
  return (
    <Card className="h-100 p-2">
      <Card.Img
        variant="top"
        src={props.image}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Title className="fw-bold mt-3 d-flex justify-content-center text-center align-items-center">
        {props.title}
      </Card.Title>
      <Card.Text className="d-flex justify-content-center align-items-center card-description mt-2">
        {/* {props.description} */}
      </Card.Text>
    </Card>
  );
}
