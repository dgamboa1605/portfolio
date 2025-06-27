"""
This file is part of the backend application for managing projects.
It defines the base class for SQLAlchemy ORM models and imports the ProjectORM model.
"""
from app.db.session import Base
from app.models.domain.project import ProjectORM
