import { Col, Row } from "react-bootstrap";
import { StoreItem } from '../components/StoreItem';
import { useGlobalContext } from "../context/GlobalContext";
import storeItems from "../data/noRatingProducts.json";
import { useEffect } from "react";
import Filter from "../components/Filter";
import '../styles/FilterStyle.css'
import { useFilterContext } from '../context/FilterContext';

function Store() {

  const {searchBarValue, minPriceActive, maxPriceActive, selectedOptionsActive} = useFilterContext();

  const storeItemsFiltered = storeItems.filter((item) => item.title.toLowerCase().includes(searchBarValue.toLowerCase()) &&
    item.price >= minPriceActive && item.price <= maxPriceActive &&
    (selectedOptionsActive.length === 0 || selectedOptionsActive.includes(item.category.toLowerCase()))
  )

  // const styleDivAlertNoProductsFound = {
  //   backgroundColor: '#f8d7da',
  //   border:' 2px solid #721c24',
  //   color: '#721c24',
  //   fontSize: '1.2rem',
  //   padding: '20px',
  //   margin: '10px auto',
  //   width: '80%',
  //   boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  //   borderRadius: '10px',
  //   justifyContent: 'center',
  //   textAlign: 'center'
  // }

  // const sytleNoProductsFound = {
  //   fontSize: '2rem',
  //   margin: '0',
  //   letterSpacing: '1px',
  //   color: '#fff',
  //   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  // }

  // To add accesibility we could check if the filter is not empty and then add a string saying Filtered by: {filter}

  return <>
    <Filter/>
    <section className="cuerpo">
      <h1>Store</h1>
      <Row md={2} lg={3} xs={1} className="g-3">
        {storeItemsFiltered
          .map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
        {storeItemsFiltered.length === 0 && <div className="no-products"><h2>NO PRODUCTS FOUND</h2></div>}
      </Row>
    </section>
    </>
}

export default Store;
