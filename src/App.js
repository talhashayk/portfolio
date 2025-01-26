import React, { useState, useEffect } from "react";

import "./App.scss";

import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import Play from "./components/Play/Play";

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
			<About
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
				setActiveSection={setActiveSection}
				activeSection={activeSection}
			/>
			<Projects />
			<Play isDarkMode={isDarkMode} />
			<Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
		</div>
	);
}

export default App;
