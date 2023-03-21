import { Alert, Button, Card } from "react-bootstrap";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemsProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

export function StoreItem(props: StoreItemsProps) {
  const [showMore, setShowMore] = useState(false);
  
  const [stock, setStock] = useState(props.stock);

  return (
    <Card className="h-100 p-2">
      <Card.Img
        variant="top"
        src={props.image}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mt-3 d-flex justify-content-between align-items-baseline">
          <span>{props.title}</span>
          <span className="fw-bold price fs-5 ms-3 text-muted">
            {formatCurrency(props.price)}
          </span>
        </Card.Title>
        {showMore ? (
          <Card.Text className="d-flex justify-content-center align-items-center card-description mt-2 mb-5">
            {props.description}
          </Card.Text>
        ) : (
          <Card.Text className="d-flex justify-content-center align-items-center card-description mt-2 mb-5">
            {props.description.slice(0, 50)}...
          </Card.Text>
        )}
        <button
          onClick={() => {
            setShowMore(!showMore);
          }}
          className="expandContractButton"
        >
          {showMore ? (
            <>
              Show Less <MdExpandLess className="ms-1" />
            </>
          ) : (
            <>
              Show More <MdExpandMore className="ms-1" />
            </>
          )}
        </button>
        <div className="alertStock">
          {
            (stock <= 0 ? (
              <>
                <Alert variant="danger" className="text-center">
                  <span className="fw-bold fs-5 p-auto">
                    There is no stock left.
                  </span>
                </Alert>
              </>
            ) : (
              <></>
            ))
          }
        </div>
      </Card.Body>
    </Card>
  );
}
