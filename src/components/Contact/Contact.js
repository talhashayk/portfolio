import React from "react";

import "./Contact.css";

const Contact = ({ setActiveSection }) => {
	return (
		<div className="contact-box">
			<div className="contact-box-header">
				<div className="contact-box-photo-title">
					<div className="contact-box-photo-wrapper">
						<img
							src={require("../../images/image2.png")}
							alt="Description"
							className="contact-box-photo"
						/>
					</div>
					<div>
						<h1 className="contact-box-name">Talha Bot</h1>
						<p className="contact-box-cue">Ask me a question</p>
					</div>
				</div>
				<div
					className="contact-box-close"
					onClick={() => setActiveSection(null)}
				></div>
			</div>
		</div>
	);
};

export default Contact;
