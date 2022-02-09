from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Api.clientes_Api import clientes_router 
from Api.equipo_Api import equipo_router
from Api.linea_Api import linea_router
from Api.planes_Api import planes_router
from Api.linea_equipo_plan_Api import linea_eqipo_plan_router
import DataBase as db
import uvicorn


app = FastAPI()

app.include_router(clientes_router)
app.include_router(linea_eqipo_plan_router)
app.include_router(equipo_router)
app.include_router(linea_router)
app.include_router(planes_router)


origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# db.Drop_all()
# db.create_all()


if __name__ == '__main__':
    uvicorn.run("main:app", reload = True)
