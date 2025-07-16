"""
This file defines the Pydantic schemas for project data validation and serialization.
It includes input and output schemas for creating and retrieving projects.
The schemas are used to ensure that the data conforms to the expected structure and types.
"""

from pydantic import BaseModel
from typing import List


class ProjectIn(BaseModel):
    """
    Schema for input data when creating or updating a project.

    Attributes:
        title (str): The title of the project.
        description (str): A brief description of the project.
        url (str): The URL where the project can be accessed.
        tags (List[str]): A list of tags associated with the project.
    """

    title: str
    description: str
    url: str
    tags: List[str]


class ProjectOut(ProjectIn):
    """
    Schema for output data when retrieving a project.
    Inherits from ProjectIn and adds an id field.
    """

    id: int
    image_url: str | None = None

    model_config = {
        "from_attributes": True
    }
