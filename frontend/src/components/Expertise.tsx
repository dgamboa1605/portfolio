import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faDocker, faPython } from "@fortawesome/free-brands-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

const frontendSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind",
  "SCSS",
];

const backendSkills = [
  "Node.js",
  "Express",
  "PostgreSQL",
  "MySQL",
  "REST APIs",
  "Python",
  "Flask",
];

const testingSkills = [
  "Jest",
  "Playwright",
  "Selenium",
  "Appium",
  "Postman",
  "JMeter",
  "Pytest",
  "SpecFlow",
];

const devopsSkills = [
  "Git",
  "GitLab CI/CD",
  "Docker",
  "Kubernetes",
  "AWS",
  "Linux",
];

const renderSkillGroup = (
  title: string,
  icon: React.ReactElement,
  description: string,
  labels: string[]
) => (
  <div className="skill">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="flex-chips">
      <span className="chip-title">Stack:</span>
      {labels.map((label, index) => (
        <Chip key={index} className="chip" label={label} />
      ))}
    </div>
  </div>
);

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">
          {renderSkillGroup(
            "Frontend Development",
            <FontAwesomeIcon icon={faReact} size="3x" />,
            "Building responsive UIs using React, Tailwind, TypeScript, and more.",
            frontendSkills
          )}
          {renderSkillGroup(
            "Backend & Automation",
            <FontAwesomeIcon icon={faPython} size="3x" />,
            "Designing RESTful APIs, automating tests and tasks using Python, Flask, and testing libraries.",
            backendSkills.concat(testingSkills)
          )}
          {renderSkillGroup(
            "DevOps & CI/CD",
            <FontAwesomeIcon icon={faDocker} size="3x" />,
            "Setting up CI/CD pipelines, Dockerizing apps, and managing environments.",
            devopsSkills
          )}
        </div>
      </div>
    </div>
  );
}

export default Expertise;
