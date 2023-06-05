import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage"
import ManagerPage from './components/manager/managerPage';
import CustomerPage from './components/customer/customerPage';
import WaiterPage from './components/waiter/waiterPage';
import KitchenPage from './components/kitchen/kitchenPage';

function App() {
  return (
    <>
    <main>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/manager' element={<ManagerPage />}/>
        <Route path='/customer' element={<CustomerPage />}/>
        <Route path='/waiter' element={<WaiterPage />}/>
        <Route path='/kitchen' element={<KitchenPage />}/>

      </Routes>
    </BrowserRouter>
  
    </main>
    </>
  );
}

export default App;