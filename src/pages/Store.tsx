import { Container } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/noRatingProducts.json";

function Store() {
  return (
    <>
      <h1>Store</h1>
      {storeItems.map((item) => (
        <StoreItem key={item.id} {...item}></StoreItem>
      ))}
    </>
  );
}

export default Store;
