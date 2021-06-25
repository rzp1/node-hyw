import React, { Component } from 'react'
import { message } from 'antd'
import getSingleMember from '@/api/queries/getSingleMember'
import './Home.less'
class Home extends Component {
  constructor(props) {
    super(props)
    console.log(this)
  }
  state = {
    memberInfo: {}
  }
  getSingleMember = async () => {
    try {
      let res = await getSingleMember()
      let resData = res.data.data.getSingleMember
      if (resData.code === 0) {
        if (!resData.data.avatar_url) {
          resData.data.avatar_url = require('@/images/defalut_avatar.png')
        }
        this.setState({
          memberInfo: resData.data
        })
      } else {
        message.error('获取会员信息失败', 3)
      }
    } catch (error) {
      console.log('getSingleMember error', error)
    } 
  }
  componentWillMount () {
    this.getSingleMember()
  }
  render() {
    return (
      <div id="home">
        <div id="head">
          <img src={this.state.memberInfo.avatar_url} alt='' className="left"/>
          <div className="right">
            <p className="info-name">{this.state.memberInfo.name}</p>
            <p>
            <span className="info-item">
            您的目前的排名是：<span className="item-value">{this.state.memberInfo.rank}</span>
            </span>            
            <span className="info-item">
            账号余额：<span className="item-value">{this.state.memberInfo.money}</span>  
            </span>         
            </p>
          </div>
        </div>
        <div id="middle">
          <p className="title">发布货源须知：</p>
          <p className="question">一、如何发布货源？ </p>
          <p className="anwser">点击我要发布货源，选择对应货源栏目，按照表框填写对应的信息，然后提交发布即可。</p>
          <p className="question">二、如何收费？</p>
          <p className="anwser">为了防止恶意发布货源，发布一个货源需要支付10金币，1金币=1元，请先充值金币，再发布货源。新注册用户赠送10个金币，可以免费发布一次货源。</p>
          <p className="question">三、如何充值？</p>
          <p className="anwser">点击在线充值，通过支付宝或微信支付，支付完成凭支付截图联系客服。</p>
          <p className="question">四、联系我们</p>
          <p className="anwser">电话：15396222371，15392263272</p>
          <p className="anwser">微信：Pyw0310，szgb_7777777jy</p>
          <p className="anwser">QQ：97401442，442971502 </p>
        </div>
        {/*<Button type="primary" onClick={() => {
          this.props.history.push('/market/add')
        }}>我去添加商品</Button>
        <h1>我是首页</h1>
        <ReactQuill value={this.state.text}
          onChange={this.handleChange} modules={{
            toolbar: [[{ font: [] }, { size: [] }],
            [{ align: [] }, 'direction'],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean']]
          }} /> */}
      </div>
    );
  }
}

export default Home;
