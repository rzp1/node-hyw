# -*- coding: utf-8 -*-
import scrapy


class Ofweek7300Spider(scrapy.Spider):
    name = 'ofweek7300'
    start_urls = ['http://www.ofweek.com/CATListNew-73000-0.html']

    def parse(self, response):
        posts_s = response.css('.list-left .con-details')
        for post_s in posts_s:
            title = post_s.css('.tuwen h3 a::text').extract_first()
            abstract = post_s.css('.tuwen p span::text').extract_first().strip()
            url = response.url
            # abstract = ' '.join(post_s.css('.list_left4r1::text').extract()).strip()
            # if title is not None:
            #     print('p is not null')
            # else :
            #     title = post_s.css('.r_c a::text').extract_first()
            # detail_page = post_s.css('header a').xpath('@href').extract_first()        
    #         if detail_page is not None:
    #             request = response.follow(detail_page, self.detail_page_parse)
    #             request.meta['url'] = url
    #             yield request

    # def detail_page_parse(self, response):
    #     url = response.meta['url']
    #     title = response.css('.text a h4::text').extract_first()
    #     abstract = ' '.join(response.css('#content p::text').extract()).strip()
            yield {
                'title': title,
                'abstract': abstract,
                'url': url
            }

        for next_page in range(2, 2871):
            next_page = 'http://www.ofweek.com/CATListNew-73000-0-' + str(next_page) + '.html'
            yield response.follow(next_page, self.parse)
