"""
This file is part of the backend application for managing projects.
It defines the SQLAlchemy ORM model for the projects table, including its attributes and their types.
The model is used to interact with the database and perform CRUD operations on project records.
"""

from sqlalchemy import Column, Integer, String
from app.db.session import Base


class ProjectORM(Base):
    """
    ProjectORM is the SQLAlchemy ORM model for the projects table.
    It defines the structure of the projects table in the database.

    Attributes:
        id (int): The unique identifier for the project.
        title (str): The title of the project.
        description (str): A brief description of the project.
        url (str): The URL where the project can be accessed.
        tags (str): A comma-separated string of tags associated with the project.
    """

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    url = Column(String)
    tags = Column(String)
    image_url = Column(String)
