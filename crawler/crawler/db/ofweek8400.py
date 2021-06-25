# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy import create_engine


Base = declarative_base()
engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/crawler')

class Ofweek8400(Base):
    __tablename__ = 'ofweek8400'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    abstract = Column(Text)
    url = Column(String(255))

Base.metadata.create_all(engine)
