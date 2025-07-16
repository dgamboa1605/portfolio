"""
This module defines the API endpoints for managing projects in the application.
It includes routes for fetching all projects and creating a new project.
The endpoints are implemented using FastAPI and interact with the database through SQLAlchemy.
"""

import os
from shutil import copyfileobj
from uuid import uuid4
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from typing import List
from app.models.schemas.project import ProjectOut, ProjectIn
from app.services.project_service import ProjectService
from app.db.session import SessionLocal
from app.core.logger import Logger
from app.core.config import settings

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
async def get_projects(db: Session = Depends(get_db)):
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
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    url: str = Form(...),
    tags: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Creates a new project in the database with the provided details and image.

    Args:
        title (str): The title of the project.
        description (str): A brief description of the project.
        url (str): The URL where the project can be accessed.
        tags (str): A comma-separated string of tags associated with the project.
        image (UploadFile): The image file associated with the project.
        db (Session): The database session dependency.

    Returns:
        ProjectOut: The created project as a ProjectOut object.

    Raises:
        HTTPException: If there is an error creating the project, a 500 Internal Server Error is raised.
    """
    logger.info(f"Creating project with title: {title}")

    if not os.path.exists(settings.UPLOAD_DIR):
        os.makedirs(settings.UPLOAD_DIR)

    filename_str = image.filename if image.filename is not None else ""
    ext = os.path.splitext(filename_str)[-1]
    filename = f"{uuid4().hex}{ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        copyfileobj(image.file, f)

    image_url = f"/uploads/{filename}"

    try:
        project_data = ProjectIn(
            title=title,
            description=description,
            url=url,
            tags=tags.split(","),
        )
        service = ProjectService(db)
        new_project = service.create_project(project_data, image_url=image_url)
        logger.debug(f"Project created: {new_project}")
        return new_project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
