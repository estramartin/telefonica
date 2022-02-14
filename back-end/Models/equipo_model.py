from datetime import datetime, date
from pickletools import long1, long4
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import Date, String, Integer
from DataBase import Base
from sqlalchemy.schema import Column


class Equipo(Base):
    __tablename__ = 'equipo'
    codigo = Column(Integer(), primary_key=True, autoincrement=True )
    marca = Column(String(50), nullable= False)
    modelo = Column(String(50), nullable=False)
    fecha_ingreso = Column(Date(), nullable=False)
    estado = Column(String(50), nullable=False)
    

    
    def __str__(self):
        return self.codigo

class EquipoModel(BaseModel):
     
     marca : str
     modelo :str
     fecha_ingreso : date
     estado :str

     class Coinfg:
        orm_mode = True
