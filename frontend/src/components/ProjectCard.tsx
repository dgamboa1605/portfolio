import type { JSX } from "react";
import type { ProjectCardProps } from "../props/ProjectCardProps";
import { logProjectCardProps } from "../props/ProjectCardProps";

/**
 * Renders a card displaying information about a project.
 * 
 * @component
 * @param {ProjectCardProps} props - The props for the component.
 * @returns JSX.Element
 */

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  logProjectCardProps({ project });

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-gray-700">{project.description}</p>

      <a
        href={project.url}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit
      </a>

      <div className="text-sm text-gray-500 mt-2">
        {project.tags.join(", ")}
      </div>
    </div>
  );
}
