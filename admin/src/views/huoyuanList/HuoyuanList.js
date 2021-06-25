import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
import './HuoyuanList.less'
import HuoyuanInfoList from '@/components/huoyuanInfoList/HuoyuanInfoList'
import WechatInfoList from '@/components/wechatInfoList/WechatInfoList'

const TabPane = Tabs.TabPane

class HuoyuanList extends Component {
  state = {
    currentType: 'huoyuan',
    member_id: 0
  }
  render() {
    return (
      <div id="HuoyuanList">
        <div></div>
        <Tabs defaultActiveKey="currentType">
          <TabPane tab={<span><Icon type="taobao" />商品货源</span>} key="currentType">
            <HuoyuanInfoList memeber_id={this.state.member_id} />
          </TabPane>
          <TabPane tab={<span><Icon type="wechat" />微信大全</span>} key="wechat">
            <WechatInfoList memeber_id={this.state.member_id} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default HuoyuanList
