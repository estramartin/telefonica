
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.expression import select
from Models.linea_model import Linea, LineaModel


class LineaRepositorio():

    def get_all_lineas(self, session:Session):
        lineas =  session.execute(select(Linea).order_by(Linea.numero)).scalars().all() 
        return lineas

    def get_one_linea(self, numero: int, session: Session):
        linea = session.execute(select(Linea).where(Linea.numero == numero)).scalar()
        if(linea):
            return linea
        else:
            raise Exception('Linea no encotrado')

    def get_one_linea_by_estado(self, estado: str, session: Session):
        linea = session.query(Linea).filter(Linea.estado.ilike(f'%{estado}%') ).all()
        if(linea):
            return linea
        else:
            raise Exception('Linea no encotrado')

    def delete_linea(self, numero :int, session:Session):
        linea = session.get(Linea, numero)
        if linea:
            session.delete(linea)
            session.commit()
            return 'Eliminado con Exito'
        else:
            raise Exception('Linea no encontrado')

    def post_new_linea(self, datos:LineaModel, session:Session):
        if datos.numero < 999999:
            raise Exception("El numero debe tener mas de 7 caracteres")
        if len(datos.estado) < 2:
            raise Exception("Debe seleccionar un estado")
        
        
        linea = Linea(numero = datos.numero, estado = datos.estado)
        session.add(linea)
        session.commit()
        return linea

    def update_linea(self, numero:int, datos:LineaModel, session:Session):
        linea = session.get(Linea, numero)

        if linea:
            linea.estado = datos.estado
            session.commit()
            return linea
        else:
            raise Exception("Elemento no encotrado")

   