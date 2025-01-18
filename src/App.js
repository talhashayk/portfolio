import React, { useState } from "react";

import "./App.scss";

import TimeSlits from "./components/TimeSlits/TimeSlits";
import NavBar from "./components/NavBar/NavBar";
import Headline from "./components/Headline/Headline";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Bio from "./components/Bio/Bio";
import Contact from "./components/Contact/Contact";

function App() {
	const [activeSection, setActiveSection] = useState(null);

	return (
		<div className="App">
			<NavBar
				setActiveSection={setActiveSection}
				activeSection={activeSection}
			/>
			{TimeSlits()}
			<div className="main-content">
				<Headline />
				<Bio />
			</div>
			<ImageCarousel />
			<div className="main-content">
				{activeSection === "Contact" && (
					<Contact setActiveSection={setActiveSection} />
				)}
			</div>
		</div>
	);
}

export default App;
