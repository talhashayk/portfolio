import React from "react";

import "./Bio.scss";
import hello from "../../images/page-images/hello.png";

const Bio = () => {
	return (
		<div className="bio-group">
			<p className="bio-text">
				I'm a Software Engineer with over 3 years of experience
				designing, building, and maintaining solid platforms.
			</p>
			<p className="bio-text">
				I love collaborating with teams, taking on challenges, and
				creating innovative solutions that make an impact.
			</p>
			<div>
				<img src={hello} alt="Hello" className="hello" />
				<p className="bio-text">
					I’m all about fostering a growth-focused, positive
					environment where great ideas thrive and projects succeed.
				</p>
			</div>
		</div>
	);
};

export default Bio;
