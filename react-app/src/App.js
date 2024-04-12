import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import ProductDetailPage from './components/ProductDetailPage';
import AdminPage from './components/AdminPage'; // Import the AdminPage component
import AdminProductPage from './components/AdminProductPage'; // Import the AdminPage component
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className='p-4 h-fit mx-auto flex items-center justify-center '>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path='/add-product' element={authUser ? <AddProduct /> : <Navigate to='/login' />} />
        <Route path='/product/:productId' element={authUser ? <ProductDetailPage /> : <Navigate to='/login' />} />
        <Route path='/admin/product/:productId' element={authUser ? <AdminProductPage /> : <Navigate to='/login' />} />
        {/* Route for the admin page, only accessible if user is authenticated */}
        <Route
          path='/admin'
          element={
            authUser ? (
              <AdminPage />
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
