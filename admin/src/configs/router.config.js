
import MemberList from '@/views/memberList/MemberList'
import ArticleList from '@/views/articleList/ArticleList'
import HuoyuanList from '@/views/huoyuanList/HuoyuanList'
import TrashList from '@/views/trashList/TrashList'
import PayRecord from '@/views/payRecord/PayRecord'

export default [
  {
    path: '/memberList',
    component: MemberList
  }, {
    path: '/articleList',
    component: ArticleList
  }, {
    path: '/huoyuanList',
    component: HuoyuanList
  }, {
    path: '/payRecord',
    component: PayRecord
  },
  {
    path: '/trashList',
    component: TrashList
  }
]