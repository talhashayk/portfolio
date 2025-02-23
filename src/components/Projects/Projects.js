import React, { useState, useRef, useEffect } from "react";
import "./Projects.scss";
import { projectData } from "./projectData.js";
import moreIcon from "../../assets/more.svg";

const Projects = () => {
	const [activeProject, setActiveProject] = useState(null);
	const projectsSectionRef = useRef(null);

	const handleProjectClick = (index) => {
		setActiveProject(index === activeProject ? null : index);
	};

	const getBackgroundColorFromText = (text) => {
		let hash = 0;

		[...text].forEach((char) => {
			hash = char.charCodeAt(0) + ((hash << 5) - hash);
		});

		const r = (hash >> 16) & 255;
		const g = (hash >> 8) & 255;
		const b = hash & 255;

		return `rgba(${r}, ${g}, ${b}, 0.2)`;
	};

	useEffect(() => {
		if (activeProject !== null && projectsSectionRef.current) {
			projectsSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [activeProject]);

	return (
		<div
			id="Projects"
			className="projects-section"
			ref={projectsSectionRef}
		>
			<h1 className="projects-title">Projects</h1>
			<div className="projects-container">
				<div
					className={`projects ${
						activeProject !== null ? "hide-projects" : ""
					}`}
				>
					{projectData.map((project, index) => (
						<div
							key={index}
							className={`project ${
								activeProject === index
									? "selected-project"
									: ""
							}`}
							onClick={() => handleProjectClick(index)}
						>
							<h3 className="project-title">{project.title}</h3>
							<div className="skills">
								{project.skills
									.slice(0, 2)
									.map((skill, skillIndex) => (
										<p
											key={`${project.title}-skill-${skillIndex}`}
											className="skill"
											style={{
												backgroundColor: `${getBackgroundColorFromText(
													skill
												)}`,
											}}
										>
											{skill}
										</p>
									))}
								<img
									src={moreIcon}
									alt={"more"}
									className={"more more-skills"}
								/>
							</div>
						</div>
					))}
				</div>

				{activeProject !== null && (
					<div className="active-project">
						<div>
							<h3 className="project-title">
								{projectData[activeProject].title}
							</h3>
							<p className="project-description">
								{projectData[activeProject].description}
							</p>
						</div>
						<div>
							<p className="project-role">
								{projectData[activeProject].role}
							</p>
							<div className="skills">
								{projectData[activeProject].skills.map(
									(skill, skillIndex) => (
										<p
											key={`active-project-skill-${skillIndex}`}
											className="skill"
											style={{
												backgroundColor: `${getBackgroundColorFromText(
													skill
												)}`,
											}}
										>
											{skill}
										</p>
									)
								)}
							</div>
							<button
								onClick={() => setActiveProject(null)}
								className="back-button"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;
