from fastapi import FastAPI
from routers import user_router, appointment_router, nutrition_program_router, auth_routes, nutrition_program_day_router
from db.database import engine
from models import user_model, appointment_model, nutrition_program_model
import uvicorn
from sqlalchemy.exc import IntegrityError, StatementError
from exceptions import exception_handler
import inspect, re
from fastapi_jwt_auth import AuthJWT
from fastapi.routing import APIRoute
from fastapi.openapi.utils import get_openapi
from schemas import auth_schema
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user_model.Base.metadata.create_all(bind=engine)
appointment_model.Base.metadata.create_all(bind=engine)
nutrition_program_model.Base.metadata.create_all(bind=engine)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title = "Nutrition Program API",
        version = "1.0",
        description = "An API for a Nutrition Program Service",
        routes = app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "Bearer Auth": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "Enter: **'Bearer &lt;JWT&gt;'**, where JWT is the access token"
        }
    }

    # Get all routes where jwt_optional() or jwt_required
    api_router = [route for route in app.routes if isinstance(route, APIRoute)]

    for route in api_router:
        path = getattr(route, "path")
        endpoint = getattr(route,"endpoint")
        methods = [method.lower() for method in getattr(route, "methods")]

        for method in methods:
            # access_token
            if (
                re.search("jwt_required", inspect.getsource(endpoint)) or
                re.search("fresh_jwt_required", inspect.getsource(endpoint)) or
                re.search("jwt_optional", inspect.getsource(endpoint))
            ):
                openapi_schema["paths"][path][method]["security"] = [
                    {
                        "Bearer Auth": []
                    }
                ]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

@AuthJWT.load_config
def get_config():
    return auth_schema.Settings()

# @app.exception_handler(IntegrityError)
# async def sqlalchemy_exception_handler(request, exc: IntegrityError):
#     return await exception_handler.handle_exceptions(request, exc)

# @app.exception_handler(StatementError)
# async def sqlalchemy_exception_handler(request, exc: StatementError):
#     return await exception_handler.statement_error_exception_handler(request, exc)

app.include_router(auth_routes.router)
app.include_router(user_router.router)
app.include_router(appointment_router.router)
app.include_router(nutrition_program_router.router)
app.include_router(nutrition_program_day_router.router)

if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)