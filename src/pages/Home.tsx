import { Col, Row } from "react-bootstrap";
import { HomeItem } from "../components/HomeItem";
import { loadBestsellers, loadOnStock, loadRecommendations } from "../context/GlobalContext";
import '../styles/homeStyle.css'
import { useFilterContext } from "../context/FilterContext";
import { useEffect } from "react";

export default function Home() {
    
    const {handleClearCategory, handleClearRange} = useFilterContext();
    
    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);

    return (
    <>
        <h1 className="page-header">Home</h1>
        <section className="cuerpo">
            <h2 className="section-home">Recommendations</h2>
            <Row md={2} lg={3} xs={1} className="g-3">
                {loadRecommendations().map(item => (
                    <Col key={item.title}>
                        <HomeItem {...item}></HomeItem>
                    </Col>
                ))}
            </Row>
            <h2 className="section-home">Bestsellers</h2>
            <Row md={2} lg={3} xs={1} className="g-3">
                {loadBestsellers().map(item => (
                    <Col key={item.title}>
                        <HomeItem {...item}></HomeItem>
                    </Col>
                ))}
            </Row>
            <h2 className="section-home">On Stock</h2>
            <Row md={2} lg={3} xs={1} className="g-3">
                {loadOnStock().map(item => (
                    <Col key={item.title}>
                        <HomeItem {...item}></HomeItem>
                    </Col>
                ))}
            </Row>
        </section>
    </>
    );
}
