from datetime import date
from fastapi import APIRouter,HTTPException
from fastapi.params import Depends
from DataBase import get_session
from sqlalchemy.orm.session import Session
from Models.clientes_model import ClientesModel
from typing import List
from Repository.clientes_repo import ClientesRepositorio

clientes_router = APIRouter(prefix='/clientes', tags=['Clientes'])
repo = ClientesRepositorio()

@clientes_router.get('/')
def get_all_clientes(session:Session=Depends(get_session)):
    try:
        return repo.get_all_clientes(session)

    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo falló en la carga de datos {er.args}')

@clientes_router.get('/{lista}')
def get_one_cliente_lista(lista: int, session:Session =Depends(get_session)):
    try:
        return repo.get_one_cliente_lista(lista, session)
    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo saió mal {er.args}')

@clientes_router.get('/nombre/{nombre}')
def get_one_cliente_nombre(nombre: str, session:Session =Depends(get_session)):
    try:
        return repo.get_one_cliente_nombre(nombre, session)
    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo saió mal {er.args}')

@clientes_router.post('/')
def post_new_cliente(datos:ClientesModel, session:Session=Depends(get_session)):
    try:
        return repo.post_new_cliente(datos, session)
    except Exception as er:
       raise HTTPException(status_code=500, detail= f'algo saió mal {er.args}')

@clientes_router.delete('/{linea}')
def delete_cliente(linea:int, session:Session= Depends(get_session)):
    try:
        return repo.delete_cliente(linea, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail=er.args)

@clientes_router.put('/{lista_l_e_p}')
def update_cliente(lista_l_e_p: int, datos: ClientesModel, session: Session = Depends(get_session)):
    try:
        return repo.update_cliente(lista_l_e_p, datos, session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@clientes_router.get('/fecha/{fecha_inicio}')
def actived_clientes_date(fecha_inicio:date, session:Session= Depends(get_session)):
    try:
        return repo.actived_clientes_date(fecha_inicio, session)

    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@clientes_router.get('/datos-clientes/')
def get_clientes_count(session:Session= Depends(get_session)):
    try:
        return repo.get_clientes_count(session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)

@clientes_router.get('/lineas-libres/')
def get_lineas_libres(session:Session= Depends(get_session)):
    try:
        return repo.get_lineas_libres(session)
    except Exception as er:
        raise HTTPException(status_code=500, detail= er.args)