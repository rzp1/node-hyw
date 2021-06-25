import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'
import './Header.less'
import { removeToken } from '@/utils/auth'
import { withRouter } from 'react-router'
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this.props)
  }
  redirectUrl = () => {
    removeToken()
    this.props.history.push('/login')
  }
  render() {
    return (
      <div id="Header">
        <div className="left">
          <Link to={`/home`} className="layout-btn">
            <img src={require('@/images/logo.png')} alt="logo" className="logo"/>
          </Link>         
        </div>
        <div className="right">
          <Link to={`/service_center/msg`} className="layout-btn">
            <img src={require('@/images/home.png')} alt="图片错误" className="layout-img"/>
            首页
          </Link>
          <div onClick={this.redirectUrl} className="layout-btn">         
            <img src={require('@/images/layout.png')} alt="图片错误" className="layout-img"/>
            退出
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
