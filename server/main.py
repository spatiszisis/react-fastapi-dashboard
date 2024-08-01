from fastapi import FastAPI
from db.database import engine
from routers import user_router, appointment_router, nutrition_program_router
from models import user_model, appointment_model, nutrition_program_model
import uvicorn
from sqlalchemy.exc import IntegrityError, StatementError
from exceptions import exception_handler

user_model.Base.metadata.create_all(bind=engine)
appointment_model.Base.metadata.create_all(bind=engine)
nutrition_program_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.exception_handler(IntegrityError)
async def sqlalchemy_exception_handler(request, exc: IntegrityError):
    return await exception_handler.handle_exceptions(request, exc)

@app.exception_handler(StatementError)
async def sqlalchemy_exception_handler(request, exc: StatementError):
    return await exception_handler.statement_error_exception_handler(request, exc)

app.include_router(user_router.router)
app.include_router(appointment_router.router)
app.include_router(nutrition_program_router.router)

if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)