import React from "react";

import TimeSlits from "../TimeSlits/TimeSlits";
import NavBar from "../NavBar/NavBar";
import Headline from "../Headline/Headline";
import ImageSlider from "../ImageSlider/ImageSlider";
import Bio from "../Bio/Bio";
import Contact from "../Contact/Contact";

const About = ({
	isDarkMode,
	toggleDarkMode,
	setActiveSection,
	activeSection,
}) => {
	return (
		<div id="top">
			<NavBar
				setActiveSection={setActiveSection}
				activeSection={activeSection}
			/>
			<TimeSlits
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
			/>
			<div className="main-content">
				<Headline />
				<Bio />
			</div>
			<ImageSlider />
			<div className="main-content">
				{activeSection === "Chat" && (
					<Contact setActiveSection={setActiveSection} />
				)}
			</div>
		</div>
	);
};

export default About;
