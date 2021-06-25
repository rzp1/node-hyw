import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Layout from '@/views/layout/Layout'
import * as serviceWorker from './serviceWorker'
import './index.less'

ReactDOM.render((
  <HashRouter>
  <div id="index">
    <Switch>
      <Route path="/" component={Layout}></Route>
    </Switch>
  </div>
  </HashRouter>  
), document.getElementById('root'))

serviceWorker.unregister()
