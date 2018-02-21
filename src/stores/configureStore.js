import { createStore, applyMiddleware, compose } from 'redux'
import postListApp from '../reducers/index'

import thunkMiddleware from 'redux-thunk'

const middleware = applyMiddleware(thunkMiddleware)

export default function configureStore (initialState) {
  return createStore(
    postListApp,
    initialState,
    compose(
      middleware
    )
  )
}
