import React from "react";

import "./NavBar.scss";

const NavBar = ({ setActiveSection, activeSection }) => {
	const navItems = [
		{ label: "About", icon: "profile.svg" },
		{ label: "Experience", icon: "hammer.svg" },
		{ label: "Play", icon: "game.svg" },
		{ label: "Contact", icon: "contact.svg" },
	];

	const handleButtonClick = (label) => {
		activeSection !== label
			? setActiveSection(label)
			: setActiveSection(null);
	};

	return (
		<nav className="navbar">
			{navItems.map((item, index) => (
				<button
					key={index}
					className={`navbar-button ${
						activeSection === item.label ? "active" : ""
					}`}
					onClick={() => handleButtonClick(item.label)}
				>
					<img
						src={require(`../../assets/${item.icon}`)}
						alt={`${item.label} icon`}
						className={`navbar-icon navbar-icon-${item.label.toLowerCase()}`}
					/>
					<span>{item.label}</span>
				</button>
			))}
		</nav>
	);
};

export default NavBar;
