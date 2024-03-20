import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App'
import store from './store'
import NotFoundPage from './NotFoundPage'
import TaskPage from './TaskPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    
  },
  {
    path: '/task',
    element: <TaskPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/task/:id',
    element: <TaskPage />,
    
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <Provider store = {store}>
		<RouterProvider router={router} />
    </Provider>
	</React.StrictMode>
)