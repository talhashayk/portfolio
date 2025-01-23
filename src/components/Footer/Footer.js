import React from "react";

import "./Footer.scss";

import locationIcon from "../../assets/location.svg";
import mailIcon from "../../assets/mail.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import githubIcon from "../../assets/github.svg";
import profileIcon from "../../assets/profile.svg";
import projectsIcon from "../../assets/hammer.svg";
import playIcon from "../../assets/game.svg";

const Headline = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="contact-info">
					<p className="location">
						<img
							src={locationIcon}
							alt={"Location"}
							className="icon location-icon"
						/>
						Blackburn, UK
					</p>
					<a href="mailto:talha@example.com">
						<img
							src={mailIcon}
							alt={"Mail"}
							className="icon mail-icon"
						/>
						talhashake@gmail.com
					</a>
				</div>
				<div className="social-links">
					<a
						href="https://github.com/yourprofile"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={githubIcon} alt={"GitHub"} className="icon" />
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/yourprofile"
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
					<a href="#About">
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
					<a href="#Play">
						<img src={playIcon} alt={"Play"} className="icon" />
						Play
					</a>
				</nav>
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

export default Headline;
