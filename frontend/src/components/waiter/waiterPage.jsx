import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card, message } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import './waiter.css'; // Import the CSS file


function WaiterPage() {
  const { Header, Content, Footer, Sider } = Layout;
  const [tables, setTables] = useState([]);
  const [newTables, setNewTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  // const location = useLocation();
  const navigate = useNavigate();  
  // const [previousTables, setPreviousTables] = useState([]);  
  // const [newTables, setNewTables] = useState([]);
  // const prevTables = useRef(tables);

  // useEffect(() => {
  //   // This effect will run whenever the list state changes
  //   const checkChanges = () => {
  //     if (newTables) {
  //       const changedElements = tables.filter(
  //         (currentElement, index) => JSON.stringify(currentElement.CallingWaiter) !== JSON.stringify(newTables[index].CallingWaiter)
  //       );

  //       // Do something with the changed elements
  //       console.log('Changed elements:', changedElements);
  //     }
  //   };

  //   // Call the checkChanges function
  //   checkChanges();

  //   // Update the prevListRef with the current list for the next comparison
  //   setNewTables(tables);
  // }, [tables]);

  
  
  
  const changeTableStatus = async (table) => {
    await fetch(`http://localhost:8000/hungry/tables/${table.TableID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "TableID": table.TableID,
        "CallingWaiter": false
      })
    });
  };
  
  // Fetch table data periodically
  useEffect(() => {
    const fetchTableData = async () => {
        const response = await fetch('http://localhost:8000/hungry/tables/', {
          method: 'GET'
        });
        const data = await response.json();
        return data;
    };  

    const fetchNewTableData = async () => {
      const initialTables = await fetchTableData();
        // setTables(initialTables);
        setNewTables(initialTables);
      }

      fetchNewTableData();
      
    const intervalId = setInterval(fetchNewTableData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Hook to check if table data changes
  useEffect(() => {
    if (JSON.stringify(newTables) !== JSON.stringify(tables)){
      console.log("Changed");
      const changedElements = tables.filter(
        (currentElement, index) => JSON.stringify(currentElement.CallingWaiter) !== JSON.stringify(newTables[index].CallingWaiter)
      );

      // Do something with the changed elements
      if (changedElements.length && changedElements[0].CallingWaiter === false){
        message.warning(`Table ${changedElements[0].TableID} is calling for assistance!`);
      }
      setTables(newTables);
    }
  }, [newTables, tables]);
  

  // const clickAssistButton = (index) => {
  //   const updatedTables = [...tables];
  //   updatedTables[index].CallingWaiter = !updatedTables[index].CallingWaiter;
  //   setTables(updatedTables);
  // };
    
  const fetchAllOrders = async () => {
    const response = await fetch('http://localhost:8000/hungry/orders/', {
      method: 'GET'
    });
    const data = await response.json();
    setOrders(data);
  };

  const serveDish = async (order, orderDetailIDToUpdate) => {
    const orderID = order.OrderID
  
    const modifiedData = { ...order };
  
    // Find the index of the element in the DishList array with the matching OrderDetailID
    const dishListIndex = modifiedData.DishList.findIndex(
      (dish) => dish.OrderDetailID === orderDetailIDToUpdate
    );
  
    // Check if the element with the specified OrderDetailID was found
    if (dishListIndex !== -1) {
      // Update the CompleteStatus property of the specific element in the cloned DishList array
      modifiedData.DishList[dishListIndex].CompleteStatus = true;
    } else {
      console.error(`Element with OrderDetailID ${orderDetailIDToUpdate} not found.`);
      return; // Exit the function if the element was not found
    }
  
    // Prepare the PUT request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedData), // Convert the modified data to a JSON string
    };
  
    // Replace 'YOUR_PUT_API_URL' with your actual API endpoint for updating the data
    const response = await fetch(`http://localhost:8000/hungry/orders/${orderID}`, requestOptions);
  
    // Handle the response as needed
    if (response.ok) {
      message.success("Please go immediately")
    } 
  };

  useEffect(() => {
    // Fetch orders immediately when the component mounts
    fetchAllOrders();

    // Fetch orders every 5 seconds
    const intervalId = setInterval(fetchAllOrders, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
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
  // console.log(dishesDict[22]);


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
                        // clickAssistButton(index)
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
                                <h4 style={{ margin: 0 }}><span style={{ color: dish.CompleteStatus ? 'green' : 'red' }}>Status: {dish.CompleteStatus ? 'Served': 'Preparing'}</span></h4>
                                <Button type="primary" onClick={() => {serveDish(order, dish.OrderDetailID)}}>Serve</Button>
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