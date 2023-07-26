import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';

function HistoryOrderPage() {
  const { Header, Content, Footer, Sider } = Layout;
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchTableData = async () => {
      const response = await fetch('http://localhost:8000/hungry/orders/', {
        method: 'GET'
      });
      const data = await response.json();
      setOrders(data);
    };
    fetchTableData();
  }, []);

  useEffect(() => {
    const fetchAllDishes = async () => {
      const response = await fetch('http://localhost:8000/hungry/dishes/', {
        method: 'GET'
      });
      const data = await response.json();
      setDishes(data);
    }
    fetchAllDishes();
  }, [])

  const dishesDict = {};
  for (const dish of dishes) {
    dishesDict[dish.DishID] = dish.DishName;
  }

  return (
    <div>
      <Button
        style={{ position: "absolute", right: "180px", top: "10px" }}
        type="primary"
        shape="circle"
        size="large"
        icon={<RollbackOutlined />}
        onClick={() => navigate(`/manager`)}
        title="Go back to manager dashboard"
      />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial', marginLeft: 24 }}>
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <Outlet />
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={orders}
          renderItem={order => {
            // if (order.PayStatus === false) {
            //   return null; // Do not render the item if order.PayStatus is true
            // }
            return(
            <List.Item>
              <div style={{ width: '100%' }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'left'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4>Table {order.TableID}</h4>
                    <h4>id: {order.OrderID}</h4>
                    <h4>Total Price: {order.TotalPrice}$</h4>
                    <h4>Pay Status: <span style={{ color: order.PayStatus ? 'black' : 'red' }}>{order.PayStatus ? 'Paid' : 'Unpaid'} </span>
                    </h4>
                    <h4>Create Time: {order.CreateTime}</h4>
                  </div>
                  <div style={{ marginLeft: '40px', flex: 5 }}>
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={Array.from(order.DishList)}
                      renderItem={dish => (
                        <List.Item style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                          <Card style={{ width: '40vw', textAlign: 'Left' }}>
                            <h4 style={{ margin: 0 }}>Dish Name: {dishesDict[dish.DishID]}</h4>
                            <h4 style={{ margin: 0 }}>Amount: {dish.DishAmount}</h4>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
  
              </div>
            </List.Item>)
          }}
        />
  
      </div>
    </Content>
  </div>
  )
}

export default HistoryOrderPage;