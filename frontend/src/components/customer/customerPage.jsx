import React, { useState, useEffect } from "react";
import { Menu, Layout, Button} from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BellOutlined, HomeOutlined, DoubleLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
/* <link rel="stylesheet" href="customer.css" /> */

function CustomerPage() {
    const [categories, setCategories] = useState([]);// store all categories
    const navigate = useNavigate();
    const location = useLocation();
    const { Header, Content, Footer, Sider } = Layout;
    const tableId = useParams();
    // localStorage.setItem('tableId', useParams().toString());
    // const tableId = localStorage.getItem('tableId');
    // console.log(tableId.tableId);

    useEffect(() => {
        const fetchMenuData = async () => {
            const response = await fetch('http://localhost:8000/hungry/categories/', {
                method: 'GET'
            });
            const data = await response.json();
            setCategories(data);
        }
        fetchMenuData();
    }, [])

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
                    {/* Show All Categories */}
                    <Menu
                        style={{ width: 256, background: 'transparent' }}
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub0']}
                        mode="inline"
                    >
                        {categories.map(category => (
                            <Menu.Item key={category.CategoryID} onClick={() => navigate(`/customer/${tableId.tableId}/menu/${category.CategoryID}`)}>
                                {category.CategoryName}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', paddingLeft: 10 }}>
                        Table Number: {tableId.tableId}
                        <Button
                            type="primary" danger
                            shape="circle"
                            size="large"
                            icon={<BellOutlined />}
                            onClick={() => alert("Ring the bell!")}
                            title="Call for assistance"
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<HomeOutlined />}
                            onClick={() => navigate(`/customer/${tableId.tableId}`)}
                            title="Go back to home page"
                        />
                        <Button
                            type="primary"
                            icon={<DoubleLeftOutlined />}
                            size="large"
                            onClick={() => {navigate(`/`);
                                            alert("By doing this, you will lose all your data!");
                                            // localStorage.removeItem('tableId');
                                        }}
                            title="Select new table number"
                        >
                        Select new table number
                        </Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            <Outlet />
                            {location.pathname === `/customer/${tableId.tableId}` &&
                                <div style={{ textAlign: 'center' }}>
                                    <img src={'/ayouh.jpeg'} style={{ width: '750px' }} alt="welcome" />
                                </div>
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                        <div style={{margin: 20}}>
                        Are You Hungry 😋
                        </div>
                       <div>
                       <ShoppingCartOutlined />
                        </div> 
                    </Footer>
                </Layout>
            </Layout >






        </>
    )
}

export default CustomerPage;