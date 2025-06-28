import { useEffect, useState, type JSX } from "react";
import { getProjects } from "../services/api";
import { ProjectCard } from "../components/ProjectCard";
import type { Project } from "../types/project";
import { logger } from "../utils/logger";

/**
 * Home page component that fetches and displays a list of projects.
 *
 * @component
 * @returns {JSX.Element} The rendered Home page.
 */

export default function Home(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        logger.error("Failed to fetch projects:", error);
      });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
