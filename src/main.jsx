import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import {
  Login,
  Signup,
  Post,
  Home,
  EditPost,
  AddPost,
  AllPosts
} from './pages/index.js'




import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './app.jsx' 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/login',
        element: (
          <Login />
          // <AuthLayout authentication={false}>
          //   <Login />
          // </AuthLayout>

        )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
      },
      {
          path: "/all-posts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AllPosts />
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
