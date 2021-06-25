# -*- coding: utf-8 -*-
import scrapy


class XmhrssTestSpider(scrapy.Spider):
    name = 'xmhrssTest'
    # allowed_domains = ['https://app.xmhrss.gov.cn/']
    start_urls = ['https://app.xmhrss.gov.cn/zxzx.xhtml?pageNo=1']

    def parse(self, response):
        tables_s = response.css('table table:not(:first-child)')
        for table_s in tables_s:
            commit_time = table_s.css('tr:first-child  td:nth-child(2)::text').extract_first().strip()
            name = table_s.css('tr:first-child  td:nth-child(4)::text').extract_first().strip()
            consult_type = table_s.css('tr:first-child  td:nth-child(6)::text').extract_first().strip()
            source = table_s.css('tr:first-child  td:nth-child(8)::text').extract_first().strip()
            business_type = table_s.css('tr:first-child  td:nth-child(10)::text').extract_first().strip()
            message = table_s.css('tr:nth-child(2) td:last-child p::text').extract_first().strip()
            reply_t = table_s.css('tr:nth-child(3) td:last-child::text').extract_first().strip()
            reply = table_s.css('tr:last-child td:last-child p::text').extract_first().strip()

            yield {
                'commit_time': commit_time,
                'name': name,
                'consult_type': consult_type,
                'source': source,
                'business_type': business_type,
                'message': message,
                'reply_t': reply_t,
                'reply': reply
            }

        for next_page in range(2, 20353):
            next_page = response.url.split('=')[0] + '=' + str(next_page)
            yield response.follow(next_page, self.parse)
