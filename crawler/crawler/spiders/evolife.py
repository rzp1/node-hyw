# -*- coding: utf-8 -*-
import scrapy


class EvolifeSpider(scrapy.Spider):
    name = 'evolife'
    start_urls = ['http://go.evolife.cn/category/household_appliances_114_1.html']

    def parse(self, response):
        posts_s =  response.css('.zuijingengxin_box')
        for post_s in posts_s:
            title = post_s.css('h2 a::text').extract_first().strip()
            abstract = post_s.css('.infodetail::text').extract_first().strip()
            url = response.url
            yield {
                'title': title,
                'abstract': abstract,
                'url': url
            }

        for next_page in range(2, 168):
            next_page = 'http://go.evolife.cn/category/household_appliances_114_' + str(next_page) + '.html'
            yield response.follow(next_page, self.parse)
