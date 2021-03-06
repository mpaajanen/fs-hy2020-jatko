import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  users: usersReducer,
  notification: notificationReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)