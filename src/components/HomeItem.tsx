import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";

// The props of the component
type HomeItemsProps = {
  id: number; // The id of the product
  title: string; // The title of the product
  price: number; // The price of the product
  description: string; // The description of the product
  category: string; // The category of the product
  image: string; // The image of the product
  stock: number; // The stock of the product
};

export function HomeItem(props: HomeItemsProps) {
  return (
    <Card className="h-100 p-3 pt-4 pb-4 home-item store-item">
        {/* Link to the page of the product */}
        <Link to={"/ProyIU/product/" + props.id} className={location.pathname === "/ProyIU/help" ? "active-page" : ""}>
            {/* The image of the item */}
            <Card.Img
              alt={props.title}
              variant="top"
              src={props.image}
              height="170px"
              style={{ objectFit: "contain" }}
            />
        </Link>
        <Card.Body className="d-flex flex-column p-0 ps-2 pe-2">
          {/* The title and price of the item */}
          <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline fw-bold">
            <span>{props.title}</span>
            <span className="fw-bold price fs-5 ms-3 text-muted">
              {formatCurrency(props.price)}
            </span>
          </Card.Title>
        </Card.Body>
    </Card>
  );
}
