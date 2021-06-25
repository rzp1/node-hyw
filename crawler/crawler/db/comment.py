# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy import create_engine


Base = declarative_base()
engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/crawler')

class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(255))
    product_id = Column(String(32))
    creationTime = Column(DateTime)
    referenceName = Column(String(255))
    content = Column(Text)
    
Base.metadata.create_all(engine)
