""" "
This module defines the ProjectRepository class, which provides methods to interact with the project data in the database.
It includes methods to retrieve all projects and create a new project.
"""

from sqlalchemy.orm import Session
from typing import List
from app.models.schemas.project import ProjectIn
from app.models.domain.project import ProjectORM
from app.core.logger import Logger


logger = Logger(__name__).get_logger()


class ProjectRepository:
    """
    Repository for managing project data in the database.
    Provides methods to retrieve all projects and create a new project.
    """

    def __init__(self, db: Session):
        """
        Initializes the ProjectRepository with a database session.

        Args:
            db (Session): The SQLAlchemy database session to use for database operations.
        """
        self.db = db

    def get_all(self) -> List[ProjectORM]:
        """
        Retrieves all projects from the database.

        Returns:
            List[ProjectORM]: A list of ProjectORM objects representing all projects in the database.
        """
        logger.info("Fetching all projects from the database")
        try:
            projects = self.db.query(ProjectORM).all()
            logger.debug(f"Retrieved {len(projects)} projects")
            return projects
        except Exception as e:
            logger.error(f"Error fetching projects: {str(e)}")
            raise

    def create(self, project: ProjectIn) -> ProjectORM:
        """
        Creates a new project in the database.

        Args:
            project (ProjectIn): The project data to create, validated by the ProjectIn schema.

        Returns:
            ProjectORM: The created project as a ProjectORM object.
        """
        logger.info(f"Creating project with title: {project.title}")
        try:
            tags_str = ",".join(project.tags)
            db_project = ProjectORM(
                **project.model_dump(exclude={"tags"}), tags=tags_str
            )
            self.db.add(db_project)
            self.db.commit()
            self.db.refresh(db_project)
            logger.debug(f"Project created with ID: {db_project.id}")
            return db_project
        except Exception as e:
            logger.error(f"Error creating project: {str(e)}")
            self.db.rollback()
            raise
