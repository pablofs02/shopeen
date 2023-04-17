import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { Link } from "react-router-dom";
import { useState } from "react";

type PurchaseItemProps = {
  id: number;
  quantity: number;
};

export function PurchaseItem(props: PurchaseItemProps) {
  
    const [item, setItem] = useState(storeItems.find((item) => item.id === props.id)!);
    
  return (
    <Card className="h-100 p-3 pt-4 pb-4 store-item">
        <Card.Img
          variant="top"
          src={item.image}
          height="170px"
          style={{ objectFit: "contain" }}
        />
        <Card.Body className="d-flex flex-column h-100 p-0 ps-2 pe-2">
          <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline">
            <span>{item.title}</span>
            <span className="fw-bold price fs-5 ms-3 text-muted">
              {formatCurrency(item.price)}
            </span>
          </Card.Title>
          <Card.Text className="desc-store d-flex justify-content-center align-items-center card-description mt-3 mb-auto">
            {item.description.length > 120
              ? item.description.slice(0, 120) + "..."
              : item.description}
          </Card.Text>
        </Card.Body>
    </Card>
  );
}
