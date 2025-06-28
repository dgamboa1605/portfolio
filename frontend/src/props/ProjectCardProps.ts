import type { Project } from "../types/project";
import { logger } from "../utils/logger";

/**
 * Props for the ProjectCard component.
 */
export interface ProjectCardProps {
    project: Project;
}

/**
 * Logs the project data when props are created or processed.
 * 
 * @param props - The ProjectCardProps object to log.
 */
export function logProjectCardProps(props: ProjectCardProps): void {
    logger.debug("ProjectCardProps received:", props.project);
}
