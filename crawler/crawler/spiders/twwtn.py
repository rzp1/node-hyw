# -*- coding: utf-8 -*-
import scrapy


class TwwtnSpider(scrapy.Spider):
    name = 'twwtn'
    start_urls = ['http://www.twwtn.com/newsList_COLUMNS_ZH_KJCY_CYCP_.htm']

    def parse(self, response):
        news_s =  response.css('.news_li li')
        for news in news_s:
            title = news.css('a::text').extract_first()
            abstract = news.css('.news_dis::text').extract_first().strip()
            url = response.url
            yield {
                'title': title,
                'abstract': abstract,
                'url': url
            }

        next_page = response.css('#wp_page_numbers ul li:last-child a::attr(href)').extract_first()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
