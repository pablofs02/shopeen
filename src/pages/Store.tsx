import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import Filter from "../components/Filter";
import "../styles/FilterStyle.css";
import { useFilterContext } from "../context/FilterContext";
import { fetchResource } from "../utilities/fetchResource";
import { Product } from "../context/GlobalContext";

export default function Store() {
<<<<<<< HEAD
    const [storeItems, setStoreItems] = useState<Product[] | null>(null);

    useEffect(() => {
        fetchResource("products", setStoreItems);
    }, []);
=======
  // We get the variables and context from the filter context
  const { searchBarValue, minPriceActive, maxPriceActive, selectedCategoriesActive } = useFilterContext();

  // We filter the items of the store
  const storeItemsFiltered = storeItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchBarValue.toLowerCase()) &&
      item.price >= minPriceActive &&
      item.price <= maxPriceActive &&
      (selectedCategoriesActive.length === 0 || selectedCategoriesActive.includes(item.category.toLowerCase()))
  );
>>>>>>> master

    const { searchBarValue, minPriceActive, maxPriceActive, selectedCategoriesActive } = useFilterContext();

<<<<<<< HEAD
    if (storeItems === null) {
        return <h1>Loading...</h1>;
    }

    const storeItemsFiltered = storeItems.filter(
        (item) =>
            item.title.toLowerCase().includes(searchBarValue.toLowerCase()) &&
            item.price >= minPriceActive &&
            item.price <= maxPriceActive &&
            (selectedCategoriesActive.length === 0 || selectedCategoriesActive.includes(item.category.toLowerCase()))
    );

    return (
        <>
            <h1 className="page-header">Store</h1>
            <section className="cuerpo">
                <div className="bar">
                    <Filter />
                </div>
                <Row md={2} lg={3} xs={1} className="g-3">
                    {storeItemsFiltered.map((item) => (
                        <Col key={item.id}>
                            <StoreItem {...item}></StoreItem>
                        </Col>
                    ))}
                    {storeItemsFiltered.length === 0 && (
                        <div className="no-products">
                            <h2 tabIndex={0}>NO PRODUCTS FOUND</h2>
                        </div>
                    )}
                </Row>
            </section>
        </>
    );
=======
  return (
    <>
    <h1 className="page-header">Store</h1>
      <section className="cuerpo">
        <div className="bar">
          {/* Rendering the filter */}
          <Filter />
        </div>
        <Row md={2} lg={3} xs={1} className="g-3">
          {/* Showing each item */}
          {storeItemsFiltered.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
          {storeItemsFiltered.length === 0 && (
            <div className="no-products">
              <h2 tabIndex={0}>NO PRODUCTS FOUND</h2>
            </div>
          )}
        </Row>
      </section>
    </>
  );
>>>>>>> master
}
