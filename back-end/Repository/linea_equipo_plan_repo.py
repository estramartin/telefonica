from datetime import date, datetime
from queue import Full
from turtle import left
from sqlalchemy import null
from sqlalchemy.orm.session import Session
from Models.liena_equipo_plan_model import LienaEquipoPlan, LienaEquipoPlanModel
from Models.equipo_model import Equipo
from Models.linea_model import Linea
from Models.planes_model import Planes


class LineaEquipoPlanRepositorio():
    def get_all(self, session:Session):
        return session.query(LienaEquipoPlan, Linea,Equipo, Planes).select_from(LienaEquipoPlan).join(Linea).join(Equipo).join(Planes).order_by(LienaEquipoPlan.linea).all()

    def get_one_linea_equipo_plan(self, linea:int, session:Session):
         lineaEquipoPlan = session.query(LienaEquipoPlan, Linea,Equipo, Planes).select_from(LienaEquipoPlan).join(Linea).join(Equipo).join(Planes).where(LienaEquipoPlan.linea == linea).all()
         if(lineaEquipoPlan):
            return lineaEquipoPlan
         else:
             raise Exception('No encontrado') 

    def post_new_linea_equipo_plan(self, datos: LienaEquipoPlanModel, session:Session):
        
        if datos.linea <1:
            raise Exception("Debe seleccionar una linea")
        elif datos.equipo <1:
            raise Exception("Debe seleccionar un Equipo")
        elif len(datos.plan) <1:
            raise Exception("Dene seleccionar un Plan")
        else:
            lineaEquipoPlan = LienaEquipoPlan(plan= datos.plan, equipo = datos.equipo, fecha_inicio = datos.fecha_inicio, costo = datos.costo, linea = datos.linea, fecha_fin = datos.fecha_fin )
            session.add(lineaEquipoPlan)
            session.commit()
            return lineaEquipoPlan
            
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
        if datos.linea <1:
            raise Exception("Debe seleccionar una linea")
        elif datos.equipo <1:
            raise Exception("Debe seleccionar un Equipo")
        elif len(datos.plan) <1:
            raise Exception("Dene seleccionar un Plan")
        elif lienaEquipoPlan:
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
        equipos_activados = session.query(LienaEquipoPlan, Equipo, Linea, Planes).select_from(LienaEquipoPlan).join(Equipo).join(Linea).join(Planes).where(Linea.estado == 'activada').where(LienaEquipoPlan.fecha_inicio<= fecha).all() 
        return equipos_activados

    def get_lineas_libres(self, session:Session):
        lineas_libres = session.query(Linea).join(LienaEquipoPlan, full= True ).where(LienaEquipoPlan.linea == None).order_by(Linea.numero).all()
        return lineas_libres

    def get_equipos_libres(self, numero:int ,session:Session):
       if numero is null:
              equipos_libres = session.query(Equipo).select_from(LienaEquipoPlan ).join(Equipo, full= True).where(LienaEquipoPlan.linea == None).order_by(Equipo.marca).all()
              return equipos_libres
           
       else:
             equipos_libres = session.query(Equipo).select_from(LienaEquipoPlan ).join(Equipo, full= True).where(LienaEquipoPlan.linea == None).order_by(Equipo.marca).union(session.query(Equipo).select_from(LienaEquipoPlan).join(Equipo).where(LienaEquipoPlan.linea == numero)).all()
          
             return equipos_libres
       
    def get_lep_libres(self, session:Session):
         lineaEquipoPlan = session.query(LienaEquipoPlan,Linea,Equipo, Planes).select_from(LienaEquipoPlan).join(Linea, full=True).join(Equipo, full=True).join(Planes, full=True).all()
         if(lineaEquipoPlan):
            return lineaEquipoPlan
         else:
             raise Exception('No encontrado') 