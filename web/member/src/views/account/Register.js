import React, { Component } from 'react'
import './Register.less'
import { Form, Input, Button, Radio, Select, message, Spin } from 'antd'
import getSafeQuestionList from '@/api/queries/getSafeQuestionList'
import { register } from '@/api/common.js'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
class RegisterFrom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    questionList: [],
    loading: false
  }
  initSafeQuestion = (async() => {
    try {
      let res = await getSafeQuestionList()
      let resData = res.data.data.getSafeQuestionList
      if (resData.code === 0) {
        this.setState({
          questionList: resData.data
        })
      } else {
        message.error('获取问题列表失败', 5 * 1000)
      }
    } catch (error) {
      console.log('getSafeQuestionList error', error)
    }
  })
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
  // 检验昵称
  validName = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入昵称'))
    }
    let length = value.length
    if (length > 2 && length < 8) {
      return callback()
    } else {
      return callback(new Error('昵称长度需为2-8位'))
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
  // 校验重新输入密码
  validNextPassword = ((rule, value, callback) => {
    const form = this.props.form
    const initPassword = form.getFieldValue('password')
    if (initPassword !== value) {
      return callback('两次输入的密码不一致')
    }
    return callback()
  })
  // 有值才验证手机号
  validTelephone = ((rule, value, callback) => {
    if (!value) {
      return callback()
    }
    let length = value.length
    if (isNaN(value)) {
      return callback(new Error('手机号必须为数字'))
    } else if (length < 11) {
      return callback(new Error('手机号不能小于11位'))
    } else if (length > 11) {
      return callback(new Error('手机号不能大于11位'))
    }
    return callback()
  })
  // 立即注册
  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        message.error('请输入正确的信息', 3)
        this.setState({ loading: false })
        return
      }
      let res = await register(values)
      if (res.data.code === 0) {
        message.success('注册成功', 3)
        this.props.history.push('/login')
      } else {
        this.setState({ loading: true })
        message.error('注册失败, 请稍后重试', 3)
      }
    })
  }
  componentWillMount () {
    this.initSafeQuestion()
  }
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
      <div id="register">
        <Spin spinning={this.state.loading}>
          <div id="head">
            <img src={require('@/images/logo.png')} alt="logo" className="logo"/></div>
          <div id="body">
            <div id="form">
              <div className="form-head">
                会员注册
              </div>
              <div className="form-body">
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                    help="请输入6-16位用户名, 由字母和数字组成"
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
                    label="昵称"
                    help="请输入2-8位任意字符"
                    hasFeedback
                  >
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: '请输入昵称' },
                      { checkTrigger: 'blur', validator: this.validName}
                    ]
                  })(
                    <Input placeholder="请输入昵称" />
                  )}              
                  </FormItem>   
                  <FormItem
                    {...formItemLayout}
                    label="性别"         
                  >
                  {getFieldDecorator('sex', {
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择性别' }]
                  })(
                    <RadioGroup>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                      <Radio value="0">保密</Radio>
                    </RadioGroup>
                  )}
                  </FormItem>      
                  <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                    help="请输入6-16位密码, 需包含数字、字母、字符以上两种"
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
                  <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                  >
                  {getFieldDecorator('comfir_password', {               
                    rules: [
                      { required: true, message: '请再次输入密码' },
                      { checkTrigger: 'blur', validator: this.validNextPassword }
                    ]
                  })(
                    <Input placeholder="请再次输入密码" type="password"/>
                  )}  
                  </FormItem>                  
                  <FormItem
                    {...formItemLayout}
                    label="手机号"
                    hasFeedback
                  >
                  {getFieldDecorator('telephone', {
                    rules: [{ checkTrigger: 'blur', validator: this.validTelephone }]
                  })(
                    <Input placeholder="请输入手机号"/>
                  )}                 
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="安全问题"   
                    help="用于校验修改密码等操作，不可修改"              
                  >
                  {getFieldDecorator('safe_question_id', {
                    rules: [{ required: true, message: '请选择安全问题' }]
                  })(
                    <Select placeholder="请选择安全问题">
                    {
                      this.state.questionList.map((content,index) =>{
                        return (
                          <Option value={content.id} key={index}>{content.question}</Option>              
                        )})
                    }
                    </Select>
                  )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="答案"
                    hasFeedback
                  >
                  {getFieldDecorator('safe_answer', {
                    rules: [{ required: true, message: '请输入安全问题答案' }]
                  })(
                    <Input placeholder="请输入安全问题答案" />
                  )}          
                  </FormItem>
                  <FormItem>
                    <Button className="submit-button"  type="primary" htmlType="submit">立即注册</Button>
                  </FormItem>
                </Form>             
              </div>
              <div className="form-foot">
              已有账号, 直接
              <span className="login-text" onClick={() => {
                this.props.history.push('/login')
              }}>登录</span>
              </div>
            </div>
          </div>
          <div id="foot"></div>
        </Spin>
      </div>
    );
  }
}
const Regist = Form.create()(RegisterFrom)
export default Regist
