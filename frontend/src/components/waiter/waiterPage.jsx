import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { HomeOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './waiter.css'; // Import the CSS file


function WaiterPage() {
  const { Header, Content, Footer, Sider } = Layout;
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  // const location = useLocation();
  const navigate = useNavigate();  
  // const [previousTables, setPreviousTables] = useState([]);  
  
  const fetchTableData = async () => {
      const response = await fetch('http://localhost:8000/hungry/tables/', {
        method: 'GET'
      });
      const data = await response.json();
      return data;
  };  


  const changeTableStatus = async (table) => {
    await fetch(`http://localhost:8000/hungry/tables/${table.TableID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "TableID": table.TableID,
        "CallingWaiter": !table.CallingWaiter
      })
    });
  };
  
  useEffect(() => {
    const fetchTableDataAndCheckChanges = async () => {
      const initialTables = await fetchTableData();
      setTables(initialTables);
    };
  
    fetchTableDataAndCheckChanges();
  }, []);
  

  const clickAssistButton = (index) => {
    const updatedTables = [...tables];
    updatedTables[index].CallingWaiter = !updatedTables[index].CallingWaiter;
    setTables(updatedTables);
  };
    
  useEffect(() => {
    const fetchAllOrders = async () => {
        const response = await fetch('http://localhost:8000/hungry/orders/', {
            method: 'GET'
        });
        const data = await response.json();
        setOrders(data);
    }
    fetchAllOrders();
}, [])

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

  // const dishesDict = dishes.reduce((result, dish) => {
  //   result[dish.DishID] = dish.DishName;
  //   return result;
  // }, {});
  // // console.log(dishesDict[8]);
  const dishesDict = {};
  for (const dish of dishes) {
    dishesDict[dish.DishID] = dish.DishName;
  }
  console.log(dishesDict[22]);


  return (
      <>
          <Layout>
              <Sider
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                  background: '#f0f0f0',
                }}
              >
                {tables.map((table, index) => (
                  <div
                    key={table.TableID}
                    style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', padding: '5px' }}
                  >
                    <span>Table: {table.TableID}:</span>
                    <button
                      className={`waiter-page-button ${table.CallingWaiter ? 'red' : 'green'}`}
                      onClick={() => {
                        changeTableStatus(table);
                        clickAssistButton(index)
                      }}
                    >
                      {table.CallingWaiter ? ' Calling' : 'Normal'}
                    </button>
                  </div>
                ))}
              </Sider>
              <Layout style={{ marginLeft: 200 }}>
                <Header style={{ background: '#fff', paddingLeft: 10 }}>
                  <h2>Staff Mangement System</h2>
                  <Button
                    style={{ position: "absolute", right: "180px", top: "10px" }}
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<HomeOutlined />}
                    onClick={() => navigate(`/`)}
                    title="Go back to home page"
                  />
                </Header>
      
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', marginLeft: 24}}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Outlet />
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={orders}
              renderItem={order => (
                <List.Item>
                  <Card style={{ width: '100%'}}>
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'left'
                    }}>
                      <div style={{ marginRight: '10vw', marginLeft: '40px' , flex: 1}}>
                        <h4>Table {order.TableID}</h4>
                        <h4>id: {order.OrderID}</h4>
                        <h4>Pay Status: <span style={{ color: order.PayStatus ? 'black' : 'red' }}>{order.PayStatus ? 'Paid' : 'Unpaid'}</span></h4>
                      </div>
                      <div style={{ marginLeft: '40px' , flex:5}}>
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
                    
                  </Card>
                </List.Item>
              )}
            />

            </div>
          </Content>
      
                <Footer style={{ textAlign: 'center' }}>
                  <div style={{ margin: 20 }}>
                    Are You Hungry 😋
                  </div>
                </Footer>
              </Layout>
          </Layout >
          
         
        </>
  )
}

export default WaiterPage;