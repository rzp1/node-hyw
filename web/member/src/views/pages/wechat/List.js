import React, { Component } from 'react'
import { Table, Divider, message, Modal } from 'antd'
import getWeixinInfoList from '@/api/queries/getWeixinInfoList'
import updateField from '@/api/mutations/updateField'
import { formatTimeToYear } from '@/utils/util'
import { pay } from '@/api/common.js'
import './List.less'

class WechatList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      }
    }
  }
  async getList() {
    try {
      let res = await getWeixinInfoList(this.state.pagination.current, this.state.pagination.pageSize)
      let resData = res.data.data.getWeixinInfoList
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
        message.error('获取微信列表失败', 3)
      }
    } catch (error) {
      message.error('获取微信列表失败', 3)
      console.log('getWeixinInfoList error', error)
    }
  }
  handleTableChange (pagination, filters, sorter) {
    this.setState({
      pagination: pagination
    })
    this.getList()
  }
  toEdit(id) {
    this.props.history.push('/wechat/add/' + id)
  }
  async payConfirm(id) {
    Modal.confirm({
      title: `您需要支付10元，才能发布成功的哟`,
      okText: `确认`,
      cancelText: `取消`,
      onOk: async() => {
        let data = {
          weixin_id: id,
          money: 10
        }
        let res = await pay(data)
        if (res.data.code === 0) {
          message.success('支付成功', 3)
          this.getList()
        } else {
          message.error(res.data.message, 3)
        }
      },
      onCancel: () => {
        message.info('取消支付', 3)
      },
    })
  }
  async del(id) {
    Modal.confirm({
      title: `您确定删除该条微信货源`,
      okText: `确认`,
      cancelText: `取消`,
      onOk: async() => {
        try {
          let res = await updateField(id, 'is_delete', "1", "2")
          let resData = res.data.data.updateField
          if (resData.code === 0) {
            message.success('删除成功', 3)
            this.getList()
          } else {
            message.error(resData.message, 3)
          }
        } catch (error) {
          message.error('删除失败', 3)
          console.log('updateField error', error)
        }
      },
      onCancel: () => {
        message.info('取消删除', 3)
      },
    })
  }
  componentDidMount() {
    this.getList()
  }
  render() {
    const statusToText = (item)=> {
      switch (item) {
        case 0:
        return '未支付'
        case 2:
        return '审核中'
        case 4:
        return '审核未通过'
        case 8:
        return '已通过'
      }
    }
    const typeToText = (item) => {
      switch (item) {
        case 1:
        return '个人微信号'
        case 2:
        return '微信公众号'
        case 3:
        return '微信群号'
      }
    }
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 260,
    }, {
      title: '类型',
      dataIndex: 'type_id',
      key: 'type_id',
      align: 'center',
      width: 120,
      render: item => (
        <span>
          {typeToText(item)}
        </span>
      ),
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80,
      render: item => (
        <span>
          {statusToText(item)}
        </span>
      ),
    }, {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 160,
      render: item => (
        <span>
        {formatTimeToYear(item)}
        </span>
      ),
    }, {
      title: '点击量',
      key: 'popularity',
      dataIndex: 'popularity',
      align: 'center',
      width: 80,
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <a href="javascript:;">预览</a>
          <Divider type="vertical" />
          <a onClick={()=>this.toEdit(record.id)}>编辑</a>
          <Divider type="vertical" />
          {
            record.status === 0 && 
            <span>
              <a onClick={()=>this.payConfirm(record.id)}>支付</a>
              <Divider type="vertical" />
            </span>
          }
          <a onClick={()=>this.del(record.id)}>删除</a>
        </span>
      ),
    }]

    return (
      <div id="MarketList">
        <h1 className="g-title">微信列表</h1>
        <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} rowKey={record => record.id}/>
      </div>
    )
  }
}

export default WechatList;
