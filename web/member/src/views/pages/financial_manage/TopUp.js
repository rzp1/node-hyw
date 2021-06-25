import React, {
  Component
} from 'react'
import './TopUp.less'
class TopUp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="pay">
        <div className="pay-months">
          <img src={require('@/images/wechat_pay.jpg')} alt=""/>
          <img src={require('@/images/ali_pay.png')} alt=""/>
        </div>
        <div className="connect-months">
          <p className="title">支付完成请联系客服:</p>
          <p className="anwser">电话：15396222371，15392263272</p>
          <p className="anwser">微信：Pyw0310，szgb_7777777jy</p>
          <p className="anwser">QQ：97401442，442971502 </p>
        </div>
      </div>
    )
  }
}

export default TopUp
