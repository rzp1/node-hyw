# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 初始化数据库连接:
engine = create_engine('postgresql+psycopg2://crawler:qwer147A@192.168.1.71:5432/crawler')
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
