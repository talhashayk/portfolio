import React from "react";

import "./App.css";

import TimeSlits from "./components/TimeSlits/TimeSlits";
import NavBar from "./components/NavBar/NavBar";
import Headline from "./components/Headline/Headline";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Bio from "./components/Bio/Bio";

function App() {
	return (
		<div className="App">
			<NavBar />
			{TimeSlits()}
			<div className="main-content">
				<Headline />
				<Bio />
				<ImageCarousel />
			</div>
		</div>
	);
}

export default App;
