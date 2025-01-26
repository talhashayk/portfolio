import React from "react";

import "./Play.scss";
import Tenzies from "../Tenzies/Tenzies";

const Play = ({ isDarkMode }) => {
	return (
		<div id="Play" className="play-section">
			<h1 className="play-title">Play</h1>
			<div className="games">
				<div className="coming-soon">
					<h2 className="coming-soon-text">Coming soon</h2>
				</div>
				<Tenzies isDarkMode={isDarkMode} />
				<div className="coming-soon">
					<h2 className="coming-soon-text">Coming soon</h2>
				</div>
			</div>
		</div>
	);
};

export default Play;
