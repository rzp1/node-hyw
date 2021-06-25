import React, { Component } from 'react'
import { Table, Divider, message, Input, Button, Modal } from 'antd'
import getArticleList from '@/api/queries/getArticleList'
import deleteArticle from '@/api/mutations/deleteArticle'
import { formatTimeToYear } from '@/utils/util'
import './ArticleList.less'


class ArticleList extends Component {
  state = {
    list: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    },
    selectedRowKeys: [],
    searchTitle: ''
  }
  async getList() {
    try {
      let param = {
        current: this.state.pagination.current,
        pageSize: this.state.pagination.pageSize,
        searchTitle: this.state.searchTitle
      }
      let res = await getArticleList(param)
      let resData = res.data.data.getArticleList
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
        message.error('获取文章列表失败', 3)
      }
    } catch (error) {
      message.error('获取文章列表失败', 3)
      console.log('getArticleList error', error)
    }
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
  deleteConfirm = (id) => {
    let text = '确定删除选中文章?'
    let ids = []
    if (id) {
      text = '确定删除该条文章?'
      ids.push(id)
    } else {
      if (this.state.selectedRowKeys.length === 0) {
        message.warning('请选中要删除的文章', 3)
        return 
      }
      ids = this.state.selectedRowKeys
    }
    Modal.confirm({
      title: text,
      okText: `确认删除`,
      cancelText: `取消`,
      onOk: async() => {
        let res = await deleteArticle(JSON.stringify(ids))
        let resData = res.data.data.deleteArticle
        if (resData.code === 0) {
          message.success(resData.message, 3)
          this.getList()
        } else {
          message.error(resData.message, 3)
        }
      },
      onCancel: () => {
        message.info('取消删除', 3)
      },
    })
  }
  handleTableChange (pagination, filters, sorter) {
    this.setState({
      pagination: pagination
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
  }
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '主图',
      dataIndex: 'cover_img',
      key: 'cover_img',
      render: url => <img src={url} alt="" className="avatar"/>
    }, {
      title: '摘要',
      dataIndex: 'abstract',
      key: 'abstract',
      width: 800,
      render:  value => <div dangerouslySetInnerHTML={{__html: value}}></div>
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">详情</a>
          <Divider type="vertical" />
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
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
      <div id="ArticleList">
        <div className="example-input">
          文章标题 <Input placeholder="请输入标题" id="searchTitle" onChange={this.onChange}/>
          <Button type="primary" icon="search" onClick={this.getList.bind(this)} className="button">搜索</Button>
          <Button onClick={()=>this.deleteConfirm(0)}>批量删除</Button>
        </div>
        <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.list} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} rowKey={record => record.id}/>
      </div>
    )
  }
}

export default ArticleList
