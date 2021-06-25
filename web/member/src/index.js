import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Layout from '@/views/layout/Layout'
import Login from '@/views/account/Login'
import Register from '@/views/account/Register'
import './index.css'

ReactDOM.render(
  (
    <HashRouter>
    <div id="index">
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={Layout}></Route>
      </Switch>
    </div>
    </HashRouter>
  ),
  document.getElementById('root')
)