import React from "react";

import "./NavBar.scss";

const NavBar = ({ setActiveSection, activeSection }) => {
	const navItems = [
		{ label: "About", icon: "profile.svg" },
		{ label: "Projects", icon: "hammer.svg" },
		{ label: "Play", icon: "game.svg" },
		{ label: "Contact", icon: "contact.svg" },
	];

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleButtonClick = (label) => {
		if (activeSection !== label) {
			setActiveSection(label);
			scrollToSection(label);
		} else {
			setActiveSection(null);
		}
	};

	return (
		<nav className="navbar">
			{navItems.map((item, index) => (
				<button
					key={index}
					className={`navbar-button ${
						activeSection === item.label ? "active" : ""
					}`}
					style={{
						position: `${
							item.label === "Contact" ? "absolute" : "relative"
						}`,
						right: `${item.label === "Contact" ? "20px" : "0"}`,
					}}
					onClick={() => handleButtonClick(item.label)}
				>
					<img
						src={require(`../../assets/${item.icon}`)}
						alt={`${item.label} icon`}
						className={`navbar-icon navbar-icon-${item.label.toLowerCase()}`}
					/>
					<span className="hide-from-mobile">{item.label}</span>
				</button>
			))}
		</nav>
	);
};

export default NavBar;
