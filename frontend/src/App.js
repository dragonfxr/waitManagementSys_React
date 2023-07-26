import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage/homepage"
import ManagerPage from './components/manager/managerPage';
import CustomerPage from './components/customer/customerPage';
import WaiterPage from './components/waiter/waiterPage';
import KitchenPage from './components/kitchen/kitchenPage';
import CategoryPage from './components/customer/categorypage';
import EditCategoryPage from './components/manager/editCategory';
import PaySuccess from './components/customer/paySuccess';
import HistoryOrderPage from './components/manager/histOrder';

function App() {
  return (
    <>
    <main>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/manager' element={<ManagerPage />} >
          <Route path=':categoryId' element={<EditCategoryPage />} />
        </Route>
        <Route path='history' element={<HistoryOrderPage />} />
        <Route path='/customer/:tableId' element={<CustomerPage />}>
          <Route path='menu/:categoryId' element={<CategoryPage />} />
          <Route path='success' element={<PaySuccess />} />
        </Route>
        <Route path='/waiter' element={<WaiterPage />}/>
        <Route path='/kitchen' element={<KitchenPage />}/>
      </Routes>
    </BrowserRouter>
  
    </main>
    </>
  );
}

export default App;
