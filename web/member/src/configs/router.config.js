
import Home from '@/views/pages/Home'
import AddMarket from '@/views/pages/market/Add'
import MarketList from '@/views/pages/market/List'
import AddWechat from '@/views/pages/wechat/Add'
import WechatList from '@/views/pages/wechat/List'
import TopUp from '@/views/pages/financial_manage/TopUp'
import EditMyData from '@/views/pages/account_manage/Edit'
import UserManual from '@/views/pages/service_center/UserManual'
import SeviceMsg from '@/views/pages/service_center/Msg'

export default [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/market/add/:id',
    component: AddMarket
  },
  {
    path: '/market/list',
    component: MarketList
  },
  {
    path: '/wechat/add/:id',
    component: AddWechat
  },
  {
    path: '/wechat/list',
    component: WechatList
  },
  {
    path: '/financial_manage/top_up',
    component: TopUp
  },
  {
    path: '/account_manage/edit',
    component: EditMyData
  },
  {
    path: '/service_center/user_manual',
    component: UserManual
  },
  {
    path: '/service_center/msg',
    component: SeviceMsg
  }
]