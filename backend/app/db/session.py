"""
This module sets up the database session and engine for the application.
It uses SQLAlchemy to create a session factory and a base class for ORM models.
It also configures the database connection using settings from the application configuration.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.core.logger import Logger


logger = Logger(__name__).get_logger()


engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
logger.info(f"Database engine created using {settings.DATABASE_URL}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
