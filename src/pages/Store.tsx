import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/noRatingProducts.json";

function Store() {
  return (
    <>
      <h1>Store</h1>
      {storeItems.map((item) => (
        <StoreItem {...item}></StoreItem>
      ))}
    </>
  );
}

export default Store;
