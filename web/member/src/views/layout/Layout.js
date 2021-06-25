import React, {
  Component
} from 'react';
import { Route, Redirect, Switch, message } from 'react-router-dom'
import { getToken } from '@/utils/auth'

import Header from '@/views/layout/Header'
import MenuList from '@/views/layout/MenuList'
import router from '@/configs/router.config'

import './Layout.less'

class Layout extends Component {
  render() {
    const token = getToken()
    return (
      <div id="app">
        <Header></Header>
        <div className="layout">
          <MenuList></MenuList>
          <div className="app-main">
            <Switch>
              {/* 只渲染命中的第一个Route */}
              {/* <Route path="/home" exact component={Home} />
              <Route path="/market/add" exact component={AddMarket}></Route>
              <Route path="/market/list" exact component={MarketList}></Route>
              <Route path="/wechat/add" exact component={AddWechat}></Route>
              <Route path="/wechat/list" exact component={WechatList}></Route>
              <Route path="/financial_manage/top_up" exact component={TopUp}></Route>
              <Route path="/account_manage/edit" exact component={EditMyData}></Route>
              <Route path="/service_center/feedback" exact component={Feedback}></Route>
              <Route path="/service_center/msg" exact component={SeviceMsg}></Route> */}
              {
                router.map(item => {
                  return <Route path={item.path} exact component={item.component} key={item.path}></Route>
                })
              }
              {
                token ? <Redirect to="/home"></Redirect> : <Redirect to="/login"></Redirect>
              }
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
export default Layout;
