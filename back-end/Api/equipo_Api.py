from django.http import HttpRequest
from fastapi import APIRouter,HTTPException
from fastapi.params import Depends
from DataBase import get_session
from sqlalchemy.orm.session import Session
from Models.equipo_model import EquipoModel
from typing import List
from Repository.equipo_repo import EquipoRepositorio


equipo_router = APIRouter(prefix='/equipo', tags=['EQUIPO'])
repo = EquipoRepositorio()

@equipo_router.get('/')
def get_all_equipos(session: Session= Depends(get_session)):
    try:
        return repo.get_all_equipos(session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@equipo_router.get('/codigo/{codigo}')
def get_one_equipo_codigo(codigo:int, session:Session = Depends(get_session)):
    try:
        return repo.get_one_equipo_codigo(codigo, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail=er.args)

@equipo_router.get('/{marca}')
def get_one_equipo_marca(marca:str, session: Session= Depends(get_session)):
    try:
        return repo.get_one_equipo_marca(marca,session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@equipo_router.get('/modelo/{modelo}')
def get_one_equipo_modelo(modelo:str, session: Session= Depends(get_session)):
    try:
        return repo.get_one_equipo_modelo(modelo, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@equipo_router.delete('/delete/{codigo}')
def delete_equipo(codigo:int, session:Session= Depends(get_session) ):
    try:
       return repo.delete_equipo(codigo, session)
    except Exception as er:
         raise HTTPException(status_code=500, detail= er.args)

@equipo_router.post('/')
def post_new_equipo(datos: EquipoModel, session:Session = Depends(get_session)):
    
    try:
        return repo.post_new_equipo(datos, session)
    except Exception as er:
         raise HTTPException(status_code=500, detail= er.args)

@equipo_router.put('/{codigo}')
def update_equipo(codigo: int, datos: EquipoModel, session:Session=Depends(get_session)):
    try:
       return repo.update_equipo(codigo, datos,session)
    except Exception as er:
         raise HTTPException(status_code=500, detail= er.args)

