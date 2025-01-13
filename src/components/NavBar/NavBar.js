import React from "react";

import "./NavBar.css";

const NavBar = ({ setActiveSection, activeSection }) => {
	const navItems = ["About", "Experience", "Play", "Contact"];

	const handleButtonClick = (label) => {
		setActiveSection(label);
	};

	return (
		<nav className="navbar">
			{navItems.map((label, index) => (
				<button
					key={index}
					className={`navbar-button ${
						activeSection === label ? "active" : ""
					}`}
					onClick={() => handleButtonClick(label)}
				>
					{label}
				</button>
			))}
		</nav>
	);
};

export default NavBar;
