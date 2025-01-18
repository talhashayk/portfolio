import React, { useState, useEffect, useRef } from "react";
import "./Contact.scss";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import mailIcon from "../../assets/mail.svg";

const Contact = ({ setActiveSection }) => {
	const [conversation, setConversation] = useState([]);

	const botMessages = [
		"Hi there! I'm Talha Bot.",
		"I'd be thrilled to assist with any questions you may have.",
		"How may I be of service?",
	];

	const [userOptions, setUserOptions] = useState({
		"I just wanted to say hi!": [
			"Hi to you too!",
			"I hope you enjoy browsing.",
			"Thanks for visiting!",
			"Anything else I can help with?",
		],
		"Can I see your GitHub?": [
			<a
				href="https://github.com/talhashayk"
				target="_blank"
				rel="noopener noreferrer"
				className="response-link"
			>
				<img src={githubIcon} alt="GitHub" className="response-icon" />
				Here's my GitHub.
			</a>,
			"Feel free to browse my repositories!",
			"Let me know if you need anything from there.",
			"Happy coding!",
		],
		"Where can I contact you?": [
			<a
				href="https://www.linkedin.com/in/talhasheikhswe/"
				target="_blank"
				rel="noopener noreferrer"
				className="response-link"
			>
				<img
					src={linkedinIcon}
					alt="LinkedIn"
					className="response-icon"
				/>
				Message me on LinkedIn.
			</a>,
			<a
				href="mailto:talhashake@gmail.com"
				target="_blank"
				rel="noopener noreferrer"
				className="response-link"
			>
				<img src={mailIcon} alt="Email" className="response-icon" />
				Email me
			</a>,
			"Looking forward to hearing from you!",
			"I'll respond as soon as I can!",
		],
		"I'd like to hire you.": [
			"That's awesome!",
			<a
				href="mailto:talhashake@gmail.com"
				target="_blank"
				rel="noopener noreferrer"
				className="response-link"
			>
				<img src={mailIcon} alt="Email" className="response-icon" />
				You can email me here.
			</a>,
			"I would love to hear about the project.",
			"Feel free to share the details anytime.",
			"Looking forward to working together!",
		],
	});

	const handleOptionClick = (option) => {
		setConversation((prevConversation) => [
			...prevConversation,
			{ sender: "user", message: option },
			{ sender: "bot", message: userOptions[option] },
		]);

		setUserOptions((prevOptions) => {
			const newOptions = { ...prevOptions };
			delete newOptions[option];
			return newOptions;
		});
	};

	const endOfConversationRef = useRef(null);

	useEffect(() => {
		if (endOfConversationRef.current) {
			endOfConversationRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [conversation]);

	const renderBotMessages = () => {
		return botMessages.map((message, index) => (
			<div className="contact-box-bot" key={index}>
				<p className="contact-box-speech">{message}</p>
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
				<div ref={endOfConversationRef} />
			</div>
		</div>
	);
};

export default Contact;
