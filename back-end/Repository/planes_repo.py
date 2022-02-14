
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
        plan = Planes(nombre = datos.nombre, cant_llamadas = datos.cant_llamadas, cant_sms = datos.cant_sms, cant_gigas = datos.cant_gigas, tipo = datos.tipo, costo = datos.costo)
        session.add(plan)
        session.commit()
        return plan

    def update_plan(self, nombre:str, datos:PlanesModel, session:Session):
        plan = session.get(Planes, nombre)
        if(plan):
            plan.cant_llamadas = datos.cant_llamadas
            plan.cant_sms = datos.cant_sms
            plan.cant_gigas = datos.cant_gigas
            plan.tipo = datos.tipo
            plan.costo = datos.costo
            session.commit()
           
        else:
            raise Exception('Plan no encontrado')
    
        return plan