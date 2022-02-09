from sqlalchemy import engine, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base



conexion_postgres = ('postgresql://postgres:Qaws4503@localhost:5432/telefonia')

engine = create_engine(conexion_postgres, echo = True)

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def Drop_all():
    Base.metadata.drop_all(bind = engine)


def create_all():
    Base.metadata.create_all(bind = engine)


def get_session():

    session = session_local()

    try:
        yield session

    except:
        session.close()