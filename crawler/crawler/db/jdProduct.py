# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy import create_engine


Base = declarative_base()
engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/crawler')

class Product(Base):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(64))
    name = Column(String(255))
    price = Column(String(32))
    url = Column(String(255))
    product_index = Column(String(32))
    shop_name = Column(String(255))
    serchUrl = Column(String(255))
    
class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(Text)
    product_id = Column(String(64))

Base.metadata.create_all(engine)
