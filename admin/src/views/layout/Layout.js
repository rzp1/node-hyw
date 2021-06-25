import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Switch } from 'react-router-dom'
import router from '@/configs/router.config'
import { Link } from 'react-router-dom'
import './Layout.less'

const { Header, Sider, Content } = Layout

class App extends Component {
  state = {}

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
        >
          <div className="logo-box"></div>
          <img className="logo" src={require('@/images/logo.png')} alt=""/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" className="subMenu">
              <Link to="/memberList">
                <Icon type="team" />
                <span>会员列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" className="subMenu">
              <Link to="/articleList">
                <Icon type="file-text" />
                <span>文章列表</span>
              </Link> 
            </Menu.Item>
            <Menu.Item key="3" className="subMenu">
              <Link to="/huoyuanList">
                <Icon type="shopping-cart" />
                <span>货源列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" className="subMenu">
              <Link to="/payRecord">
                <Icon type="pay-circle" />
                <span>充值明细</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5" className="subMenu">
              <Link to="/trashList">
                <Icon type="delete" />
                <span>回收站</span>
              </Link> 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}></Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
          <Switch>
          {
            router.map(item => {
              return <Route path={item.path} exact component={item.component} key={item.path}></Route>
            })
          }
        </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
