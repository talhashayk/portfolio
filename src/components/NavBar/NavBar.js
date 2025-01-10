import React, { useState } from "react";

import "./NavBar.css";

const NavBar = () => {
	const navItems = ["About", "Experience", "Play", "Contact"];
	const [activeIndex, setActiveIndex] = useState(null);

	const handleButtonClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<nav className="navbar">
			{navItems.map((label, index) => (
				<button
					key={index}
					className={`navbar-button ${
						activeIndex === index ? "active" : ""
					}`}
					onClick={() => handleButtonClick(index)}
				>
					{label}
				</button>
			))}
		</nav>
	);
};

export default NavBar;
