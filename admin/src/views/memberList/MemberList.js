import React, { Component } from 'react'
import './MemberList.less'
import { Table, Divider, message, Input, Button } from 'antd'
import getMemberList from '@/api/queries/getMemberList'
import { formatTimeToYear } from '@/utils/util'


class MemberList extends Component {
  state = {
    list: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    },
    sortedInfo: {
      sortField: '',
      sortOrder: ''
    },
    searchAccount: '',
    searchName: '',
    searchTel: ''
  }

  async getList() {
    try {
      let param = {
        current: this.state.pagination.current,
        pageSize: this.state.pagination.pageSize,
        sortField: this.state.sortedInfo.sortField || '',
        sortOrder: this.state.sortedInfo.sortOrder || '',
        searchAccount: this.state.searchAccount || '',
        searchName: this.state.searchName || '',
        searchTel: this.state.searchTel || ''
      }
      let res = await getMemberList(param)
      let resData = res.data.data.getMemberList
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
        message.error('获取会员列表失败', 3)
      }
    } catch (error) {
      message.error('获取会员列表失败', 3)
      console.log('getMemberList error', error)
    }
  }
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
  }

  render() {
    const sexText = (item)=> {
      switch (item) {
        case 0:
        return '保密'
        case 1:
        return '男'
        case 2:
        return '女'
      }
    }
    const columns = [{
      title: '',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: url => <img src={url ? url : require('@/images/defalut_avatar.png')} alt="" className="avatar"/>
    }, {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      align: 'center',
      width: 100,
      render: item => (
        <span>
          {sexText(item)}
        </span>
      ),
    }, {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 100,
      align: 'center',
      sorter: true
    }, {
      title: '余额',
      dataIndex: 'money',
      key: 'money',
      width: 120,
      align: 'center',
      sorter: true
    }, {
      title: '手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      render: item => (
        <span>
        {item ? item : '--'}
        </span>
      ),
    }, {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: item => (
        <span>
        {formatTimeToYear(item)}
        </span>
      ),
    }, {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
      key: 'last_login_time',
      render: item => (
        <span>
        {formatTimeToYear(item)}
        </span>
      ),
    }, {
      title: '登录IP',
      dataIndex: 'last_login_ip',
      key: 'last_login_ip'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看Ta的货源</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      ),
    }]
    
    return (
      <div id="MemberList">
        <div className="example-input">
          账号 <Input placeholder="请输入账号" id="searchAccount" onChange={this.onChange}/>
          昵称 <Input placeholder="请输入昵称" id="searchName" onChange={this.onChange}/>
          手机号 <Input placeholder="请输入手机号" id="searchTel" onChange={this.onChange}/>
          <Button type="primary" icon="search" onClick={this.getList.bind(this)}>搜索</Button>
        </div>
        <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} rowKey={record => record.id}/>
      </div>
    )
  }
}

export default MemberList
