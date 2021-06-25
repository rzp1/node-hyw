# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy import create_engine


Base = declarative_base()
engine = create_engine('mysql+mysqldb://root:rzp0310@39.108.213.139:3306/hyw?charset=utf8')

class Article(Base):
    __tablename__ = 'article_data'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    content = Column(Text)

Base.metadata.create_all(engine)
