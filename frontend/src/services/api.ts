import { PROJECTS_ENDPOINT } from "../config";
import { logger } from "../utils/logger";

/**
 * Fetches the list of projects from the backend API.
 * 
 * @async
 * @function getProjects
 * @returns {Promise<any[]>} A promise that resolves to an array of projects.
 * @throws Will throw an error if the fetch request fails.
 */
export async function getProjects(): Promise<any[]> {
  logger.info(`Fetching projects from API: ${PROJECTS_ENDPOINT}`);

  try {
    const res = await fetch(PROJECTS_ENDPOINT);

    if (!res.ok) {
      const errorText = await res.text();
      logger.error(`Failed to fetch projects: ${res.status} ${res.statusText} - ${errorText}`);
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    logger.info(`Successfully fetched ${data.length} projects.`);
    return data;

  } catch (error) {
    logger.error("Error fetching projects:", error);
    throw error;
  }
}
