import React, {
  Component
} from 'react';
import { Table, Divider, message, Modal } from 'antd';
import getHuoyuanInfoList from '@/api/queries/getHuoyuanInfoList'
import updateField from '@/api/mutations/updateField'
import { formatTimeToYear } from '@/utils/util'
import { pay } from '@/api/common.js'
class MarketList extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    list: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    }
  }
  async getList() {
    try {
      let res = await getHuoyuanInfoList(this.state.pagination.current, this.state.pagination.pageSize, 0)
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
        message.error('获取货源列表失败', 3)
      }
    } catch (error) {
      message.error('获取货源列表失败', 3)
      console.log('getHuoyuanInfoList error', error)
    }
  }
  async payConfirm(id) {
    Modal.confirm({
      title: `您需要支付10元，才能发布成功的哟`,
      okText: `确认支付`,
      cancelText: `取消`,
      onOk: async() => {
        let data = {
          huoyuan_id: id,
          money: 10
        }
        let res = await pay(data)
        if (res.data.code === 0) {
          message.success('发布成功', 3)
          this.getList()
        } else {
          message.error(res.data.message, 3)
        }
      },
      onCancel: () => {
        // 再次编辑
      },
    })
  }
  async del(id) {
    try {
      let res = await updateField(id, 'is_delete', "1", "1")
      let resData = res.data.data.updateField
      if (resData.code === 0) {
        message.success('删除成功', 3)
        this.getList()
      } else {
        message.error(resData.message, 3)
      }
    } catch (error) {
      message.error('删除货源失败', 3)
      console.log('updateField error', error)
    }
  }
  toEdit(id) {
    // this.props.history.push({
    //   pathname: '/market/add',
    //   query: {
    //     id: id
    //   }
    // })
    this.props.history.push('/market/add/' + id)
  }
  handleTableChange(pagination, filters, sorter) {
    this.setState({
      pagination: pagination
    });
    this.getList()
  }
  componentDidMount() {
    this.getList();
  }
  render() {
    let statusToText = (item)=> {
      switch (item) {
        case '0':
          return '未支付'
        case '2':
          return '审核中'
        case '4':
          return '审核未通过'
        case '8':
          return '已通过'
        default: 
          return '状态错误'
      }
    }
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 300,
    }, {
      title: '类型',
      dataIndex: 'type_text',
      key: 'type_text',
      align: 'center',
      width: 80,
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
            record.status === '0' && 
            <span>
              <a onClick={()=>this.payConfirm(record.id)}>支付</a>
              <Divider type="vertical" />
            </span>
          }
          <a onClick={()=>this.del(record.id)}>删除</a>
        </span>
      ),
    }];

    return (
      <div id="MarketList">
        <h1 className="g-title">货源列表</h1>
        <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)} rowKey={record => record.id} />
      </div>
    );
  }
}

export default MarketList;
