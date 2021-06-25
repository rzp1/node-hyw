# -*- coding: utf-8 -*-
import scrapy
import json
import re

class JdProductSpider(scrapy.Spider):
    name = 'jdProduct'
    allowed_domains = ["search.jd.com", "sclub.jd.com", "club.jd.com"]
    start_urls = ['https://search.jd.com/Search?keyword=冰箱&enc=utf-8&page=0']

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
                print('后一半数据')
                comment_count_url = 'http://club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=' + str(product_id)
                request = response.follow(comment_count_url, dont_filter=True, callback=self.comtent_count_parse)
                request.meta['name'] = name
                request.meta['price'] = price
                request.meta['product_index'] = product_index
                request.meta['shop_name'] = shop_name
                request.meta['url'] = url
                request.meta['product_id'] = product_id
                request.meta['serchUrl'] = serchUrl
                yield request
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

        for next_page in range(0, 99):
            page = (next_page * 2) - 1
            next_pages = 'https://search.jd.com/Search?keyword=%27%E5%86%B0%E7%AE%B1%27&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=mac&stock=1&page=' + str(page)
            yield response.follow(next_pages, self.parse)

    def half_parse(self, response):
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
                print("half_parse不存在")
            else:
                print('后一半数据')
                comment_count_url = 'http://club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=' + str(product_id)
                request = response.follow(comment_count_url, dont_filter=True, callback=self.comtent_count_parse)
                request.meta['name'] = name
                request.meta['price'] = price
                request.meta['product_index'] = product_index
                request.meta['shop_name'] = shop_name
                request.meta['url'] = url
                request.meta['product_id'] = product_id
                request.meta['serchUrl'] = serchUrl
                yield request

    def comtent_count_parse(self, response):
        body = str(response.body, encoding = "GBK")
        bjson = json.loads(body)
        comment_count = int(bjson['CommentsCount'][0]['CommentCount'])
        comment_page = int(comment_count / 10)
        if comment_page > -1:
            if comment_page > 100:
                comment_page = 98
            print(response.meta['product_id'])
            print(comment_count)
            print(comment_page)
            for next_comment_page in range(0, comment_page + 2):
                comtent_url = 'http://sclub.jd.com/comment/productPageComments.action?callback=fetchJSON_comment98vv52814&productId=' + str(response.meta['product_id']) + '&score=0&sortType=5&page=' + str(next_comment_page) + '&pageSize=10&isShadowSku=0&fold=1'
                request = response.follow(comtent_url, dont_filter=True, headers={'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"},callback=self.comtent_page_parse)
                request.meta['name'] = response.meta['name'],
                request.meta['price'] = response.meta['price'],
                request.meta['product_index'] = response.meta['product_index'],
                request.meta['shop_name'] = response.meta['shop_name'],
                request.meta['url'] = response.meta['url'],
                request.meta['product_id'] = response.meta['product_id'],
                request.meta['serchUrl'] = response.meta['serchUrl']
                yield request
                
    def comtent_page_parse(self, response):
        body = str(response.body, encoding = "GBK")
        body = re.search(r'(?<=fetchJSON_comment98vv52814\().*(?=\);)', body).group(0)
        bjson = json.loads(body)
        if len(bjson['comments']):
            for comment in bjson['comments']:
                content = comment['content']
                yield {
                  'content': content,
                  'name': response.meta['name'],
                  'price': response.meta['price'],
                  'product_index': response.meta['product_index'],
                  'shop_name': response.meta['shop_name'],
                  'url': response.meta['url'],
                  'product_id': response.meta['product_id'],
                  'serchUrl': response.meta['serchUrl']
                }
        else:
          print('暂无评论！')
          pass


