import React, { Component } from 'react'
import {
  Form, Input, Upload, Select, Button, Icon, message, Spin, Modal
} from 'antd'
import addWeixinInfo from '@/api/mutations/addWeixinInfo'
import getSingleWeixinInfo from '@/api/queries/getSingleWeixinInfo'
import updateWeixinInfo from '@/api/mutations/updateWeixinInfo'
import { pay } from '@/api/common.js'
import { baseURL } from '@/configs/config'
import { getToken } from '@/utils/auth'
import './Add.less'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
class AddWechatFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      weixin_qrcode: '',
      weixin_id: 0,
      id: 0,
      status: 0
    }
  }
  // 图片上传
  imgUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        weixin_qrcode: info.file.response.img_url,
        loading: false,
      })
    }
  }
  async getSingleWeixinInfo (id) {
    try {
      let res = await getSingleWeixinInfo(id)
      let resData = res.data.data.getSingleWeixinInfo
      if (resData.code === 0) {
        this.props.form.setFieldsValue({
          title: resData.data.title,
          type_id: resData.data.type_id,
          introduction: resData.data.introduction,
          weixin_qrcode: resData.data.weixin_qrcode,
          weixin_num: resData.data.weixin_num
        })
        this.setState({
          weixin_qrcode: resData.data.weixin_qrcode,
          status: Number(resData.data.status)
        })
      }
    } catch (error) {
      message.error('获取微信货源失败', 3)
    }
  }
  // 立即发布
  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        message.error('请输入正确的信息', 3)
        this.setState({ loading: false })
        return
      }
      let params = JSON.parse(JSON.stringify(values))
      params.weixin_qrcode = this.state.weixin_qrcode
      let res, resData
      if(this.state.id > 0){
        params['id'] = this.state.id
        res = await updateWeixinInfo(params)
        resData = res.data.data.updateWeixinInfo
      } else {
        res = await addWeixinInfo(params)
        resData = res.data.data.addHuoyuanInfo
      }
      if (resData.code === 0) {
        this.setState({
          weixin_id: resData.data
        })
        if(this.state.status === 0){
          this.payConfirm()
        } else {
          message.success('修改成功', 3)
          this.props.history.push('/wechat/list')
        }  
      } else {
        message.error('修改失败, 请稍后重试', 3)
      }
      this.setState({ loading: false })
    })
  }
  payConfirm = () => {
    Modal.confirm({
      title: `您需要支付10元，才能发布成功的哟`,
      okText: `确认`,
      cancelText: `取消`,
      onOk: async() => {
        let data = {
          weixin_id: this.state.weixin_id,
          money: 10
        }
        let res = await pay(data)
        if (res.data.code === 0) {
          message.success('发布成功', 3)
        } else {
          message.error(res.data.message, 3)          
        }
        this.props.history.push('/wechat/list')
      },
      onCancel: () => {
        // 取消支付
        this.props.history.push('/wechat/list')
      },
    })
  }
  componentDidMount () {
    try {
      if(this.props.match.params.id > 0){
        this.setState({
          id: Number(this.props.match.params.id)
        })
        this.getSingleWeixinInfo(this.props.match.params.id)
      }
    } catch (error) {
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
    };
    const reactQuillLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const props = {
      name: 'single_img',
      action: `${baseURL}/api/image/upload/single_img`,
      showUploadList: false,
      listType: "picture-card",
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
      headers: {
        'hyw-from': 'member',
        'Authorization': `Bearer ${getToken()}`
      }
    }
    return (
      <div id="AddWechat">
        <Spin spinning={this.state.loading}>
          <h1 className="g-title">{this.state.id === 0 ? '发布微信' : '编辑微信'}</h1>
          <div className="form">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                  {...formItemLayout}
                  label="标题"
                  hasFeedback
                >
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入货源标题' }]
                  })(
                    <Input placeholder="请输入货源标题" />
                  )}  
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="微信号"
                  hasFeedback
                >
                  {getFieldDecorator('weixin_num', {
                    rules: [{ required: true, message: '请输入微信号' }]
                  })(
                    <Input placeholder="请输入微信号" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="微信类型"
                >
                  {getFieldDecorator('type_id', {
                    rules: [{ required: true, message: '请选择货源类型' }]
                  })(
                    <Select placeholder="请选择微信类型">
                      <Option value={1} key={1}>个人微信号</Option>
                      <Option value={2} key={2}>微信公众号</Option>
                      <Option value={3} key={3}>微信群号</Option>     
                    </Select>
                  )}
                </FormItem>         

              <FormItem
                {...formItemLayout}
                label="微信二维码"
              >
                {getFieldDecorator('weixin_qrcode', {
                  rules: [{ required: true, message: '请上传微信二维码' }]
                })(
                  <Upload {...props} onChange={this.imgUploadChange.bind(this)}>
                  {this.state.weixin_qrcode ? <img src={this.state.weixin_qrcode} alt="avatar" /> : uploadButton}
                  </Upload>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="二维码简介"
                hasFeedback
              >
                {getFieldDecorator('introduction', {
                  rules: [{ required: true, message: '请输入微信二维码简介' }]
                })(
                  <TextArea placeholder="请输入微信二维码简介" autosize={{ minRows: 6 }}></TextArea>
                )} 
              </FormItem>                      

              <FormItem className="submit-button-item">
                <Button size="large" type="primary" htmlType="submit">立即发布</Button>
              </FormItem>
            </Form>
          </div>
        </Spin>
      </div>
    )
  }
}

const AddWechat = Form.create()(AddWechatFrom)
export default AddWechat
