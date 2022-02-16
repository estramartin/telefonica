
from doctest import ELLIPSIS_MARKER
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.expression import select
from Models.planes_model import Planes, PlanesModel


class PLanesRepositorio():

    def get_all_planes(self, session:Session):
        return session.execute(select(Planes)).scalars().all() 

    def get_one_plan(self, nombre:str , session: Session):
        plan = session.execute(select(Planes).where(Planes.nombre.ilike(f"%{nombre}%"))).scalars().all()
        if(plan):
            return plan
        else:
            raise Exception('Plan no encontrado') 

    def delete_plan(self, nombre:str, session: Session ):
        plan = session.get(Planes, nombre)
        if plan:
            session.delete(plan)
            session.commit()
            return 'Plan eliminado con exito'
        else:
            raise Exception('Plan no encontrado')

    def post_new_plan(self, datos: PlanesModel, session:Session):
        if len(datos.nombre) < 3:
           raise Exception("El nombre debe tener 3 letras o mas")   
        elif datos.cant_gigas < 0:
            raise Exception("La cantidad de gigas no puede ser menor que 0")
        elif datos.cant_llamadas < 0:
            raise Exception("La cantidad de llamadas no puede ser menor que 0")     
        elif datos.cant_sms < 0:
            raise Exception("La cantidad de SMS no puede ser menor que 0")
        elif datos.costo < 0:
            raise Exception("El costo no puede ser menor que 0")
        elif len(datos.tipo) <2:
            raise Exception("Debe seleccionar un tipo de plan")         
        else:
            plan = Planes(nombre = datos.nombre, cant_llamadas = abs(datos.cant_llamadas), cant_sms = abs(datos.cant_sms), cant_gigas = abs(datos.cant_gigas), tipo = datos.tipo, costo = abs(datos.costo))
            session.add(plan)
            session.commit()
            return plan


    def update_plan(self, nombre:str, datos:PlanesModel, session:Session):
        plan = session.get(Planes, nombre)
        if len(datos.nombre) < 3:
           raise Exception("El nombre debe tener 3 letras o mas")   
        elif datos.cant_gigas < 0:
            raise Exception("La cantidad de gigas no puede ser menor que 0")
        elif datos.cant_llamadas < 0:
            raise Exception("La cantidad de llamadas no puede ser menor que 0")     
        elif datos.cant_sms < 0:
            raise Exception("La cantidad de SMS no puede ser menor que 0")
        elif datos.costo < 0:
            raise Exception("El costo no puede ser menor que 0")
        elif len(datos.tipo) <2:
            raise Exception("Debe seleccionar un tipo de plan")         
        elif(plan):
            plan.cant_llamadas = abs(datos.cant_llamadas)
            plan.cant_sms = abs(datos.cant_sms)
            plan.cant_gigas = abs(datos.cant_gigas)
            plan.tipo = datos.tipo
            plan.costo = abs(datos.costo)
            session.commit()
           
        else:
            raise Exception('Plan no encontrado')
    
        return plan