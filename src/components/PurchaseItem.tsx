import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

// The props for the PurchaseItem component
type PurchaseItemProps = {
  id: number; // The id of the item
  quantity: number; // The quantity of the item
};

export default function PurchaseItem(props: PurchaseItemProps) {
  
  // The item that is being purchased
  const [item] = useState(
    storeItems.find((item) => item.id === props.id)!
  );

  // Whether or not the description should be shown
  const [showMore, setShowMore] = useState(false);

  return (
    <Card className="h-100 p-3 pt-4 pb-4 store-item">
      {/* The image of the item */}
      <Card.Img
        alt={item.title}
        variant="top"
        src={item.image}
        height="170px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column h-100 p-0 ps-2 pe-2">
        {/* The title and the price of the item */}
        <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline">
          <span tabIndex={6}>{item.title}</span>
          <span tabIndex={6} className="fw-bold price fs-5 ms-3 text-muted">
            {formatCurrency(item.price)}
          </span>
        </Card.Title>
        {/* The description of the item */}
        <Card.Text tabIndex={6} className="desc-store d-flex justify-content-center align-items-center card-description mt-3 mb-auto">
          {showMore ? item.description : item.description.slice(0, 50) + " ..."}
        </Card.Text>
        <div className="position-relative h-100 options">
          {/* The button to show more or less of the description */}
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
          {/* The quantity and total price of the item */}
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
