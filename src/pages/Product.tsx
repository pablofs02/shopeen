import { useParams, useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";
import products from "../data/products.json";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/ProductStyle.css";
import { useState } from "react";

function Product() {
    const { id } = useParams<{ id: string }>();
    const { addItem, getQuantityCart } = useGlobalContext();
    const { handleClearCategory, handleClearRange } = useFilterContext();
    const navigate = useNavigate();

    const handleSelection = (e: any) => {
        e.preventDefault();
        navigate("/store");
        handleClearCategory();
        handleClearRange();
    };

    const item = products.find((item) => item.id === parseInt(id!));

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
                        <h3 tabIndex={3}>{formatCurrency(item!.price)}</h3>
                        <h4 tabIndex={4}>{item!.stock > 0 ? "In Stock" : "Out of Stock"}</h4>
                        {getQuantityCart(item!.id) <= 0 ? <Button
                            tabIndex={5}
                            variant="primary"
                            onClick={() => {addItem(item!.id);}}
                            disabled={item?.stock === 0}>
                            Add to Cart
                        </Button> : <Button
                            tabIndex={6}
                            variant="success"
                            disabled={true}>
                            Added
                        </Button>}
                        <Button tabIndex={7} variant="secondary" onClick={() => {navigate("/ProyIU")}}>
                            Go back
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Product;
