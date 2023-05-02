import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useFilterContext } from "../context/FilterContext";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { setSearch } = useFilterContext();

  const { handleClearCategory, handleClearRange} = useFilterContext();

  const handleSelection = (e: any) => {
    //e.preventDefault();
    //navigate("/product/" + props.id);
    //handleClearCategory();
    //handleClearRange();
  };

  return (
    <Card className="h-100 p-3 pt-4 pb-4 home-item store-item">
        <Link to={"/ProyIU/product/" + props.id} className={location.pathname === "/ProyIU/help" ? "active-page" : ""}>
            <Card.Img
              alt={props.title}
              variant="top"
              src={props.image}
              height="170px"
              style={{ objectFit: "contain" }}
              //longdesc={props.description}
            />
        </Link>
        <Card.Body className="d-flex flex-column p-0 ps-2 pe-2">
          <Card.Title className="mt-4 d-flex justify-content-between align-items-baseline fw-bold">
            <span>{props.title}</span>
            <span className="fw-bold price fs-5 ms-3 text-muted">
              {formatCurrency(props.price)}
            </span>
          </Card.Title>
        </Card.Body>
    </Card>
  );
}
