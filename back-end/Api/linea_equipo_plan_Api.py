from datetime import date
from fastapi import APIRouter,HTTPException
from fastapi.params import Depends
from DataBase import get_session
from sqlalchemy.orm.session import Session
from Models.liena_equipo_plan_model import LienaEquipoPlanModel
from typing import List
from Repository.linea_equipo_plan_repo import LineaEquipoPlanRepositorio

linea_eqipo_plan_router = APIRouter(prefix='/linea-equipo-plan', tags=['LINEA-EQUIPO-PLAN'])
repo = LineaEquipoPlanRepositorio()

@linea_eqipo_plan_router.get('/')
def get_all(session:Session=Depends(get_session)):
    try:
        return repo.get_all(session)

    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo falló en la carga de datos {er.args}',)

@linea_eqipo_plan_router.get('/{linea}')
def get_one_linea_equipo_plan(linea: int, session:Session = Depends(get_session)):
    try:
        return repo.get_one_linea_equipo_plan(linea, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@linea_eqipo_plan_router.post('/')
def post_new_linea_equipo_plan(datos: LienaEquipoPlanModel, session:Session= Depends(get_session)):
    try:
       
        return repo.post_new_linea_equipo_plan(datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@linea_eqipo_plan_router.delete('/{linea}')
def delete_linea_equipo_plan(linea:int, session:Session=Depends(get_session)):
    try:
        return repo.delete_linea_equipo_plan(linea, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@linea_eqipo_plan_router.put('/{linea}')
def update_linea_equipo_plan(linea: int, datos:LienaEquipoPlanModel, session: Session = Depends(get_session)):
    try:
        return repo.update_linea_equipo_plan(linea, datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@linea_eqipo_plan_router.get('/fecha/{fecha}')
def get_actived_equipos(fecha:date, session:Session=Depends(get_session)):
    try:
        return repo.get_actived_equipos(fecha,session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@linea_eqipo_plan_router.get('/lieas-disponibles/')
def get_lineas_libres(session:Session=Depends(get_session)):
    try:
        return repo.get_lineas_libres(session)

    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo falló en la carga de datos {er.args}',)

@linea_eqipo_plan_router.get('/equipos-disponibles/{numero}')
def get_equipos_libres(numero: int, session:Session=Depends(get_session)):
    try:
        return repo.get_equipos_libres(numero, session)

    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo falló en la carga de datos {er.args}',)

@linea_eqipo_plan_router.get('/equipos-lineas-planes-disponibles/')
def get_lep_libres(session:Session=Depends(get_session)):
    try:
        return repo.get_lep_libres(session)

    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo falló en la carga de datos {er.args}',)
