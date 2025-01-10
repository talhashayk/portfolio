import React from "react";

import "./App.css";

import TimeSlits from "./components/TimeSlits/TimeSlits";
import NavBar from "./components/NavBar/NavBar";
import Headline from "./components/Headline/Headline";

function App() {
	return (
		<div className="App">
			<NavBar />
			{TimeSlits()}
			<Headline />
		</div>
	);
}

export default App;
