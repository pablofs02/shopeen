import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGlobalContext } from "../context/GlobalContext";
import { useFilterContext } from "../context/FilterContext";
import { Link } from "react-router-dom";

type HomeItemsProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

export function HomeItem(props: HomeItemsProps) {
  const { searchItem } = useGlobalContext();
  const { setSearch } = useFilterContext();

  const handleSelection = (e: any) => {
    e.preventDefault();
    setSearch(props.title);
  };

  return (
    <Card onClick={handleSelection} className="h-100 p-3 pt-4 pb-4 store-item">
      <Link to={"/store"}>
        <Card.Img
          variant="top"
          src={props.image}
          height="170px"
          style={{ objectFit: "contain" }}
        />
        <Card.Body className="d-flex flex-column h-100 p-0 ps-2 pe-2">
          <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline">
            <span>{props.title}</span>
            <span className="fw-bold price fs-5 ms-3 text-muted">
              {formatCurrency(props.price)}
            </span>
          </Card.Title>
          <Card.Text className="desc-store d-flex justify-content-center align-items-center card-description mt-3 mb-auto">
            {props.description.length > 120
              ? props.description.slice(0, 120) + "..."
              : props.description}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
