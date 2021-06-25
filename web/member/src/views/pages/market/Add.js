import React, {
  Component
} from 'react'
import {
  Form, Input, Upload, Select, Button, Icon, message, Spin, Modal
} from 'antd'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { uploadRichTextImg } from '@/api/common'
import addHuoyuanInfo from '@/api/mutations/addHuoyuanInfo'
import updateHuoyuanInfo from '@/api/mutations/updateHuoyuanInfo'
import getHuoyuanTypeList from '@/api/queries/getHuoyuanTypeList'
import getSingleHuoyuanInfo from '@/api/queries/getSingleHuoyuanInfo'
import { pay } from '@/api/common.js'
import { baseURL } from '@/configs/config'
import { getToken } from '@/utils/auth'
import './Add.less'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
const replaceToEscaping = (str = '') => {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
}
class AddMarketFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      loading: false,
      huoyuanType: [],
      describe: '',
      main_img: '',
      weixin_qrcode: '',
      status: 0
    }
  }
  initHuoyuanType = (async() => {
    try {
      let res = await getHuoyuanTypeList()
      let resData = res.data.data.getHuoyuanTypeList
      if (resData.code === 0) {
        this.setState({
          huoyuanType: resData.data
        })
      } else {
        message.error('获取类型列表失败', 5 * 1000)
      }
    } catch (error) {
      console.log('getHuoyuanTypeList error', error)
    }
  })
  // 富文本的改变
  async handleChange(value,delta,user,action) {
    let ImgReg = /<img src=\"data([^\"]*?)\">/gi;
    let imgData = value.match(ImgReg)
    if (imgData) {   
      imgData = imgData[0]
      imgData = imgData.split('>')[0]
      imgData = imgData.split('<img src=')[1]
      imgData = imgData.replace(/^\"|\"$/g,'')
      let res = await uploadRichTextImg(imgData)
      this.setState({ describe: value.replace(ImgReg, `<img src="${res.data.img_url}"`) })
      return
    }
    this.setState({ describe: value })
  }
  // 图片上传
  imgUploadChange = (type, info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(type === 1){
        this.setState({
          main_img: info.file.response.img_url,
          loading: false,
        })
      } else {
        this.setState({
          weixin_qrcode: info.file.response.img_url,
          loading: false,
        })
      }
    }
  }
  // 立即发布
  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err || !this.state.describe) {
        message.error('请输入正确的信息', 3)
        this.setState({ loading: false })
        return
      }
      let params = JSON.parse(JSON.stringify(values))
      params.main_img = this.state.main_img
      params.weixin_qrcode = this.state.weixin_qrcode
      params['describe'] = replaceToEscaping(this.state.describe)
      let res, resData
      try {
        if(this.state.id > 0){
          params['id'] = this.state.id
          res = await updateHuoyuanInfo(params)
          resData = res.data.data.updateHuoyuanInfo
        } else {
          res = await addHuoyuanInfo(params)
          resData = res.data.data.addHuoyuanInfo
        }
        if (resData.code === 0) {
          console.log('resData.data', resData.data)
          this.setState({
            id: resData.data
          })
          if(this.state.status === 0){
            this.payConfirm()
          } else {
            this.props.history.push('/market/list')
          }
        } else {
          message.error('修改失败, 请稍后重试', 3)
        }
      } catch (error) {
        console.log('huoyuanInfo error', error)
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
          huoyuan_id: this.state.id,
          money: 10
        }
        let res = await pay(data)
        if (res.data.code === 0) {
          message.success('发布成功', 3)
        } else {
          message.error(res.data.message, 3)
        }
        this.props.history.push('/market/list')
      },
      onCancel: () => {
        // 再次编辑
        this.props.history.push('/market/list')
      },
    })
  }
  // 编辑获取信息
  async getSingleHuoyuanInfo(id) {
    try {
      let res = await getSingleHuoyuanInfo(id)
      let resData = res.data.data.getSingleHuoyuanInfo
      if (resData.code === 0) {
        this.props.form.setFieldsValue({
          title: resData.data.title,
          type_id: resData.data.type_id,
          introduction: resData.data.introduction,
          weixin_num: resData.data.weixin_num,
          qq_num: resData.data.qq_num,
          tel_num: resData.data.tel_num,
          main_img: resData.data.main_img,
          weixin_qrcode: resData.data.weixin_qrcode,
        })
        this.setState({
          main_img: resData.data.main_img,
          weixin_qrcode: resData.data.weixin_qrcode,
          describe: resData.data.describe,
          status: Number(resData.data.status),
        })
      } else {
        message.error('获取会员信息失败', 3)
      }
    } catch (error) {
      console.log('getSingleHuoyuanInfo error', error)
    } 
  }
  componentDidMount () {
    this.initHuoyuanType()
    try {
      if(this.props.match.params.id > 0){
        this.setState({
          id: Number(this.props.match.params.id)
        })
        this.getSingleHuoyuanInfo(this.props.match.params.id)
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
      <div id="AddMarket">
        <Spin spinning={this.state.loading}>
          <h1 className="g-title">{this.state.id === 0 ? '发布货源' : '编辑货源'}</h1>
          <div className="form">
            <Form onSubmit={this.handleSubmit}>              
          
              <FormItem
                {...formItemLayout}
                label="货源标题"
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
                label="货源类型"
              >
                {getFieldDecorator('type_id', {
                  rules: [{ required: true, message: '请选择货源类型' }]
                })(
                  <Select placeholder="请选择货源类型">
                  {
                    this.state.huoyuanType.map((item,index) =>{
                      return (
                        <Option value={item.id} key={index}>{item.name}</Option>              
                      )})
                  }
                  </Select>
                )}
              </FormItem>
              
              <FormItem
                {...formItemLayout}
                label="货源主图"
              >
                {getFieldDecorator('main_img', {
                  rules: [{ required: true, message: '请上传货源主图' }]
                })(
                  <Upload {...props}  onChange={this.imgUploadChange.bind(this,1)}>
                    {this.state.main_img ? <img src={this.state.main_img} alt="avatar" /> : uploadButton}
                  </Upload>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="货源简介"
                hasFeedback
              >
                {getFieldDecorator('introduction', {
                  rules: [{ required: true, message: '请输入货源简介' }]
                })(
                  <TextArea placeholder="请输入货源简介" autosize={{ minRows: 6 }}></TextArea>
                )} 
              </FormItem>
          
              <FormItem
                {...formItemLayout}
                label="微信二维码"
              >
                {getFieldDecorator('weixin_qrcode', {
                  rules: [{ required: true, message: '请上传微信二维码' }]
                })(
                  <Upload {...props} onChange={this.imgUploadChange.bind(this,2)}>
                  {this.state.weixin_qrcode ? <img src={this.state.weixin_qrcode} alt="avatar" /> : uploadButton}
                  </Upload>
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
                label="QQ号"
                hasFeedback
              >
                {getFieldDecorator('qq_num', {
                  rules: [{ required: true, message: '请输入QQ号' }]
                })(
                  <Input placeholder="请输入QQ号" />
                )}
              </FormItem>
          
              <FormItem
                {...formItemLayout}
                label="电话号"
                hasFeedback
              >
                {getFieldDecorator('tel_num', {
                  rules: [{ required: true, message: '请输入电话号' }]
                })(
                  <Input placeholder="请输入电话号" />
                )}
              </FormItem>

              <FormItem
                {...reactQuillLayout}
                label="货源描述"
              >
                <ReactQuill value={this.state.describe}
                onChange={this.handleChange.bind(this)} modules={{
                  toolbar: [[{ font: [] }, { size: [] }],
                  [{ align: [] }, 'direction'],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ script: 'super' }, { script: 'sub' }],
                  ['blockquote', 'code-block'],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                  ['link', 'image', 'video'],
                  ['clean']]
                }} />
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
const AddMarket = Form.create()(AddMarketFrom)
export default AddMarket
