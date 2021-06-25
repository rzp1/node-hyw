# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
# from sqlalchemy import create_engine


Base = declarative_base()
# engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/zxdyw')

class Contacts(Base):
    __tablename__ = 'contacts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    phone = Column(String(32))
    taobao_level = Column(String(32))
    enterprise_name = Column(String(255))
    enterprise_nick = Column(String(255))
    addr = Column(String(255))
    name = Column(String(255))
    website = Column(String(255))
    province = Column(String(64))
    city = Column(String(64))

# Base.metadata.create_all(engine)
