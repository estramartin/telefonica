from datetime import date
from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Float
from sqlalchemy.types import BigInteger
from sqlalchemy.orm import backref, relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Date, String,Integer
from DataBase import Base
from sqlalchemy.schema import Column

class LienaEquipoPlan(Base):
    __tablename__ ="linea_equipo_plan"
    linea =Column(BigInteger(), ForeignKey('linea.numero'), primary_key=True)
    equipo = Column(Integer(), ForeignKey('equipo.codigo'), nullable=False)
    plan = Column(String(50), ForeignKey('planes.nombre'), nullable=False)
    fecha_inicio = Column(Date(), nullable=False, )
    fecha_fin = Column(Date(),nullable=True ,  default= None)
    costo = Column(Float())

    fk_linea = relationship("Linea", backref=backref('linea_numero'), foreign_keys=[linea])
    fk_equipo = relationship("Equipo", backref=backref('equipo_codigo'), foreign_keys=[equipo])
    fk_linea = relationship("Planes", backref=backref('planes_nombre'), foreign_keys=[plan])
    
    def __str__(self):
        return self.linea


class LienaEquipoPlanModel(BaseModel):
  
    linea : int
    equipo : int
    plan : str
    fecha_inicio : date
    fecha_fin : Optional[date]
    costo : Optional[float]

    class Coinfg:
        orm_mode = True
    