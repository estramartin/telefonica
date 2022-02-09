
from datetime import date
from sqlalchemy.orm.session import Session
from Models.clientes_model import ClientesModel, Clientes
from Models.liena_equipo_plan_model import LienaEquipoPlan
from Models.equipo_model import Equipo
from Models.linea_model import Linea
from Models.planes_model import Planes
from sqlalchemy.sql.expression import select


class ClientesRepositorio():
    def get_all_clientes(self, session:Session):
        return session.query(Clientes,LienaEquipoPlan,Equipo, Linea, Planes).select_from(LienaEquipoPlan).join(Equipo).join(Linea).join(Planes).where(Clientes.lista_l_e_p == LienaEquipoPlan.linea).all()

    def get_one_cliente_lista(self, linea:int, session:Session):
        cliente = session.query(Clientes,LienaEquipoPlan,Equipo, Linea, Planes).select_from(LienaEquipoPlan).join(Equipo).join(Linea).join(Planes).where(Clientes.lista_l_e_p == LienaEquipoPlan.linea).where(Clientes.lista_l_e_p == linea).all()
        if cliente:
            return cliente
        
        else:
            raise Exception("Cliente no encontrado")

    def get_one_cliente_nombre(self, nombre:str, session:Session):
        cliente = session.query(Clientes,LienaEquipoPlan,Equipo, Linea, Planes).select_from(LienaEquipoPlan).join(Equipo).join(Linea).join(Planes).where(Clientes.lista_l_e_p == LienaEquipoPlan.linea).filter(Clientes.nombre.ilike(f'%{nombre}%')).all()
        if cliente:
            return cliente
        
        else:
            raise Exception("Cliente no encontrado")

    def post_new_cliente(self, datos:ClientesModel, session:Session):
        cliente = Clientes(direccion = datos.direccion, nombre = datos.nombre, edad = datos.edad, lista_l_e_p = datos.lista_l_e_p, sexo = datos.sexo, telefonos=datos.telefonos )
        if cliente:
            session.add(cliente)
            session.commit()
        else:
            raise Exception("Cliente vacio")
        return cliente
    
    def delete_cliente(self, linea:int , session :Session):
        cliente = session.get(Clientes, linea)
        if cliente:
            session.delete(cliente)
            session.commit()
        else:
            raise Exception("Cliente no encontrado")

        return "Cliente eliminado satisfactoriamente"

    def update_cliente(self, lista_l_e_p:int, datos: ClientesModel, session:Session):
        cliente = session.get(Clientes, lista_l_e_p )

        if cliente:
            cliente.direccion = datos.direccion
            cliente.nombre = datos.nombre
            cliente.edad = datos.edad
            cliente.sexo = datos.sexo
            cliente.telefonos = datos.telefonos
            session.commit()
        
        else:
            raise Exception('Cliente no encontrado')
        
        return cliente
    
    def actived_clientes_date(self, fecha:date, session:Session):
        cleintes_activos= session.query(Clientes,LienaEquipoPlan,Equipo, Linea, Planes).select_from(LienaEquipoPlan).join(Equipo).join(Linea).join(Planes).where(Clientes.lista_l_e_p == LienaEquipoPlan.linea).where(Linea.estado == 'activada' ).where(LienaEquipoPlan.fecha_inicio <=fecha).all()
        return cleintes_activos

    
   