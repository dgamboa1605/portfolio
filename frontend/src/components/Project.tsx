import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import type { Project as ProjectType } from "../types/project";
import { logger } from "../utils/logger";
import { API_BASE } from "../config";
import "../assets/styles/Project.scss";

function Project() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => {
        logger.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      });
  }, []);

  return (
    <div className="projects-container" id="projects">
      <h1>My Projects</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project" key={project.id}>
            <a href={project.url} target="_blank" rel="noreferrer">
              <img
                src={`${API_BASE}${project.image_url}`}
                className="zoom"
                alt={project.title}
                width="100%"
              />
            </a>
            <a href={project.url} target="_blank" rel="noreferrer">
              <h2>{project.title}</h2>
            </a>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
