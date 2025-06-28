import logging
import os

from logging.handlers import RotatingFileHandler
from app.core.config import settings
from typing import Optional


class Logger:
    _instances = {}
    _logger: Optional[logging.Logger] = None

    def __new__(cls, name: str = "Logger"):
        if name not in cls._instances:
            instance = super(Logger, cls).__new__(cls)
            instance._logger = logging.getLogger(name)
            instance._logger.setLevel(settings.LOG_LEVEL.upper())
            instance._logger.propagate = False

            formatter = logging.Formatter(settings.LOG_FORMAT)

            if settings.LOG_TO_CONSOLE:
                console_handler = logging.StreamHandler()
                console_handler.setFormatter(formatter)
                instance._logger.addHandler(console_handler)

            if settings.LOG_TO_FILE:
                log_dir = os.path.dirname(settings.LOG_FILE)
                if not os.path.exists(log_dir):
                    os.makedirs(log_dir)

                file_handler = RotatingFileHandler(
                    settings.LOG_FILE, maxBytes=10**6, backupCount=5
                )
                file_handler.setFormatter(formatter)
                instance._logger.addHandler(file_handler)

            cls._instances[name] = instance
        return cls._instances[name]

    def get_logger(self) -> logging.Logger:
        if self._logger is None:
            raise RuntimeError("Logger has not been initialized.")
        return self._logger
