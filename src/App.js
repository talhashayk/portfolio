import React, { useState, useEffect } from "react";

import "./App.scss";

import TimeSlits from "./components/TimeSlits/TimeSlits";
import NavBar from "./components/NavBar/NavBar";
import Headline from "./components/Headline/Headline";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Bio from "./components/Bio/Bio";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";

function App() {
	const [activeSection, setActiveSection] = useState(null);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	useEffect(() => {
		document.body.className = isDarkMode ? "dark-mode" : "light-mode";
	}, [isDarkMode]);

	return (
		<div className="App">
			<NavBar
				setActiveSection={setActiveSection}
				activeSection={activeSection}
			/>
			<TimeSlits
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
			/>
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
			<Projects />
			<Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
		</div>
	);
}

export default App;
