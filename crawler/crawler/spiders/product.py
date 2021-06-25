# -*- coding: utf-8 -*-
import scrapy
import json
import re

class ProductSpider(scrapy.Spider):
    name = 'product'
    allowed_domains = ["search.jd.com", "sclub.jd.com", "club.jd.com"]
    start_urls = ['https://search.jd.com/Search?keyword=冰箱&enc=utf-8&page=1']

    def parse(self, response):
        posts_s = response.css('.gl-item')
        serchUrl = response.url
        for post_s in posts_s:
            product_id = post_s.css('li.gl-item').xpath('@data-sku').extract_first()
            name = post_s.css('.p-name a em::text').extract_first()
            price = post_s.css('.p-price strong').xpath('@data-price').extract_first()
            if price is None:
                price = post_s.css('.p-price strong i::text').extract_first()
            product_index = post_s.css('.p-commit span em::text').extract_first()
            shop_name = post_s.css('.p-shop span a').xpath('@title').extract_first()
            url = post_s.css('.p-commit strong a').xpath('@href').extract_first()
            if url.find("#comment") == -1:
                print("parse不存在")
            else:
                print('前一半数据')
                yield {
                  'name': name,
                  'price': price,
                  'product_index': product_index,
                  'shop_name': shop_name,
                  'url': url,
                  'product_id': product_id,
                  'serchUrl': serchUrl
                }
        items = response.xpath('//*[@id="J_goodsList"]/ul/li/@data-sku').extract()
        goods_items=','.join(items)
        pre=serchUrl.find('page=')
        page=serchUrl[pre+5:]
        page = int(page) + 1
        print(page)
        print(goods_items)
        search_url2= 'https://search.jd.com/s_new.php?keyword=冰箱&enc=utf-8&page=' + str(page) + '&s=26&scrolling=y&pos=30&tpl=3_L&show_items=' + goods_items
        request = response.follow(search_url2, dont_filter=True, callback=self.half_parse)
        yield request

        for next_page in range(2, 100):
            page = (next_page * 2) - 1
            next_pages = 'https://search.jd.com/Search?keyword=冰箱&enc=utf-8&page=' + str(page)
            yield response.follow(next_pages, self.parse)

    def half_parse(self, response):
        posts_s = response.css('.gl-item')
        serchUrl = response.url
        pre=serchUrl.find('show_items=')
        serchUrl=serchUrl[pre:200]
        for post_s in posts_s:
            product_id = post_s.css('li.gl-item').xpath('@data-sku').extract_first()
            name = post_s.css('.p-name a em::text').extract_first()
            price = post_s.css('.p-price strong').xpath('@data-price').extract_first()
            if price is None:
                price = post_s.css('.p-price strong i::text').extract_first()
            product_index = post_s.css('.p-commit span em::text').extract_first()
            shop_name = post_s.css('.p-shop span a').xpath('@title').extract_first()
            url = post_s.css('.p-commit strong a').xpath('@href').extract_first()
            if url.find("#comment") == -1:
                print("half_parse不存在")
            else:
                print('后一半数据')
                yield {
                  'name': name,
                  'price': price,
                  'product_index': product_index,
                  'shop_name': shop_name,
                  'url': url,
                  'product_id': product_id,
                  'serchUrl': serchUrl
                }


