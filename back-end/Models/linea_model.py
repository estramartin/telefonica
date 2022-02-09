from pydantic import BaseModel
from sqlalchemy.types import BigInteger
from sqlalchemy.sql.sqltypes import String
from DataBase import Base
from sqlalchemy.schema import Column

class Linea(Base):
    __tablename__ = 'linea'
    numero = Column(BigInteger(), primary_key= True, nullable= False)
    estado = Column(String(15), nullable=False)

    
    def __str__(self):
        return self.numero

class LineaModel(BaseModel):
    numero: int
    estado: str
    class Coinfg:
        orm_mode = True
