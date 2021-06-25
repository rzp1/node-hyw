import React, {
  Component
} from 'react'
import { Form, Input, Button, message, Spin } from 'antd';
import { login } from '@/api/common.js'
import './Login.less'
import fetch from '@/utils/fetch'
import { setToken } from '@/utils/auth'
const FormItem = Form.Item
class LoginFrom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    loading: false
  }
  // 检验用户名
  validAccount = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入用户名'))
    }
    let length = value.length
    if (length > 5 && length < 16) {
      let regsting = /^(?!\d+$)[\da-zA-Z]+$/
      let reg = new RegExp(regsting)
      if (reg.test(value)) {
        return callback()
      } else {
        return callback(new Error('用户名必须包含字母，或数字'))
      }
    } else {
      return callback(new Error('用户名长度需为6-16位'))
    }
  }
   // 校验密码
   validPassword = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入密码'))
    }
    let length = value.length
    if (length > 5 && length < 16) {
      let regsting = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
      let reg = new RegExp(regsting)
      if (reg.test(value)) {
        return callback()
      } else {
        return callback(new Error('密码需包含数字、字母、字符以上两种'))
      }
    } else {
      return callback(new Error('密码长度需为6-16位'))
    }
  }
  // 立即登录
  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        console.log('validateFields error ', values)
        message.error('请输入正确的信息', 3)
        this.setState({ loading: false })
        return
      }
      try {
        let res = await login(values)
        if (res.data.code === 0) {
          message.success('登录成功', 3)
          setToken(res.data.token)
          fetch.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
          this.props.history.push('/home')
        } else {
          this.setState({ loading: false })
          message.error('登录失败', 3)
        } 
      } catch (error) {
        console.log('login error', error)
        message.error('登录失败', 3)
      }       
    })
  }
  componentWillMount () {}
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    }
    return (
      <div id="login">
        <Spin spinning={this.state.loading}>
          <div id="head">
            <img src={require('@/images/logo.png')} alt="logo" className="logo"/>
          </div>
          <div id="body">
            <div id="form">
              <div className="form-head">
                会员登录
              </div>
              <div className="form-body">
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                  >
                  {getFieldDecorator('account', {
                    rules: [
                      { required: true, message: '请输入用户名' },
                      { trigger: 'blur', validator: this.validAccount}
                    ]
                  })(
                    <Input placeholder="请输入用户名" id="error" />
                  )}                 
                  </FormItem>            
                  <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback           
                  >
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '请输入密码' },
                      { checkTrigger: 'blur', validator: this.validPassword }
                  ]
                  })(
                    <Input placeholder="请输入密码" type="password"/>
                  )}                
                  </FormItem>
                  <FormItem>
                    <Button className="submit-button"  type="primary" htmlType="submit">立即登录</Button>
                  </FormItem>
                </Form>             
              </div>
              <div className="form-foot">
              还未注册账号, 去
              <span className="login-text" onClick={() => {
                this.props.history.push('/register')
              }}>注册</span>
              </div>
            </div>
          </div>
          <div id="foot"></div>
        </Spin>
      </div>
    );
  }
}
const Login = Form.create()(LoginFrom)
export default Login
