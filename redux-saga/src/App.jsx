import './index.css'
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import UserList from './component/users_data'
function App() {
  return (

  <Provider store={store}>
    <div className="min-h-screen bg-black flex items-center justify-center">
      <UserList />
    </div>
  </Provider>
  )
}

export default App
