import React from "react";

const NavBar = () => {
	const buttons = ["About", "Experience", "Play", "Contact"];

	return (
		<nav className="navbar">
			{buttons.map((label, index) => (
				<button
					key={index}
					className={`navbar-button navbar-button-${label.toLowerCase()}`}
				>
					{label}
				</button>
			))}
		</nav>
	);
};

export default NavBar;
