import React, { useState } from "react";
import "./Contact.css";

const Contact = ({ setActiveSection }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	const botMessages = [
		"Hi there! I'm Talha Bot.",
		"I'd be thrilled to assist with any questions you may have.",
		"How may I be of service?",
	];

	// Map of user options to their respective responses
	const userOptions = {
		"I just wanted to say hi!": [
			"Hi to you too!",
			"Hope you're enjoying your browsing",
			"Thanks for visiting",
			"Anything else I can help with?",
		],
		"Can I see your GitHub?": [
			"Here's my GitHub: github.com/talha-dev",
			"Feel free to browse my repositories!",
			"Let me know if you need anything from there.",
			"Happy coding!",
		],
		"Where can I contact you?": [
			"You can contact me through my email: talha@example.com",
			"Feel free to reach out on LinkedIn as well!",
			"Looking forward to hearing from you!",
			"I respond within 24 hours.",
		],
		"I'd like to hire you.": [
			"That's awesome! You can email me at talha@example.com",
			"I would love to hear about the project.",
			"Feel free to share the details anytime.",
			"Looking forward to working together!",
		],
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
	};

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
			<div className="contact-box-conversation">
				<div className="contact-box-bot">
					{botMessages.map((message, index) => (
						<p key={index} className="contact-box-speech">
							{message}
						</p>
					))}
				</div>

				<div className="contact-box-user">
					{selectedOption ? (
						<p className="contact-box-option-selected">
							{selectedOption}
						</p>
					) : (
						Object.keys(userOptions).map((option, index) => (
							<p
								key={index}
								className="contact-box-option"
								onClick={() => handleOptionClick(option)}
							>
								{option}
							</p>
						))
					)}
				</div>
				{selectedOption && (
					<div className="contact-box-bot contact-box-bot-shift">
						{userOptions[selectedOption].map((response, index) => (
							<p key={index} className="contact-box-speech">
								{response}
							</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Contact;
