# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

# from sqlalchemy import Column, String, create_engine
# from sqlalchemy.orm import sessionmaker
# from crawler.db.config import DBSession
# from crawler.db.contacts import Contacts 


# class PostgreSQLPipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         contacts = Contacts(phone=item["phone"],
#                     taobao_level=item["taobao_level"],
#                     enterprise_name=item["enterprise_name"],
#                     enterprise_nick=item["enterprise_nick"],
#                     name=item["name"],
#                     website=item["website"],
#                     province=item["province"],
#                     city=item["city"],
#                     addr=item["addr"])
#         self.session.add(contacts)
#         self.session.commit()
#         return item

# from sqlalchemy import Column, String, create_engine
# from sqlalchemy.orm import sessionmaker
# from crawler.db.config import DBSession
# from crawler.db.wanfang import Wanfang


# class PostgreSQLPipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         wanfang = Wanfang(title=item["title"],
#                     abstract=item["abstract"],
#                     data_type=item["data_type"],
#                     url=item['url'],
#                     keyword=item["keyword"])

#         self.session.add(wanfang)
#         self.session.commit()
#         return item

# from crawler.db.config import DBSession
# from crawler.db.wanfang import Wanfang
# from crawler.db.duoxinqi import DuoXinQi
# from crawler.db.product import Product


# class XmhrssPipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         product = Product(product_id=item["product_id"],
#                     name=item["name"],                                  
#                     product_index=item['product_index'],
#                     price=item["price"],  
#                     shop_name=item['shop_name'],
#                     serchUrl=item['serchUrl'],
#                     url=item['url'])
#         self.session.add(product)
#         try:
#             self.session.commit()
#         except:
#             self.session.rollback()
#             raise
#         finally:
#             self.session.close() 
#         return item

# class JdProductPipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         comment = Comment(nickname=item["nickname"],
#                     product_id=item["product_id"],
#                     referenceName=item["referenceName"],
#                     content=item["content"],
#                     creationTime=item["creationTime"])

#         self.session.add(comment)
#         try:
#             self.session.commit()
#         except:
#             self.session.rollback()
#             raise
#         finally:
#             self.session.close() 
#         return item

# class HaierPipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         ofweek7300 = Ofweek7300(title=item["title"],
#                     abstract=item["abstract"],
#                     url=item['url'])

#         self.session.add(ofweek7300)
#         self.session.commit()
#         return item


# class EvolifePipeline(object):
#     def open_spider(self, spider):
#         self.session = DBSession()

#     def close_spider(self, spider):
#         self.session.close()

#     def process_item(self, item, spider):
#         evolife = Evolife(title=item["title"],
#                     abstract=item["abstract"],
#                     url=item['url'])

#         self.session.add(evolife)
#         self.session.commit()
#         return item

import datetime
import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy import create_engine

# 初始化数据库连接:
engine = create_engine('mysql+pymysql://root:rzp0310@39.108.213.139:3306/hyw?charset=utf8')
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
Base = declarative_base()

# 微商资讯
class Article(Base):
    __tablename__ = 'article'

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow)
    member_id = Column(Integer, default=0)
    type_id = Column(Integer, default=1)
    title = Column(String(255))
    content = Column(Text)
    cover_img = Column(String(255))
    popularity = Column(Integer)
    is_recommended = Column(Integer, default=0)
    is_checked= Column(Integer, default=1)
    abstract = Column(String(255))


Base.metadata.create_all(engine)

class FirstCrawlerPipeline(object):
    def open_spider(self, spider):
        self.session = DBSession()

    def close_spider(self, spider):
        self.session.close()

    def process_item(self, item, spider):
        article = Article(
            title=item["title"],
            content=item["content"],
            cover_img=item['cover_img'],
            abstract=item['abstract'],
            popularity=random.randint(0, 200)
            )
        self.session.add(article)
        try:
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close() 
        return item


        # 货源
class Huoyuan(Base):
    __tablename__ = 'huoyuan_info'

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow)
    member_id = Column(Integer, default=0)
    type_id = Column(Integer)
    title = Column(String(255))
    weixin_num = Column(String(255))
    weixin_qrcode = Column(String(255))
    qq_num = Column(String(255))
    tel_num = Column(String(255))
    introduction = Column(Text)
    main_img = Column(String(255))
    describe = Column(Text)
    popularity = Column(Integer)
    is_delete = Column(Integer, default=0)
    recommended_type = Column(Integer, default=0)
    status= Column(Integer, default=8)


Base.metadata.create_all(engine)

class HuoyuanPipeline(object):
    def open_spider(self, spider):
        self.session = DBSession()

    def close_spider(self, spider):
        self.session.close()

    def process_item(self, item, spider):
        huoyuan = Huoyuan(
            type_id=item['type_id'],
            title=item["title"],
            weixin_num=item["weixin_num"],
            weixin_qrcode=item["weixin_qrcode"],
            qq_num=item["qq_num"],
            tel_num=item["tel_num"],
            introduction=item["introduction"],
            main_img=item["main_img"],
            describe=item["describe"],
            popularity=item["popularity"]
            )
        self.session.add(huoyuan)
        try:
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close() 
        return item