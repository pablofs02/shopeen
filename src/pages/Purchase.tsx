import { useGlobalContext } from "../context/GlobalContext";
import { PurchaseItem } from "../components/PurchaseItem";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { useEffect } from "react";

function Purchase() {
  const { cartItems, setCartItems, boughtItems, setBoughtItems } = useGlobalContext();

  const totalPrice: number = cartItems.reduce((acc, item) => {
    const itemPrice = storeItems.find((storeItem) => storeItem.id === item.id)?.price;
    return acc + itemPrice! * item.quantity;
  }, 0);

  const handleFinishPurchase = (e: any) => {
    const id: number = boughtItems.length;
    setBoughtItems([...boughtItems, { [id]: cartItems }]);
    setCartItems([]);
  };

  return (
    <>
      <h1 className="page-header">Purchase</h1>

      {cartItems.length > 0 ? (
        <div className="subtotal">
          <p>
            <strong>Total price: {formatCurrency(totalPrice)}</strong>
          </p>
          <Button variant="warning" onClick={handleFinishPurchase}>
            Finish purchase
          </Button>
        </div>
      ) : (
        <div className="purchase-finished">
          <h2>Purchase finished correctly</h2>
        </div>
      )}
      <section className="cuerpo mt-4">
        <Row md={2} lg={3} xs={1} className="g-3">
          {cartItems.map((item: any) => (
            <Col key={item.id}>
              <PurchaseItem {...item}></PurchaseItem>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Purchase;
