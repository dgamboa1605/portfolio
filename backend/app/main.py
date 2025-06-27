"""
Main entry point for the FastAPI application.
This module initializes the FastAPI app, sets up the database connection,
and includes the API routers for handling project-related endpoints.
"""

from fastapi import FastAPI
from app.api.v1.endpoints import projects
from app.db.session import engine
from app.db.base import Base
from app.core.logger import Logger


logger = Logger(__name__).get_logger()

app = FastAPI(title="Portfolio API")

Base.metadata.create_all(bind=engine)
logger.info("Database tables created.")

app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
logger.info("Projects router registered.")
