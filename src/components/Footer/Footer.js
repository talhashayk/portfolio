import React from "react";

import "./Footer.scss";

import locationIcon from "../../assets/location.svg";
import mailIcon from "../../assets/mail.svg";
import downloadIcon from "../../assets/download.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import githubIcon from "../../assets/github.svg";
import profileIcon from "../../assets/profile.svg";
import projectsIcon from "../../assets/hammer.svg";
import playIcon from "../../assets/game.svg";
import sunIcon from "../../assets/sun.svg";
import moonIcon from "../../assets/moon.svg";
import pageTopIcon from "../../assets/up.svg";

const Footer = ({ isDarkMode, toggleDarkMode }) => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="contact-info">
					<a
						href="https://www.google.com/maps?q=Blackburn,Lancashire,UK"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={locationIcon}
							alt={"Location"}
							className="icon location-icon"
						/>
						Blackburn, UK
					</a>
					<a href="mailto:talha@example.com">
						<img
							src={mailIcon}
							alt={"Mail"}
							className="icon mail-icon"
						/>
						talhashake@gmail.com
					</a>
					<a
						href={`${process.env.PUBLIC_URL}/talha-cv.pdf`}
						download="talha-cv.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={downloadIcon}
							alt={"CV"}
							className="icon download-icon"
						/>
						Download my CV
					</a>
				</div>
				<div className="social-links">
					<a
						href="https://github.com/talhashayk"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={githubIcon} alt={"GitHub"} className="icon" />
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/talhasheikhswe"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={linkedinIcon}
							alt={"LinkedIn"}
							className="icon"
						/>
						LinkedIn
					</a>
				</div>
				<nav className="footer-nav">
					<a href="#top">
						<img src={profileIcon} alt={"About"} className="icon" />
						About
					</a>
					<a href="#Projects">
						<img
							src={projectsIcon}
							alt={"Projects"}
							className="icon"
						/>
						Projects
					</a>
					<a href="#top">
						<img src={playIcon} alt={"Play"} className="icon" />
						Play
					</a>
				</nav>
				<div>
					<p className="footer-options" onClick={toggleDarkMode}>
						<img
							src={isDarkMode ? moonIcon : sunIcon}
							alt={"Theme"}
							className="icon"
						/>
						Change theme
					</p>
					<p className="footer-options" onClick={scrollToTop}>
						<img src={pageTopIcon} alt={"Up"} className="icon" />
						Back to page top
					</p>
				</div>
				<div>
					<p className="footer-tagline">2025 Talha Sheikh.</p>
					<p className="footer-tagline">
						Crafting solutions with code and creativity.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
