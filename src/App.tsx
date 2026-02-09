
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout'
import NotFound from './Modules/Shared/Notfound/Notfound'
import LandingPage from './Modules/Shared/LandingPage/LandingPage'
import ProductsList from './Modules/AdminModule/ProductsList/ProductsList'
import Products from './Modules/UserModule/Products/Products'
import ProductDetails from './Modules/UserModule/ProductDetails/ProductDetails'
import Cart from './Modules/UserModule/Cart/CartDetails'
import Favorites from './Modules/UserModule/Favorites/Favorites'
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout'
import Login from './Modules/AuthModule/Login/Login'
import Register from './Modules/AuthModule/Register/Register'
import ForgotPassword from './Modules/AuthModule/ForgotPassword/ForgotPassword'
import ResetPassword from './Modules/AuthModule/ResetPassword/ResetPassword'
import ChangePassword from './Modules/AuthModule/ChangePassword/ChangePassword'
import UsersList from './Modules/AdminModule/UsersList/UsersList'
import OrdersList from './Modules/AdminModule/OrdersList/OrdersList'
import CategoriesList from './Modules/AdminModule/Categories/CategoriesList'
import { ToastContainer } from 'react-toastify'
import AdminLayout from './Modules/Shared/AdminLayout/AdminLayout'
import ProductData from './Modules/AdminModule/ProductData/ProductData'
import AdminDashboard from './Modules/AdminModule/AdminDashboard/AdminDashboard'
import ProtectedRoutes from './Modules/Shared/ProtectedRoutes/ProtectedRoutes'

function App() {

  const routes = createBrowserRouter([
    {
      path: '',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'home', element: <LandingPage /> },
        { path: 'products', element: <Products /> },
        { path: 'product-details', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'favorites', element: <Favorites /> },
      ]
    },

    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
      ]
    },

    {
      path: 'dashboard',
      element: <ProtectedRoutes> <AdminLayout /> </ProtectedRoutes>,
      // element: <AdminLayout/>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'products-list', element: <ProductsList /> },
        { path: 'product-data/new', element: <ProductData /> },
        { path: 'product-data', element: <ProductData /> },
        { path: 'users-list', element: <UsersList /> },
        { path: 'orders-list', element: <OrdersList /> },
        { path: 'categories-list', element: <CategoriesList /> },
      ]
    }
  ])

  return (
    <>
      <ToastContainer position='top-center' theme="dark" />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
