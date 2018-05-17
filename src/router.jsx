import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { history } from 'store'
import Home from 'routes/Home'
import Summary from 'routes/Summary'

export default () => {
  return [<Router history={history}>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/summary' component={Summary} />
    </div>
  </Router>
  ]
}
