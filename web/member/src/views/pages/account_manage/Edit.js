import React, { Component } from 'react';
import './Edit.less'
import { Form, Input, Button, Radio, Select, message, Spin, Upload } from 'antd'
import getSafeQuestionList from '@/api/queries/getSafeQuestionList'
import getSingleMember from '@/api/queries/getSingleMember'
import updateMember from '@/api/mutations/updateMember'
import { getToken } from '@/utils/auth'
const { baseURL }  = require('@/configs/config')

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
class EditMemberFrom extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    questionList: [],
    loading: false,
    avatar_url: require('@/images/defalut_avatar.png'),
    img_url: ''
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
    if (value) {
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
    return callback()
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
  // 确认修改
  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (values.password) {
        if (!values.oldPassword) {
          message.error('请输入原始密码', 3)
          return
        }
        if (!values.comfir_password) {
          message.error('请确认新密码', 3)
          return
        }
        if (!values.safe_question_id || !values.safe_answer) {
          message.error('请输入完整的校验信息', 3)
          return
        }
      }
      if (err) {
        message.error('请输入正确的信息', 3)
        this.setState({ loading: false })
        return
      }
      if (this.state.img_url) {
        Object.assign(values, {
          avatar_url: this.state.img_url
        })
      }
      try {
        let res = await updateMember(values)
        let resData = res.data.data.updateMember
        if (resData.code === 0) {
          message.success('修改成功', 3)
        } else {
          message.error(resData.message, 3)
        }
        this.setState({ loading: false })
      } catch (error) {
        this.setState({ loading: false })
        message.error('修改失败', 3)
      } 
    })
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
  getSingleMember = async () => {
    try {
      let res = await getSingleMember()
      let resData = res.data.data.getSingleMember
      if (resData.code === 0) {
        if (resData.data.avatar_url) {
          this.setState({
            avatar_url: resData.data.avatar_url
          })
        }
        this.props.form.setFieldsValue({
          account: resData.data.account,
          name: resData.data.name,
          telephone: resData.data.telephone,
          sex: String(resData.data.sex)
        })
      } else {
        message.error('获取会员信息失败', 3)
      }
    } catch (error) {
      console.log('getSingleMember error', error)
    } 
  }
  componentWillMount () {
    this.initSafeQuestion()
    this.getSingleMember()
  }
  beforeUpload = ((file) => {
    const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
    if (!isJPG) {
      message.error('必须为jpeg/png图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片必须小于2M')
    }
    return isJPG && isLt2M
  })
  handleChange = ((info) => {
    if (info.file.status === 'done') {
      let res = info.file.response
      if (res.code === 0) {
        this.setState({
          avatar_url: res.img_url,
          img_url: res.img_url
        })
        message.success(res.message, 3)
      } else {
        message.error(res.message, 3)
      }
    }
  })
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 }
      },
      wrapperCol: {
        sm: { span: 8 }
      },
    }
    const props = {
      name: 'single_img',
      action: `${baseURL}/api/image/upload/single_img`,
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
      headers: {
        'hyw-from': 'member',
        'Authorization': `Bearer ${getToken()}`
      }
    }
    return (
      <div id="edit-memberinfo">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit} className="form">
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
            help="请输入6-16位, 由字母和数字组成"
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
            label="头像"         
            >
            {getFieldDecorator('avatar_url', {
              rules: []
            })(
              <Upload {...props}>
                <img src={this.state.avatar_url} alt='' className="avatar"/>
              </Upload>        
            )}
          </FormItem>
          <FormItem
          {...formItemLayout}
          label="原密码"
          hasFeedback
        >
        {getFieldDecorator('oldPassword', {
          rules: [
            { checkTrigger: 'blur', validator: this.validPassword }
        ]
        })(
          <Input placeholder="请输入原密码" type="password"/>
        )}                
        </FormItem>     
          <FormItem
            {...formItemLayout}
            label="新密码"
            hasFeedback
            help="请输入6-16位, 需包含数字、字母、字符以上两种"
          >
          {getFieldDecorator('password', {
            rules: [
              { checkTrigger: 'blur', validator: this.validPassword }
          ]
          })(
            <Input placeholder="请输入新密码" type="password"/>
          )}                
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
          {getFieldDecorator('comfir_password', {               
            rules: [
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
            help="修改密码时，请校验安全问题"               
          >
          {getFieldDecorator('safe_question_id', {
            rules: []
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
            rules: []
          })(
            <Input placeholder="请输入安全问题答案" />
          )}          
          </FormItem>
          <FormItem>
            <Button className="submit-button"  type="primary" htmlType="submit">确认修改</Button>
          </FormItem>
        </Form>
        </Spin>
      </div>
    )
  }
}
const EditMyData = Form.create()(EditMemberFrom)
export default EditMyData;
