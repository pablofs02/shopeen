type ShortcutProp = {
	title: string;
	desc: string;
	image: string;
	href: string;
}

export function HomeShortcut(props: ShortcutProp) {
	return (
		<div>
			<a href={props.href}>
				<img src={props.image} alt={props.title}/>
				<h3>{props.title}</h3>
				<p>{props.desc}</p>
			</a>
		</div>
	)
}
