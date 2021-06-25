# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy import create_engine


Base = declarative_base()
engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/crawler')

class Xmhrssqa(Base):
    __tablename__ = 'xmhrssqa' # 厦门人力资源和社会保障局咨询表

    id = Column(Integer, primary_key=True, autoincrement=True)
    commit_time = Column(DateTime)
    name = Column(String(64))
    consult_type = Column(String(255))
    source = Column(String(255))
    business_type = Column(String(64))
    message = Column(Text)
    reply_t = Column(DateTime)
    reply = Column(Text)

Base.metadata.create_all(engine)
