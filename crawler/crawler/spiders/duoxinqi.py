# -*- coding: utf-8 -*-
import scrapy


class DuoXinQiSpider(scrapy.Spider):
    name = 'duoxinqi'
    # allowed_domains = ['https://app.xmhrss.gov.cn/']
    start_urls = ['http://www.duoxinqi.com/home']

    def parse(self, response):
        posts_s =  response.css('#posts .posts.posts-3 .post')
        for post_s in posts_s:
            title = post_s.css(".cover a::attr(title)").extract_first()
            abstract = post_s.css("p::text").extract_first()
            url = response.url
            yield {
                'title': title,
                'abstract': abstract,
                'url': url
            }

        next_page = response.css('#wp_page_numbers ul li:last-child a::attr(href)').extract_first()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
