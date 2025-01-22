import React, { useState } from "react";
import "./NavBar.scss";

const NavBar = ({ setActiveSection, activeSection }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const navItems = [
		{ label: "About", icon: "profile.svg" },
		{ label: "Projects", icon: "hammer.svg" },
		{ label: "Play", icon: "game.svg" },
		{ label: "Contact", icon: "contact.svg" },
	];

	const isMobile = window.matchMedia("(max-width: 600px)").matches;

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleButtonClick = (label) => {
		if (label === "Play") {
			setShowTooltip(!showTooltip);
		} else {
			setShowTooltip(false);
		}

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
					{item.label === "Play" && showTooltip && (
						<p className="navbar-tooltip">
							{!isMobile
								? "This section is a WIP, check back soon!"
								: "WIP"}
						</p>
					)}
				</button>
			))}
		</nav>
	);
};

export default NavBar;
