# -*- coding: utf-8 -*-
import scrapy
import requests
import os
import urllib
from scrapy.selector import HtmlXPathSelector

class ArticleSpider(scrapy.Spider):
    name = 'article'
    start_urls = ['http://www.weishangdaxue.net/news/index.php?page=1']
    allowed_domains = ["weishangdaxue.net"]

    def parse(self, response):
        abstracts = response.css('.deanarticer .deanarticersummary').extract()
        posts_s = response.css('.deanarticel a').xpath('@href').extract()
        for index, post_s in enumerate(posts_s):
            abstract = abstracts[index]
            request = response.follow(post_s, callback=self.detail_article)
            request.meta['abstract'] = abstract
            yield request

    def detail_article(self, response):   
        hxs = HtmlXPathSelector(response) 
        title = hxs.select('//div[@class="deanacticletop"]/h4/text()').extract_first()
        content = hxs.select('//td[@id="article_content"]').extract_first()     
        imgs = hxs.select('//td[@id="article_content"]//div//a/img').xpath('@src').extract()
        folder_path = 'D:/code/crawler/crawler/images/'     
        cover_img = '/statics/images/article_img/no_data.jpg'
        for index, item in enumerate(imgs):
            try:
                if os.path.exists(folder_path) == False:  # 判断文件夹是否已经存在
                    os.makedirs(folder_path)  # 创建文件夹
                print item, index
                dowload = 'http://www.weishangdaxue.net/' +  item
                print dowload
                s=requests.session()
                headers={
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding':'gzip, deflate',
                'Accept-Language':'zh-CN,zh;q=0.9',
                'Cache-Control':'max-age=0',
                'Connection':'keep-alive',
                'Host':'www.weishangdaxue.net',
                'If-Modified-Since':'Fri, 21 Dec 2018 03:58:29 GMT',
                'If-None-Match':'"cf51d66ee198d41:0"',
                'Upgrade-Insecure-Requests':'1',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.15 Safari/537.36',
                }
                s.headers.update(headers)
                html = s.get(url=dowload)
                arr = item.split('/')
                file_name = arr[- 1]               
                open(folder_path + file_name,"w+").close()
                with open(folder_path + file_name, 'wb') as file:
                    file.write(html.content)
                content = content.replace(item, '/statics/images/article_img/' + file_name)
                cover_img = '/statics/images/article_img/' + file_name
            except Exception as e:
                print("33333333333333333:"+str(e))
        content = content.replace('http://www.weishangdaxue.net', 'http://hyw.renzp.xyz/')
        content = content.replace('微商大学网'.decode("utf-8"), '微货源网'.decode("utf-8"))
        title = title.replace('微商大学网'.decode("utf-8"), '微货源网'.decode("utf-8"))
        yield {
            'title': title,
            'cover_img': cover_img,
            'content': content,
            'abstract': response.meta['abstract']
        }

        for next_page in range(1, 20):
            next_page = 'http://www.weishangdaxue.net/news/index.php?page=' + str(next_page)
            yield response.follow(next_page, self.parse)
