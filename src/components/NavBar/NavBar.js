import React, { useState, useEffect } from "react";
import "./NavBar.scss";

const NavBar = ({ setActiveSection, activeSection }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	const navItems = [
		{ label: "About", icon: "profile.svg" },
		{ label: "Projects", icon: "hammer.svg" },
		{ label: "Play", icon: "game.svg" },
		{ label: "Chat", icon: "contact.svg" },
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

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
			{navItems.map((item, index) => (
				<button
					key={index}
					className={`navbar-button ${
						activeSection === item.label ? "active" : ""
					}`}
					style={{
						position: `${
							item.label === "Chat" ? "absolute" : "relative"
						}`,
						right: `${item.label === "Chat" ? "20px" : "0"}`,
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
