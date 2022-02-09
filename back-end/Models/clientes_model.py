
from pydantic import BaseModel
from sqlalchemy.types import BigInteger, Integer
from sqlalchemy.orm import backref, relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import String
from DataBase import Base
from sqlalchemy.schema import Column

class Clientes(Base):
    __tablename__ = 'clientes'

    nombre = Column(String(50), nullable=False)
    direccion = Column(String(100), nullable=False)
    sexo = Column(String(12) )
    edad = Column(Integer(), nullable=False)
    telefonos = Column(BigInteger())
    lista_l_e_p = Column(BigInteger(), ForeignKey('linea_equipo_plan.linea'),primary_key=True)

    fk_lista_l_e_p = relationship("LienaEquipoPlan", backref=backref('lin_eq_pla_linea'), foreign_keys=[lista_l_e_p])

    def __str__(self):
        return self.nombre


class ClientesModel(BaseModel):
    nombre: str
    direccion:str
    sexo:str
    edad: int
    telefonos: int
    lista_l_e_p: int 
  
    class Coinfg:
        orm_mode = True