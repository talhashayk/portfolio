import React, { useState } from "react";
import "./Contact.scss";

const Contact = ({ setActiveSection }) => {
	// eslint-disable-next-line no-unused-vars
	const [selectedOption, setSelectedOption] = useState(null);
	const [conversation, setConversation] = useState([]);

	const botMessages = [
		"Hi there! I'm Talha Bot.",
		"I'd be thrilled to assist with any questions you may have.",
		"How may I be of service?",
	];

	const userOptions = {
		"I just wanted to say hi!": [
			"Hi to you too!",
			"I Hope you enjoy browsing",
			"Thanks for visiting!",
			"Anything else I can help with?",
		],
		"Can I see your GitHub?": [
			`Here's my GitHub: github.com/talhashayk`,
			"Feel free to browse my repositories!",
			"Let me know if you need anything from there.",
			"Happy coding!",
		],
		"Where can I contact you?": [
			"You can contact me through my email: talhashake@gmail.com",
			"Feel free to reach out on LinkedIn as well!",
			"Looking forward to hearing from you!",
			"I respond within 24 hours.",
		],
		"I'd like to hire you.": [
			"That's awesome! You can email me at talhashake@gmail.com",
			"I would love to hear about the project.",
			"Feel free to share the details anytime.",
			"Looking forward to working together!",
		],
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setConversation((prevConversation) => [
			...prevConversation,
			{ sender: "user", message: option },
			{ sender: "bot", message: userOptions[option] },
		]);
	};

	const renderBotMessages = () => {
		return botMessages.map((message, index) => (
			<div className="contact-box-bot">
				<p key={index} className="contact-box-speech">
					{message}
				</p>
			</div>
		));
	};

	const renderUserOptions = () => {
		return Object.keys(userOptions).map((option, index) => (
			<p
				key={index}
				className="contact-box-option"
				onClick={() => handleOptionClick(option)}
			>
				{option}
			</p>
		));
	};

	const renderConversation = () => {
		return conversation.map((message, index) => {
			if (message.sender === "bot") {
				return (
					<div
						key={index}
						className="contact-box-bot contact-box-bot-shift"
					>
						{message.message.map((response, idx) => (
							<p key={idx} className="contact-box-speech">
								{response}
							</p>
						))}
					</div>
				);
			} else {
				return (
					<div key={index} className="contact-box-user">
						<p className="contact-box-option-selected">
							{message.message}
						</p>
					</div>
				);
			}
		});
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
				{renderBotMessages()}
				{renderConversation()}
				<div className="contact-box-user">{renderUserOptions()}</div>
			</div>
		</div>
	);
};

export default Contact;
