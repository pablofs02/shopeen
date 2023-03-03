import { Card } from "react-bootstrap";

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
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={props.image}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Title>
        {props.title}
      </Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
    </Card>
  );
}
