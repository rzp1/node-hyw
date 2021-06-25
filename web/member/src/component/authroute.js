import React from 'react'
import { getToken } from '@/utils/auth'
import { withRouter } from 'react-router'

class AuthRoute extends React.Component{
	componentDidMount() {
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return null
    }
    const token = getToken()
    if (!token) {
      this.props.history.push('/login')
    }
	}
	render(){
		return null
	}

}
export default withRouter(AuthRoute)