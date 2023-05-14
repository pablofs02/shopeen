import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";
import products from "../data/products.json";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/ProductStyle.css";
import { useEffect } from "react";
import { useFilterContext } from "../context/FilterContext";

export default function Product() {
  // The id of the product is obtained from the URL
  const { id } = useParams<{ id: string }>();

  // The functions of the context are obtained
  const { addItem, getQuantityCart, removeItem } = useGlobalContext();

  // The function to navigate between pages is obtained
  const navigate = useNavigate();

  // The product is obtained from the products
  const item = products.find((item) => item.id === parseInt(id!));

  // Cleaning the filter options
  const { handleClearCategory, handleClearRange } = useFilterContext();

  useEffect(() => {
    handleClearRange();
    handleClearCategory();
  }, []);

  return (
    <Container className="product-container">
      <Row>
        <Col className="product-img">
          <img src={item!.image} alt={item!.title} />
        </Col>
        <Col className="product-text">
          <div className="product-top">
            <h1 tabIndex={1}>{item!.title}</h1>
            <p tabIndex={2}>{item!.description}</p>
          </div>

          <div className="product-bottom">
            {/* The price and the stock of the item */}
            <h3 tabIndex={3}>{formatCurrency(item!.price)}</h3>
            <h4 tabIndex={4}>
              {item!.stock > 0 ? "In Stock" : "Out of Stock"}
            </h4>
            {/* Show the add button when the item is added, the remove button otherwise */}
            {getQuantityCart(item!.id) <= 0 ? (
              <Button
                tabIndex={5}
                variant="primary"
                onClick={() => {
                  addItem(item!.id);
                }}
                disabled={item?.stock === 0}
              >
                + Add to cart
              </Button>
            ) : (
              <Button
                tabIndex={6}
                onClick={() => {
                  removeItem(item!.id);
                }}
                variant="danger"
              >
                - Remove from cart
              </Button>
            )}
            {/* Button for going back to the Home page */}
            <Button
              tabIndex={7}
              variant="secondary"
              onClick={() => {
                navigate("/ProyIU/");
              }}
            >
              Go back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
