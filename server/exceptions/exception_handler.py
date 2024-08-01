from fastapi import Request
from fastapi.responses import JSONResponse
from psycopg2.errors import UniqueViolation, ForeignKeyViolation
from sqlalchemy.exc import StatementError, IntegrityError
import logging
from builtins import LookupError

async def handle_exceptions(request: Request, exc: IntegrityError):
    if isinstance(exc.orig, UniqueViolation):
        return JSONResponse(
            status_code=400,
            content={"detail": "The entry already exists"},
        )
    
    if isinstance(exc.orig, ForeignKeyViolation):
        return JSONResponse(
            status_code=400,
            content={"detail": "The entry does not exist"},
        )
    
    logging.error(exc)

async def statement_error_exception_handler(request: Request, exc: StatementError):
    if isinstance(exc.orig, StatementError):
        return JSONResponse(
            status_code=400,
            content={"detail": "Statement Error"},
        )
    
    if isinstance(exc.orig, LookupError):
        return JSONResponse(
            status_code=400,
            content={"detail": "Lookup Error"},
        )
