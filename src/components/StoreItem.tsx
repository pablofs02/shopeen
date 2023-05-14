import { Button, Card } from "react-bootstrap";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";

// Props for the StoreItem component
type StoreItemsProps = {
  id: number; // Id of the item
  title: string; // Title of the item
  price: number; // Price of the item
  description: string; // Description of the item
  category: string; // Category of the item
  image: string; // Image of the item
  stock: number; // Stock of the item
};

export default function StoreItem(props: StoreItemsProps) {
  // Variable to show the description
  const [showMore, setShowMore] = useState(false);

  // Functions and variables from the context
  const { getQuantityCart, addItem, removeItem, boughtItemsQuantity } = useGlobalContext();

  // Get the quantity of the item and the quantity bought
  const quantity = getQuantityCart(props.id);
  const boughtQuantity = boughtItemsQuantity.find((item) => item.id === props.id)?.quantity || 0;

  // Function to handle the add button
  const handleAdd = (e: any) => {
    e.preventDefault();
    addItem(props.id);
  };

  // Function to handle the remove button
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

        {/* The description of the item */}
        <Card.Text tabIndex={0} className="desc-store d-flex flex-column justify-content-center align-items-center card-description mt-3">
          {showMore ? props.description : props.description.slice(0, 50) + "..."}
        </Card.Text>

        {/* The stock of the item */}
        {showMore && props.stock - boughtQuantity > 0 ? (
          <div tabIndex={0}  className="stock-left text-center mb-0">
            <span className="fw-bold fs-5 p-auto">Available stock {props.stock - boughtQuantity}.</span>
          </div>
        ) : (
          <></>
        )}

        <div className="position-relative h-100 options">
          {/* If there is stock left render the buttons for adding or removing else show the warning */}
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
              <div tabIndex={0}  className="alert-red text-center mb-0">
                <span className="fw-bold fs-5 p-auto">There is no stock left.</span>
              </div>
            </div>
          )}
          {/* Buttons for expanding the description */}
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
