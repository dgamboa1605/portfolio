"""
This module defines the ProjectService class, which provides methods to manage projects.
It includes methods to list all projects and create a new project.
The service layer interacts with the repository layer to perform database operations.
"""

from sqlalchemy.orm import Session
from typing import List
from app.models.schemas.project import ProjectOut, ProjectIn
from app.repositories.project_repository import ProjectRepository
from app.core.logger import Logger


logger = Logger(__name__).get_logger()


class ProjectService:
    """
    Service layer for managing projects.
    Provides methods to list all projects and create a new project.
    """

    def __init__(self, db: Session):
        """
        Initializes the ProjectService with a database session.

        Args:
            db (Session): The SQLAlchemy database session to use for database operations.
        """
        self.repo = ProjectRepository(db)

    def list_projects(self) -> List[ProjectOut]:
        """
        Lists all projects from the database.

        Returns:
            List[ProjectOut]: A list of ProjectOut objects representing all projects.
        """
        logger.info("Listing all projects via service layer")
        try:
            projects = self.repo.get_all()
            result = [
                ProjectOut(
                    id=getattr(p, "id"),
                    title=getattr(p, "title"),
                    description=getattr(p, "description"),
                    url=getattr(p, "url"),
                    tags=getattr(p, "tags").split(",") if getattr(p, "tags") else [],
                )
                for p in projects
            ]
            logger.debug(f"{len(result)} projects returned from service")
            return result
        except Exception as e:
            logger.error(f"Error in list_projects: {str(e)}")
            raise

    def create_project(self, project: ProjectIn) -> ProjectOut:
        """
        Creates a new project in the database.

        Args:
            project (ProjectIn): The project data to create, validated by the ProjectIn schema.

        Returns:
            ProjectOut: The created project as a ProjectOut object.
        """
        logger.info(f"Creating project via service: {project.title}")
        try:
            db_project = self.repo.create(project)
            result = ProjectOut(
                id=getattr(db_project, "id"),
                title=getattr(db_project, "title"),
                description=getattr(db_project, "description"),
                url=getattr(db_project, "url"),
                tags=(
                    getattr(db_project, "tags").split(",")
                    if getattr(db_project, "tags")
                    else []
                ),
            )
            logger.debug(f"Project created via service with ID: {result.id}")
            return result
        except Exception as e:
            logger.error(f"Error in create_project: {str(e)}")
            raise
