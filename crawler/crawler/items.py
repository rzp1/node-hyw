# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

    # phone = scrapy.Field()
    # enterprise_name = scrapy.Field()
    # enterprise_nick = scrapy.Field()
    # province = scrapy.Field()
    # city = scrapy.Field()
    # taobao_level = scrapy.Field()
    # addr = scrapy.Field()
    # wetsite = scrapy.Field()

    # commit_time = scrapy.Field()
    # name = scrapy.Field()
    # consult_type = scrapy.Field()
    # source = scrapy.Field()
    # business_type = scrapy.Field()
    # message = scrapy.Field()
    # reply_t = scrapy.Field()
    # reply = scrapy.Field()

    # title = scrapy.Field()
    # keyword = scrapy.Field()
    # abstract = scrapy.Field()
    # data_type = scrapy.Field()
    # url = scrapy.Field()
    product_id = scrapy.Field()
    name = scrapy.Field()
    price = scrapy.Field()
    url = scrapy.Field()
    product_index = scrapy.Field()
    shop_name = scrapy.Field()
    content = scrapy.Field()


class HaierItem(scrapy.Item):
    title = scrapy.Field()
    abstract = scrapy.Field()
    url = scrapy.Field()
