import { useParams, useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";
import products from "../data/products.json";
import { Button, Container, Row } from "react-bootstrap";

function Product() {
    const { id } = useParams<{ id: string }>();
    const { addItem } = useGlobalContext();
    const { handleClearCategory, handleClearRange} = useFilterContext();
    const navigate = useNavigate();

    const product = products.find((item) => item.id === parseInt(id!));

    const handleSelection = (e: any) => {
        e.preventDefault();
        navigate("/store");
        handleClearCategory();
        handleClearRange();
    }

    const item = products.find((item) => item.id === parseInt(id!));

    return (
        <Container>
            <Row>
                <div className="col-12 col-md-6">
                    <img src={item!.image} alt={item!.title} className="img-fluid" />
                </div>
                <div className="col-12 col-md-6">
                    <h1 tabIndex={1}>{item!.title}</h1>
                    <p tabIndex={2}>{item!.description}</p>
                    <p tabIndex={3} className="price">{formatCurrency(item!.price)}</p>
                    <p tabIndex={4} className="stock">{item!.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <Button tabIndex={5} variant="primary" onClick={() => addItem(item!.id)} disabled={item?.stock === 0}>
                        Add to Cart
                    </Button>
                    <Button tabIndex={6} variant="secondary" onClick={handleSelection}>
                        Back to store
                    </Button>
                </div>
            </Row>
        </Container>
    );
}

export default Product;