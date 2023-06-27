import React, { useState, useEffect } from "react";
import { Menu, Layout } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function CustomerPage() {
    const [categories, setCategories] = useState([]);// store all dishes
    const navigate = useNavigate();
    const location = useLocation();
    const { Header, Content, Footer, Sider } = Layout;

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
                            <Menu.Item key={category.CategoryID} onClick={() => navigate(`/customer/menu/${category.CategoryID}`)}>
                                {category.CategoryName}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        Table Number:
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            <Outlet />
                            {location.pathname === '/customer' &&
                                <div style={{ textAlign: 'center' }}>
                                    <img src={'/ayouh.jpeg'} style={{ width: '750px' }} alt="welcome" />
                                </div>
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Are You Hungry 😋</Footer>
                </Layout>
            </Layout >






        </>
    )
}

export default CustomerPage;