from django.http import HttpResponse
from fastapi import APIRouter,HTTPException
from fastapi.params import Depends
from DataBase import get_session
from sqlalchemy.orm.session import Session
from Models.planes_model import Planes, PlanesModel
from typing import List
from Repository.planes_repo import PLanesRepositorio


planes_router = APIRouter(prefix='/planes', tags=['PLANES'])
repo = PLanesRepositorio()

@planes_router.get('/')
def get_all_planes(session: Session= Depends(get_session)):
    try:
        return repo.get_all_planes(session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)
    finally:
        session.close()

@planes_router.get('/{nombre}')
def get_one_plan(nombre:str, session:Session=Depends(get_session)):
    try:    
        return repo.get_one_plan(nombre, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)
    finally:
        session.close()

@planes_router.delete('/{nombre}')
def delete_plan(nombre: str, session:Session = Depends(get_session)):
    try:
        return repo.delete_plan(nombre, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)
    finally:
        session.close()

@planes_router.post('/')
def post_new_plan(datos: PlanesModel, session:Session=Depends(get_session)):
    try:
      return repo.post_new_plan(datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)
    finally:
        session.close()

@planes_router.put('/{nombre}')
def update_plan(nombre: str, datos:PlanesModel, session: Session = Depends(get_session)):
    try:
        return repo.update_plan(nombre, datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)
    finally:
        session.close()        