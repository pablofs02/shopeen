import { HomeShortcut } from "../components/HomeShortcuts.tsx";
import homeShortcut from "../data/shortcuts.json";

function Home() {
	return (
		<>
			<h1>Home</h1>
			{homeShortcut.map((item) => (
				<HomeShortcut {...item}></HomeShortcut>
			))}
		</>
	);
}

export default Home;
