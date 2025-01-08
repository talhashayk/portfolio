import React from "react";

import "./App.css";

import TimeSlits from "./components/TimeSlits";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<NavBar />
			{TimeSlits()}
		</div>
	);
}

export default App;
