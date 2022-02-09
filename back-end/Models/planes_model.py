from tokenize import Double
from pydantic import BaseModel
from sqlalchemy import BigInteger, Float, Integer
from sqlalchemy.sql.sqltypes import String
from DataBase import Base
from sqlalchemy.schema import Column

class Planes(Base):
    __tablename__ = 'planes'
    nombre = Column(String(50), primary_key=True, nullable=False)
    cant_llamadas = Column(Integer(),nullable=False )
    cant_sms = Column(Integer(),nullable=False )
    cant_gigas = Column(Integer(),nullable=False )
    tipo = Column(String(), nullable=False)
    costo = Column(Float(), nullable=False)

    
    def __str__(self):
        return self.nombre

class PlanesModel(BaseModel):
    nombre : str
    cant_llamadas :int
    cant_sms: int
    cant_gigas : int
    tipo : str
    costo : float

    class Coinfg:
        orm_mode = True