from telnetlib import SE
from fastapi import APIRouter,HTTPException
from fastapi.params import Depends
from starlette.responses import HTMLResponse
from DataBase import get_session
from sqlalchemy.orm.session import Session
from Models.linea_model import Linea, LineaModel
from typing import List
from Repository.linea_repo import LineaRepositorio


linea_router = APIRouter(prefix='/linea', tags=['LINEA'])
repo = LineaRepositorio()

@linea_router.get('/')
def get_all_lineas(session: Session= Depends(get_session)):
    try:
        return repo.get_all_lineas(session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)


@linea_router.get('/{numero}')
def get_one_linea(numero:int, session:Session = Depends(get_session)):
    try:
        return repo.get_one_linea(numero, session)

    except Exception as er:
        raise HTTPException(status_code=500, detail = er.args)

@linea_router.delete('/{numero}')
def delete_linea(numero:int, session:Session= Depends(get_session)):
    try:
        return repo.delete_linea(numero, session)

    except Exception as er:
        raise HTTPException(status_code=500, detail = er.args)

@linea_router.post('/')
def post_new_linea(datos: LineaModel, session:Session= Depends(get_session)):
    try:
        return repo.post_new_linea(datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail = er.args)

@linea_router.put('/{numero}')
def update_linea(numero:int, datos: LineaModel, session:Session=Depends(get_session)):
    try:
         return repo.update_linea(numero,datos,session)
    except Exception as er:
        raise HTTPException(status_code=500, detail = er.args)
   