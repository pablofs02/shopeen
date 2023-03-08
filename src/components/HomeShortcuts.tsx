import { Button, Card } from "react-bootstrap";

type ShortcutProp = {
	title: string;
	desc: string;
	image: string;
	href: string;
}

export function HomeShortcut(props: ShortcutProp) {
	return (
		<Card className="h-100 p-2">
			<a href={props.href}>
				<Card.Img variant="top" src={props.image} height="200px" style={{ objectFit: "contain" }}/>
					<Card.Title className="fw-bold mt-3 d-flex justify-content-center text-center align-items-center">
						{props.title}
					</Card.Title>
				<Card.Text className="d-flex justify-content-center align-items-center card-description mt-2">
					{/* {props.desc} */}
				</Card.Text>
			</a>
		</Card>
	)
}
