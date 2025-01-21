import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import mailIcon from "../../assets/mail.svg";

export const botMessagesData = [
	"Hi there! I'm Talha Bot.",
	"I'd be thrilled to assist with any questions you may have.",
	"How may I be of service?",
];

export const userOptionsData = {
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
			<img src={linkedinIcon} alt="LinkedIn" className="response-icon" />
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
};
