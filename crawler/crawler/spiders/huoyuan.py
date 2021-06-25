# -*- coding: utf-8 -*-
import scrapy
import requests
import os
import urllib
from scrapy.selector import HtmlXPathSelector

class HuoyuanSpider(scrapy.Spider):
    name = 'huoyuan'
    start_urls = ['http://www.huoyuanwang.cn/']
    allowed_domains = ["huoyuanwang.cn"]

    def parse(self, response):
        info_links = response.css('.dropdown li a').xpath('@href').extract()
        type_id = 0
        for info_link in info_links:
            print info_link
            if "nanzhuang" in info_link:
                type_id = 3
            elif "nvzhuang" in info_link:
                type_id = 1
            elif "tongzhuang" in info_link:
                type_id = 2
            elif "neiyi" in info_link:
                type_id = 14
            elif "nanxie" in info_link:
                type_id = 6
            elif "nvxie" in info_link:
                type_id = 4
            elif "tongxie" in info_link:
                type_id = 5
            elif "yundongxie" in info_link:
                type_id = 7
            elif "xiangbaopiju" in info_link:
                type_id = 11
            elif "huazhuangpin" in info_link:
                type_id = 15
            elif "hufuping" in info_link:
                type_id = 15
            elif "mianmo" in info_link:
                type_id = 15
            elif "shoushen" in info_link:
                type_id = 15
            elif "nvshiyongpin" in info_link:
                type_id = 15
            elif "muying" in info_link:
                type_id = 12
            elif "baojianqiexie" in info_link:
                type_id = 8
            elif "baojianpin" in info_link:
                type_id = 8
            elif "dianzishumachanpin" in info_link:
                type_id = 10
            elif "techanmeishi" in info_link:
                type_id = 18
            elif "shishangshipin" in info_link:
                type_id = 9
            elif "shechipin" in info_link:
                type_id = 19
            if type_id == 0:               
                print('00000000000000')
            else:           
                request = response.follow(info_link, callback=self.huoyuan_list)
                request.meta['type_id'] = type_id,
                request.meta['info_link'] = info_link
                yield request

    def huoyuan_list(self, response):   
        huoyuan_lists = response.css('.infolistbg tr:first-child a').xpath('@href').extract()
        for huoyuan in huoyuan_lists:
            request = response.follow(huoyuan, callback=self.huoyuan_detail)
            request.meta['type_id'] = response.meta['type_id']
            yield request

        for next_page in range(1, 5):
            info_link = response.meta['info_link']           
            next_page = info_link + 'page-' + str(next_page) + '/'
            request1 = response.follow(next_page, self.huoyuan_list)
            request1.meta['type_id'] = response.meta['type_id']
            request1.meta['info_link'] = response.meta['info_link']
            yield request1

    def huoyuan_detail(self, response):
        main_img = response.css('.thumbpic img').xpath('@src').extract_first()
        title = response.css('.h1_t::text').extract_first()
        weixin_num = response.css('.table_1 tr:nth-child(2) td b::text').extract_first()
        weixin_qrcode = response.css('.erweimaw img').xpath('@src').extract_first()
        qq_num = response.css('.table_1 tr:nth-child(3) td b::text').extract_first()
        tel_num = response.css('.table_1 tr:nth-child(4) .startPrice::text').extract_first()
        popularity = response.css('.table_1 tr:nth-child(6) .startPrice::text').extract_first()
        arr = popularity.split('人'.decode("utf-8"))
        popularity = arr[0]
        introduction = response.css('.qinwen_info_td .pic1').extract_first()
        describe = response.css('#Gallery').extract_first()
        print 'fdsagdsa3333333333333333333333333333'
        print describe
        imgs = response.css('#Gallery img').xpath('@src').extract()

        img = 'D:/code/crawler/crawler/images/img/'  
        rich_text_img = 'D:/code/crawler/crawler/images/rich_text_img/'  
        s=requests.session()
        headers={
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.9',
        'Cache-Control':'max-age=0',
        'Connection':'keep-alive',
        'Host':'www.huoyuanwang.cn',
        'If-Modified-Since':'Fri, 21 Dec 2018 03:58:29 GMT',
        'If-None-Match':'"cf51d66ee198d41:0"',
        'Upgrade-Insecure-Requests':'1',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.15 Safari/537.36',
        }
        s.headers.update(headers)
        # 下载微信二维码
        html = s.get(url=weixin_qrcode)
        arr = weixin_qrcode.split('/')
        file_name = arr[- 1]               
        open(img + file_name,"w+").close()
        with open(img + file_name, 'wb') as file:
            file.write(html.content)
        weixin_qrcode = '/statics/images/img/'+ file_name

        # 下载主图
        html = s.get(url=main_img)
        arr = main_img.split('/')
        file_name = arr[- 1]               
        open(img + file_name,"w+").close()
        with open(img + file_name, 'wb') as file:
            file.write(html.content)
        main_img = '/statics/images/img/'+ file_name

        # 下载介绍图片
        for index, item in enumerate(imgs):
            try:
                if os.path.exists(rich_text_img) == False:  # 判断文件夹是否已经存在
                    os.makedirs(rich_text_img)  # 创建文件夹
                print item, index                            
                html = s.get(url=item)
                arr = item.split('/')
                file_name = arr[- 1]               
                open(rich_text_img + file_name, "w+").close()
                with open(rich_text_img + file_name, 'wb') as file:
                    file.write(html.content)
                describe = describe.replace(item, '/statics/images/rich_text_img/' + file_name)
            except Exception as e:
                print("33333333333333333:"+str(e))
        yield {
            'title': title,
            'main_img': main_img,
            'weixin_num': weixin_num,
            'weixin_qrcode': weixin_qrcode,
            'qq_num': qq_num,
            'tel_num': tel_num,
            'popularity': popularity,
            'introduction': introduction,
            'describe': describe,
            'type_id': response.meta['type_id']
        }
