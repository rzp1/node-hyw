import React, { Component } from 'react'
import { message, Table, Divider, Button, Modal } from 'antd'
import { formatTimeToYear } from '@/utils/util'
import getMessageList from '@/api/queries/getMessageList'
import deleteMessage from '@/api/mutations/deleteMessage'
import './Msg.less'
class SeviceMsg extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    },
    messageList: [],
    selectedRowKeys: []
  }
  initMessage = (async() => {
    try {
      let res = await getMessageList(this.state.pagination.current, this.state.pagination.pageSize)
      let resData = res.data.data.getMessageList
      if (resData.code === 0) {
        this.setState({
          pagination: {
            total: resData.count,
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize
          },
          messageList: resData.data
        })
      } else if (resData.code === 2) {
        message.info('暂无数据', 3)
      } else {
        message.error('获取消息失败', 3)
      }
    } catch (error) {
      message.error('获取消息失败', 3)
      console.log('getMessageList error', error)
    } 
  })
  handleTableChange (pagination, filters, sorter) {
    console.log('pagination', pagination)
    this.setState({
      pagination: pagination
    })
    this.initMessage()
  }
  componentWillMount () {
    this.initMessage()
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
  deleteConfirm = (id) => {
    let text = '确定删除选中留言?'
    let ids = []
    if (id) {
      text = '确定删除该条留言?'
      ids.push(id)
    } else {
      if (this.state.selectedRowKeys.length === 0) {
        message.warning('请选中要删除的留言', 3)
        return 
      }
      ids = this.state.selectedRowKeys
    }
    Modal.confirm({
      title: text,
      okText: `确认删除`,
      cancelText: `取消`,
      onOk: async() => {
        let res = await deleteMessage(JSON.stringify(ids))
        let resData = res.data.data.deleteMessage
        if (resData.code === 0) {
          message.success(resData.message, 3)
          this.initMessage()
        } else {
          message.error(resData.message, 3)
        }
      },
      onCancel: () => {
        message.info('取消删除', 3)
      },
    })
  }
  render() {
    const columns = [{
      title: '消息内容',
      dataIndex: 'content',
      key: 'content',
      width: 600
    },{
      title: '',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: item => (
        <span>
        {formatTimeToYear(item)}
        </span>
        )
    }, {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={()=>this.deleteConfirm(record.id)}>删除</a>
        </span>
      ),
    }]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection
    }
    return (
      <div id="msg">
        <div className="deletes">
          <Button onClick={()=>this.deleteConfirm(0)}>批量删除</Button> 
        </div>      
        <Table columns={columns}  rowSelection={rowSelection} dataSource={this.state.messageList} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} pagination={this.state.pagination} rowKey={record => record.id}/>
      </div>
    )
  }
}

export default SeviceMsg;
