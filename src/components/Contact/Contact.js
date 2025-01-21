import React, { useState, useEffect, useRef } from "react";
import "./Contact.scss";
import { botMessagesData, userOptionsData } from "./contactData.js";

const Contact = ({ setActiveSection }) => {
	const [conversation, setConversation] = useState([]);

	const botMessages = botMessagesData;

	const [userOptions, setUserOptions] = useState(userOptionsData);

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
							src={require("../../images/image1.png")}
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
