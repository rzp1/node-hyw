import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, message } from 'antd'
import './MenuList.less'
import { getToken } from '@/utils/auth'
import { Redirect } from 'react-router'

const SubMenu = Menu.SubMenu;

class MenuList extends Component {
  constructor(props) {
    super(props)
  }
  state = {}
  render() {
    const token = getToken()
    if (!token) {
      message.error('token无效，请重新登录', 3)
      return (<Redirect to="/login" />)
    }
    return (
      <div style={{ width: 256 }}>
        <Menu defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          className="menu-ul"
        >
          <SubMenu key="1" title={<span><Icon type="edit" /><span>发布货源</span></span>} className="subMenu">
            <Menu.Item key="1-1">
              <Link to="/market/add/0">
                我要发布货源
              </Link>
            </Menu.Item>
            <Menu.Item key="1-2">
              <Link to="/market/list">
                已发布货源列表
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="2" title={<span><Icon type="wechat" /><span>发布微信</span></span>} className="subMenu">
            <Menu.Item key="2-1">
              <Link to="/wechat/add/0">
                我要发布微信
              </Link>
            </Menu.Item>
            <Menu.Item key="2-2">
              <Link to="/wechat/list">
                已发布微信列表
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3-1">
            <Link to="/financial_manage/top_up">
            <Icon type="pay-circle" />在线充值
            </Link>
          </Menu.Item>
          <Menu.Item key="4-1">
            <Link to="/account_manage/edit">
              <Icon type="user" />
              个人中心
            </Link>
          </Menu.Item>
          <Menu.Item key="5-1">
            <Link to="/service_center/user_manual">
              <Icon type="snippets" />使用手册
            </Link>
          </Menu.Item>
          <Menu.Item key="6-1">
            <Link to="/service_center/msg">
              <Icon type="customer-service" />系统消息
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default MenuList;
