# -*- coding: utf-8 -*-
import scrapy


class ZxdywSpider(scrapy.Spider):
    name = 'zxdyw'
    # allowed_domains = ['bj.zxdyw.com/zsgs/']
    start_urls = [
        'http://www.zxdyw.com/csfz/',
    ]

    def parse(self, response):
        provinces_s = response.css('#cl1 dl')
        for province_s in provinces_s:
            province = province_s.css('span strong::text').extract_first()
            cities_s = province_s.css('dd')
            for city_s in cities_s:
                city = city_s.css('::text').extract_first()
                if city == '更多':
                    continue
                else:
                    next_page = city_s.css('a::attr(href)').extract_first()
                    if next_page is not None:
                        next_page += '/zsgs/'
                        request = response.follow(next_page, callback=self.enterprise_parse)
                        request.meta['province'] = province
                        request.meta['city'] = city
                        yield request


    def enterprise_parse(self, response):
        next_page = response.css('.paginator a:nth-last-child(2)::attr(href)').extract_first()

        # 每个企业的详情页
        enterprise_list_s = response.css('.list_main.Bmar10 .m_main.fl.rim_gray ul li')
        for href in enterprise_list_s:
            detail_page = href.css('.l_butt.fr .txt_a::attr(href)').extract_first()
            if detail_page is not None:
                request = response.follow(detail_page, callback=self.detail_page_parse)
                request.meta['province'] = response.meta['province']
                request.meta['city'] = response.meta['city']
                yield request

        if next_page is not None:
            next_page = response.urljoin(next_page)
            request = response.follow(next_page, callback=self.enterprise_parse)
            request.meta['province'] = response.meta['province']
            request.meta['city'] = response.meta['city']
            yield request


    def detail_page_parse(self, response):
        msg_s = response.css('.s_bor.s_major.clear.mar_b10')

        if len(msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')) == 0:
            phone = ''
            name = ''
        elif len(msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')) == 1:
            phone = msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')[0]
            name = msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')[0]
        else:
            phone = msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')[0]
            name = msg_s.css('.new_sdcs.clear_bor .s_tel.s_bor::text').extract_first().split(' ')[1]
    
        yield {
            'enterprise_name': msg_s.css('.coy_x .s_tit a::attr(title)').extract_first(),
            'enterprise_nick': msg_s.css('.coy_x .s_tit a::text').extract_first(),
            'phone': phone,
            'name': name,
            'addr': msg_s.css('.s_add span::text').extract_first(),
            'website': msg_s.css('.s_url a::text').extract_first(),
            'taobao_level': msg_s.css('.dj_zs.clear a::text').extract_first(),
            'province': response.meta['province'],
            'city': response.meta['city']
        }
