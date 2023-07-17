import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Modal, Input, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './waiter.css'; // Import the CSS file


function WaiterPage() {
    const { Header, Content, Footer, Sider } = Layout;
    const [tables, setTables] = useState([]);
    // const location = useLocation();
    const navigate = useNavigate();

    const [previousTables, setPreviousTables] = useState([]);

    const fetchTableData = async () => {
        const response = await fetch('http://localhost:8000/hungry/tables/', {
          method: 'GET'
        });
        const data = await response.json();
        return data;
    };

    const changeTableStatus = async (table) => {
      const response = await fetch(`http://localhost:8000/hungry/tables/${table.TableID}`, {
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
      // Fetch data when the component mounts
      fetchTableData().then((initialTables) => {
        setTables(initialTables);
        setPreviousTables(initialTables);
      });

      const interval = setInterval(() => {
        fetchTableData().then((newTables) => {
          // Check for changes in the tables
          const hasTableChanges = JSON.stringify(newTables) !== JSON.stringify(previousTables);
  
          // If there are changes, display a notification
          if (hasTableChanges) {
            message.success('Table data updated!', 3);
          }
  
          // Update the state with the new tables and set as previous for the next comparison
          setTables(newTables);
          setPreviousTables(newTables);
        });
      }, 10000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, [previousTables]);

    const clickAssistButton = (index) => {
      const updatedTables = [...tables];
      updatedTables[index].CallingWaiter = !updatedTables[index].CallingWaiter;
      setTables(updatedTables);
    };


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
                    Staff Mangement System
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
        
                  <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    Content
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