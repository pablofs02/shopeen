import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

type PurchaseItemProps = {
  id: number;
  quantity: number;
};

export function PurchaseItem(props: PurchaseItemProps) {
  const [item, setItem] = useState(
    storeItems.find((item) => item.id === props.id)!
  );

  const [showMore, setShowMore] = useState(false);

  return (
    <Card className="h-100 p-3 pt-4 pb-4 store-item">
      <Card.Img
        alt={item.title}
        variant="top"
        src={item.image}
        height="170px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column h-100 p-0 ps-2 pe-2">
        <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline">
          <span tabIndex={6}>{item.title}</span>
          <span tabIndex={6} className="fw-bold price fs-5 ms-3 text-muted">
            {formatCurrency(item.price)}
          </span>
        </Card.Title>
        <Card.Text tabIndex={6} className="desc-store d-flex justify-content-center align-items-center card-description mt-3 mb-auto">
          {showMore ? item.description : item.description.slice(0, 50) + " ..."}
        </Card.Text>
        <div className="position-relative h-100 options">
          <button
            tabIndex={6}
            onClick={() => {
              setShowMore(!showMore);
            }}
            className="expandContractButton"
          >
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
            <div tabIndex={6} className="d-flex justify-content-between align-items-center mt-3">
                <span tabIndex={0} className="fw-bold price fs-6 ms-3 text-muted">
                    Quantity: {props.quantity}
                </span>
                <span tabIndex={0} className="fw-bold price fs-6 ms-3 text-muted">
                    Total: {formatCurrency(item.price * props.quantity)}
                </span>
            </div>
        </div>
      </Card.Body>
    </Card>
  );
}
