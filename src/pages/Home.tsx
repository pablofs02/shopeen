import { Col, Row } from "react-bootstrap";
import { HomeItem } from "../components/HomeItem";
import { loadBestsellers, loadOnStock, loadRecommendations, Product } from "../context/GlobalContext";
import "../styles/homeStyle.css";
import { useFilterContext } from "../context/FilterContext";
import { useEffect, useState } from "react";
import { fetchResource } from "../utilities/fetchResource";

export default function Home() {
    const [storeItems, setStoreItems] = useState<Product[] | null>(null);

    const { handleClearCategory, handleClearRange } = useFilterContext();

    useEffect(() => {
        fetchResource("products", setStoreItems);
        handleClearRange();
        handleClearCategory();
    }, []);

    if (storeItems === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1 className="page-header">Home</h1>
            <section className="cuerpo">
                <h2 className="section-home">Recommendations</h2>
                <Row md={2} lg={3} xs={1} className="g-3">
                    {loadRecommendations(storeItems).map((item) => (
                        <Col key={item.title}>
                            <HomeItem {...item}></HomeItem>
                        </Col>
                    ))}
                </Row>
                <h2 className="section-home">Bestsellers</h2>
                <Row md={2} lg={3} xs={1} className="g-3">
                    {loadBestsellers(storeItems).map((item) => (
                        <Col key={item.title}>
                            <HomeItem {...item}></HomeItem>
                        </Col>
                    ))}
                </Row>
                <h2 className="section-home">On Stock</h2>
                <Row md={2} lg={3} xs={1} className="g-3">
                    {loadOnStock(storeItems).map((item) => (
                        <Col key={item.title}>
                            <HomeItem {...item}></HomeItem>
                        </Col>
                    ))}
                </Row>
            </section>
        </>
    );
}
