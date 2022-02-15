from datetime import date, datetime
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.expression import column
from Models.equipo_model import Equipo, EquipoModel
from sqlalchemy.sql.expression import select
format_data = "%d/%m/%Y"

class EquipoRepositorio:
      def get_all_equipos(self, session:Session):
        return session.execute(select(Equipo).order_by(Equipo.marca)).scalars().all() 

      def get_one_equipo_codigo(self, codigo:int ,session:Session):
        equipo = session.execute(select(Equipo).where(Equipo.codigo == codigo)).scalar()
        if(equipo):
          return equipo
        else:
          raise Exception("Equipo no encontrado")

      def get_one_equipo_marca(self, marca:str, session:Session):
        equipo = session.execute(select(Equipo).where(column('marca').ilike(f'%{marca}%'))).scalars().all()
        if equipo:
          return equipo
        else:
          raise Exception('Equipo no encontrado')

      def get_one_equipo_modelo(self, modelo:str, session:Session):
        equipo = session.execute(select(Equipo).where(column('modelo').ilike(f'%{modelo}%'))).scalars().all()
        if equipo:
          return equipo
        else:
          raise Exception('Equipo no encontrado')


      def delete_equipo(self, codigo:int, session:Session):
        equipo = session.get(Equipo, codigo)
        if equipo:
          session.delete(equipo)
          session.commit()
          return 'Equipo eliminado correctamente!'
        else:
          raise Exception('Modelo no encotrado')
        
      def post_new_equipo(self, datos:EquipoModel, session: Session):
          equipo = Equipo(marca = datos.marca, modelo = datos.modelo, estado = datos.estado, fecha_ingreso = date.strftime(datos.fecha_ingreso, format_data) )
          session.add(equipo)
          session.commit()
          return equipo

      def update_equipo(self, codigo:int, datos: EquipoModel, session:Session):
          equipo = session.get(Equipo,codigo)
          if equipo:
             equipo.marca = datos.marca
             equipo.modelo = datos.modelo 
             equipo.estado = datos.estado
             equipo.fecha_ingreso = datos.fecha_ingreso
             session.commit()
          else:
            raise Exception('Equipo no encontrado')
          
          return equipo

     