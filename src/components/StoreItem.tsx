import { Alert, Button, Card } from "react-bootstrap";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";

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

  const { getQuantityCart, addItem, removeItem, boughtItemsQuantity } = useGlobalContext();

  const quantity = getQuantityCart(props.id);
  const boughtQuantity = boughtItemsQuantity.find((item) => item.id === props.id)?.quantity || 0;

  const handleAdd = (e: any) => {
    e.preventDefault();
    addItem(props.id);
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    removeItem(props.id);
  };

  return (
    <Card className="h-100 p-3 pt-4 pb-4 store-item d-flex justify-content-between align-item-center flex-column">
      <Card.Img alt={props.title} variant="top" src={props.image} height="170px" style={{ objectFit: "contain" }} />
      <Card.Body className="d-flex flex-column h-100 p-0 ps-2 pe-2">
        <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline">
          <span tabIndex={0} >{props.title}</span>
          <span tabIndex={0} className="fw-bold price fs-5 ms-3 text-muted">{formatCurrency(props.price)}</span>
        </Card.Title>

        <Card.Text tabIndex={0} className="desc-store d-flex flex-column justify-content-center align-items-center card-description mt-3">
          {showMore ? props.description : props.description.slice(0, 50) + "..."}
        </Card.Text>

        {showMore ? (
          <Alert variant="info" className="fs-5 text-center">
            Available stock {props.stock - boughtQuantity}
          </Alert>
        ) : (
          <></>
        )}

        <div className="position-relative h-100 options">
          {props.stock - boughtQuantity > 0 ? (
            quantity === 0 ? (
              <Button onClick={handleAdd} className="addItem">
                + Add to cart
              </Button>
            ) : (
              <button className="remove btn btn-danger m-0" onClick={handleRemove}>
                - Remove from cart
              </button>
            )
          ) : (
            <div className="alertStock mb-0">
              <Alert variant="danger" className="text-center mb-0">
                <span className="fw-bold fs-5 p-auto">There is no stock left.</span>
              </Alert>
            </div>
          )}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
            className="expandContractButton">
            {showMore ? (
              <>
                <span>Show Less</span> <MdExpandLess className="ms-1" />
              </>
            ) : (
              <>
                <span>Show More</span> <MdExpandMore className="ms-1" />
              </>
            )}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
