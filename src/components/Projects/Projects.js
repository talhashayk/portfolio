import React, { useState } from "react";
import "./Projects.scss";
import { projectData } from "./projectData.js";

const Projects = () => {
	const [activeProject, setActiveProject] = useState(null);

	const handleProjectClick = (index) => {
		setActiveProject(index === activeProject ? null : index);
	};

	return (
		<div id="Projects" className="projects-section">
			<h1 className="projects-title">Projects</h1>
			<div className="projects-container">
				<div className="projects">
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
									.map((skill, idx) => (
										<p key={idx} className="skill">
											{skill}
										</p>
									))}
								<p className="skill more-skills">+</p>
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
							<p>{projectData[activeProject].description}</p>
						</div>
						<div className="skills">
							{projectData[activeProject].skills.map(
								(skill, idx) => (
									<p key={idx} className="skill">
										{skill}
									</p>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;
