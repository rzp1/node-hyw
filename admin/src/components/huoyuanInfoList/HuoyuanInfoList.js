import React, { Component } from 'react'
import './HuoyuanInfoList.less'
import { Table, Divider, message, Input, Button, Form, Select } from 'antd'
import getHuoyuanInfoList from '@/api/queries/getHuoyuanInfoList'
import getHuoyuanTypeList from '@/api/queries/getHuoyuanTypeList'
import { formatTimeToYear } from '@/utils/util'

const FormItem = Form.Item
const Option = Select.Option

class HuoyuanInfoListFrom extends Component {
  state = {
    list: [],
    selectStatus: [
      {
        id: 1,
        value: '未支付'
      }, {
        id: 2,
        value: '未审核'
      }, {
        id: 4,
        value: '驳回'
      }, {
        id: 8,
        value: '审核通过'
      }
    ],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    },
    sortedInfo: {
      sortField: '',
      sortOrder: ''
    },
    huoyuanType: [],
    searchInfo: {
      status: 0,
      keys: '',
      member_id: 0,
      recommended_type: 0
    }
  }
  async getList() {
    console.log('this', this)
    console.log(this.state.searchInfo)
    console.log(this.state.sortedInfo)
    try {
      let param = {
        current: this.state.pagination.current,
        pageSize: this.state.pagination.pageSize,
        sortField: this.state.sortedInfo.sortField || '',
        sortOrder: this.state.sortedInfo.sortOrder || '',
        status: this.state.searchInfo.status,
        recommended_type: this.state.searchInfo.recommended_type,
        keys: this.state.searchInfo.keys,
        member_id: this.state.searchInfo.member_id
      }
      console.log('this.state=====', this.state)
      let res = await getHuoyuanInfoList(param)
      let resData = res.data.data.getHuoyuanInfoList
      if (resData.code === 0) {
        this.setState({
          pagination: {
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            total: resData.count
          },
          list: resData.data
        })
      } else {
        message.error('获取商品货源列表失败', 3)
      }
    } catch (error) {
      message.error('获取商品货源列表失败', 3)
      console.log('getHuoyuanInfoList error', error)
    }
  }
  initHuoyuanType = (async() => {
    try {
      let res = await getHuoyuanTypeList()
      let resData = res.data.data.getHuoyuanTypeList
      if (resData.code === 0) {
        resData.data.unshift({
          id: 0,
          name: '全部'
        })
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
  handleTableChange (pagination, filters, sorter) {
    let sortedInfo = {
      sortField: sorter.field,
      sortOrder: sorter.order
    }
    this.setState({
      pagination: pagination,
      sortedInfo: sortedInfo
    })
    this.getList()
  }
  onChange = (e) => {
    const { value, id } = e.target
    this.setState({
      [id]: value
    })
  }
  componentDidMount() {
    this.getList()
    this.initHuoyuanType()
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        message.error('请输入正确的信息', 3)
        return
      }
      let params = JSON.parse(JSON.stringify(values))
      if (Object.keys(params).length === 0) {
        message.error('请输入搜索条件', 3)
        return
      }
      console.log('params=======', params)
      await this.setState({
        searchInfo: params
      })
      this.getList()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const statusText = (item)=> {
      switch (item) {
        case 1:
        return '未支付'
        case 2:
        return '未审核'
        case 4:
        return '驳回'
        case 8:
        return '审核通过'
      }
    }
    const recommendText = (item)=> {
      switch (item) {
        case 1:
        return '--'
        case 2:
        return '首页精品推荐'
        case 3:
        return '首页所在分类展示'
        case 4:
        return '顶部滚动展示'
        case 5:
        return '货源详情右侧推荐'
      }
    }
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: item => (
        <span>
        {formatTimeToYear(item)}
        </span>
      ),
    }, {
      title: '类型',
      dataIndex: 'type_text',
      key: 'type_text',
    }, {
      title: '人气',
      dataIndex: 'popularity',
      key: 'popularity',
      width: 100,
      align: 'center',
      sorter: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: item => (
        <span>
          {statusText(item)}
        </span>
      )
    }, {
      title: '推荐位置',
      dataIndex: 'recommended_type',
      key: 'recommended_type',
      render: item => (
        <span>
          {recommendText(item)}
        </span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">详情</a>
          <Divider type="vertical" />
          <a href="javascript:;">审核</a>
          <Divider type="vertical" />
          {
            record.is_delete ? <span>已删除</span> : <a href="javascript:;">删除</a>
          }
        </span>
      )
    }]
    return (
      <div id="HuoyuanInfoList">
        <div className="example-input">
          <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">              
            
            <FormItem
              label="货源标题"
              hasFeedback
            >
            {getFieldDecorator('keys')(
              <Input placeholder="请输入货源标题" />
            )}
            </FormItem>

          <FormItem
            label="货源类型"
          >
          {getFieldDecorator('recommended_type')(
            <Select placeholder="请选择货源类型" style={{ width: 150 }}>
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
            label="状态"
          >
          {getFieldDecorator('status')(
            <Select placeholder="请选择状态" style={{ width: 120 }}>
            {
              this.state.selectStatus.map((item,index) =>{
                return (
                  <Option value={item.id} key={index}>{item.value}</Option>              
                )})
            }
            </Select>
          )}           
          </FormItem>
        
          <FormItem className="submit-button-item">
            <Button type="primary" htmlType="submit">搜索</Button>
          </FormItem>
        </Form>
        </div>
        <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} rowKey={record => record.id}/>
      </div>
    )
  }
}

const HuoyuanInfoList = Form.create()(HuoyuanInfoListFrom)
export default HuoyuanInfoList
