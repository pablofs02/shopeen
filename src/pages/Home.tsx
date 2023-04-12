import { Col, Row } from "react-bootstrap";
import { HomeShortcut } from "../components/HomeShortcuts";
import homeShortcut from "../data/shortcuts.json";
import '../styles/homeStyle.css'

export default function Home() {
	return (
		<section className="cuerpo">
            <h2 className="section-home">Recommendations</h2>
			<Row md={2} lg={3} xs={1} className="g-3">
				{homeShortcut.map((item) => (
                    <Col key={item.title}>
						<HomeShortcut {...item}></HomeShortcut>
                    </Col>
				))}
			</Row>
            <h2 className="section-home">Bestsellers</h2>
			<Row md={2} lg={3} xs={1} className="g-3">
				{homeShortcut.map((item) => (
                    <Col key={item.title}>
						<HomeShortcut {...item}></HomeShortcut>
                    </Col>
				))}
			</Row>
            <h2 className="section-home">On Stock</h2>
			<Row md={2} lg={3} xs={1} className="g-3">
				{homeShortcut.map((item) => (
                    <Col key={item.title}>
						<HomeShortcut {...item}></HomeShortcut>
                    </Col>
				))}
			</Row>
		</section>
	);
}
