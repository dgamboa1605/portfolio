"""
This module defines the API endpoints for managing projects in the application.
It includes routes for fetching all projects and creating a new project.
The endpoints are implemented using FastAPI and interact with the database through SQLAlchemy.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.schemas.project import ProjectOut, ProjectIn
from app.services.project_service import ProjectService
from app.db.session import SessionLocal
from app.core.logger import Logger

router = APIRouter()
logger = Logger(__name__).get_logger()


def get_db():
    """
    This function creates a new database session and ensures it is closed after use.
    It is used as a dependency in FastAPI routes to provide a database session.
    Returns:
        Session: A SQLAlchemy session object that can be used to interact with the database.
    Yields:
        Session: A SQLAlchemy session object that is yielded for use in the route handler.
    Finally:
        Closes the database session to free up resources.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    """
    Fetches all projects from the database.
    Args:
        db (Session): The database session dependency.
    Returns:
        List[ProjectOut]: A list of projects retrieved from the database.
    Raises:
        HTTPException: If there is an error retrieving projects, a 500 Internal Server Error is raised.
    """
    logger.info("Fetching all projects")
    try:
        service = ProjectService(db)
        projects = service.list_projects()
        logger.debug(f"Projects retrieved: {projects}")
        return projects
    except Exception as e:
        logger.error(f"Error retrieving projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectIn, db: Session = Depends(get_db)):
    """
    Creates a new project in the database.
    Args:
        project (ProjectIn): The project data to be created.
        db (Session): The database session dependency.
    Returns:
        ProjectOut: The newly created project.
    Raises:
        HTTPException: If there is an error creating the project, a 500 Internal Server Error is raised.
    """
    logger.info(f"Creating project with title: {project.title}")
    try:
        service = ProjectService(db)
        new_project = service.create_project(project)
        logger.debug(f"Project created: {new_project}")
        return new_project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
