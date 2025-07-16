/**
 * Represents a project with basic details.
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image_url: string;
};
