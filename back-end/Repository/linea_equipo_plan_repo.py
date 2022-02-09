from datetime import date, datetime
from sqlalchemy.orm.session import Session
from Models.liena_equipo_plan_model import LienaEquipoPlan, LienaEquipoPlanModel
from Models.equipo_model import Equipo
from Models.linea_model import Linea
from Models.planes_model import Planes


class LineaEquipoPlanRepositorio():
    def get_all(self, session:Session):
        
        return session.query(LienaEquipoPlan, Linea,Equipo, Planes).select_from(LienaEquipoPlan).join(Linea).join(Equipo).join(Planes).all()

    def get_one_linea_equipo_plan(self, linea:int, session:Session):
         lineaEquipoPlan = session.query(LienaEquipoPlan, Linea,Equipo, Planes).select_from(LienaEquipoPlan).join(Linea).join(Equipo).join(Planes).where(LienaEquipoPlan.linea == linea).all()
         if(lineaEquipoPlan):
            return lineaEquipoPlan
         else:
             raise Exception('No encontrado') 

    def post_new_linea_equipo_plan(self, datos: LienaEquipoPlanModel, session:Session):
        lineaEquipoPlan = LienaEquipoPlan(plan= datos.plan, equipo = datos.equipo, fecha_inicio = datos.fecha_inicio, costo = datos.costo, linea = datos.linea, fecha_fin = datos.fecha_fin )
        if lineaEquipoPlan:
            session.add(lineaEquipoPlan)
            session.commit()
            return lineaEquipoPlan
        else:
            raise Exception('No creado')
            
    def delete_linea_equipo_plan( self, linea:int, session:Session):
        lineaEquipoPlan = session.get(LienaEquipoPlan, linea)
        
        if lineaEquipoPlan:
            session.delete(lineaEquipoPlan)
            session.commit()
            return 'Eliminado correctamente'
        else:
            raise Exception('No encotrado')
        
    def update_linea_equipo_plan(self, linea:int, datos:LienaEquipoPlanModel, session:Session):
        lienaEquipoPlan = session.get(LienaEquipoPlan, linea)

        if(lienaEquipoPlan):
            lienaEquipoPlan.plan =datos.plan
            lienaEquipoPlan.equipo = datos.equipo
            lienaEquipoPlan.fecha_inicio = datos.fecha_inicio
            lienaEquipoPlan.fecha_fin = datos.fecha_fin
            lienaEquipoPlan.costo = datos.costo
            session.commit()
            return lienaEquipoPlan
        else:
            raise Exception("No encontrado")

    
    def get_actived_equipos(self, fecha:date, session:Session):
        equipos_activados = session.query(Equipo, Linea.estado).select_from(LienaEquipoPlan).join(Equipo).join(Linea).where(Linea.estado == 'activada').where(LienaEquipoPlan.fecha_inicio<= fecha).all() 
        return equipos_activados