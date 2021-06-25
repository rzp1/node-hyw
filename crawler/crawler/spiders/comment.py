# -*- coding: utf-8 -*-
import scrapy
import json
import re

class CommentSpider(scrapy.Spider):
    name = 'comment'
    allowed_domains = ["search.jd.com", "sclub.jd.com", "club.jd.com"]
    start_urls = ['https://search.jd.com/Search?keyword=冰箱&enc=utf-8&page=1']

    def parse(self, response):
        posts_s = response.css('.gl-item')
        serchUrl = response.url
        for post_s in posts_s:
            product_id = post_s.css('li.gl-item').xpath('@data-sku').extract_first()
            print('后一半数据')
            comment_count_url = 'http://club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=' + str(product_id)
            request = response.follow(comment_count_url, dont_filter=True, callback=self.comtent_count_parse)
            request.meta['product_id'] = product_id
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

        for next_page in range(2, 100):
            page = (next_page * 2) - 1
            next_pages = 'https://search.jd.com/Search?keyword=%27%E5%86%B0%E7%AE%B1%27&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=mac&stock=1&page=' + str(page)
            yield response.follow(next_pages, self.parse)

    def half_parse(self, response):
        posts_s = response.css('.gl-item')
        serchUrl = response.url
        pre=serchUrl.find('show_items=')
        serchUrl=serchUrl[pre:200]
        for post_s in posts_s:
            product_id = post_s.css('li.gl-item').xpath('@data-sku').extract_first()
            print('后一半数据')
            comment_count_url = 'http://club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=' + str(product_id)
            request = response.follow(comment_count_url, dont_filter=True, callback=self.comtent_count_parse)
            request.meta['product_id'] = product_id
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
                request.meta['product_id'] = response.meta['product_id'],
                yield request
                
    def comtent_page_parse(self, response):
        body = str(response.body, encoding = "GBK")
        body = re.search(r'(?<=fetchJSON_comment98vv52814\().*(?=\);)', body).group(0)
        bjson = json.loads(body)
        if len(bjson['comments']):
            for comment in bjson['comments']:
                content = comment['content']
                nickname = comment['nickname']
                creationTime = comment['creationTime']
                referenceName = comment['referenceName']
                yield {
                  'content': content,
                  'nickname': nickname,
                  'creationTime': creationTime,
                  'referenceName': referenceName,
                  'product_id': response.meta['product_id'],
                }
        else:
          print('暂无评论！')
          pass


