import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Modal, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BellOutlined, HomeOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";

function CustomerPage() {
    const [categories, setCategories] = useState([]);// store all categories
    const [isCalling, setIsCalling] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { Header, Content, Footer, Sider } = Layout;
    const tableId = useParams();
    const [visible, setVisible] = useState(false);
    const [couponCode, setCouponCode] = useState('');


    useEffect(() => {
        const fetchMenuData = async () => {
            const response = await fetch('http://localhost:8000/hungry/categories/', {
                method: 'GET'
            });
            const data = await response.json();
            setCategories(data);
        }
        const createNewTable = async () => {
            const response = await fetch('http://localhost:8000/hungry/tables/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "TableID": tableId.tableId,
                    "CallingWaiter": false
                })
            });
            if (response.ok) {
                message.success("Welcome to our restuarant!")
            }
            else {
                message.success(`Welcome back! You are already at table ${tableId.tableId}!`)
            }
        }
        createNewTable();
        fetchMenuData();
    }, [tableId.tableId])


    const callAssistance = async () => {
        await fetch(`http://localhost:8000/hungry/tables/${tableId.tableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "TableID": tableId.tableId,
                "CallingWaiter": true,
            })
        });
        setIsCalling(true);
    };
    const getAssistanceStatus = async () => {
        const response = await fetch(`http://localhost:8000/hungry/tables/${tableId.tableId}`, {
            method: 'GET',
        });
        const data = await response.json();
        setIsCalling(data.CallingWaiter);
    };

    useEffect(() => {
        getAssistanceStatus();
        const intervalId = setInterval(getAssistanceStatus, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchAssistanceStatus = async () => {
            const response = await fetch(`http://localhost:8000/hungry/tables/${tableId.tableId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setIsCalling(data.CallingWaiter);
        }
        fetchAssistanceStatus();
    }, [tableId.tableId])

    const generateCouponCode = () => {
        const words = ['APPLE', 'APRICOT', 'AVOCADO', 'BANANA', 'BERRY', 'BLUEBERRY', 'BOYSENBERRY', 'CANTALOUPE', 'CHERRY', 'CITRUS', 'COCONUT', 'CRANBERRY', 'DATE', 'DRAGONFRUIT', 'ELDERBERRY', 'FIG', 'GRAPE', 'GRAPEFRUIT', 'GUAVA', 'KIWI', 'LEMON', 'LIME', 'LYCHEE', 'MANGO', 'MELON', 'NECTARINE', 'ORANGE', 'PAPAYA', 'PASSIONFRUIT', 'PEACH', 'PEAR', 'PERSIMMON', 'PINEAPPLE', 'PLUM', 'POMEGRANATE', 'RASPBERRY', 'STRAWBERRY', 'TANGERINE', 'WATERMELON'];
        const randomIndex = Math.floor(Math.random() * words.length);
        const code = words[randomIndex];
        localStorage.setItem('couponCode', code);
        setCouponCode(code);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
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
                <Layout style={{
                    marginLeft: 200
                }}>
                    <Header style={{
                        background: '#fff', paddingLeft: 10
                    }}>
                        <span style={{ marginRight: '20px' }}> Table Number: {tableId.tableId}</span>
                        <Button
                            type="primary" danger
                            shape="circle"
                            size="large"
                            icon={<BellOutlined />}
                            onClick={() => {
                                if (!isCalling) {
                                    callAssistance();
                                    message.success("We are coming for help!");
                                }
                            }}
                            style={{ marginRight: '20px' }}
                            title="Call for assistance"
                            disabled={isCalling} // Disable the button when is calling
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<HomeOutlined />}
                            style={{ marginRight: '20px' }}
                            onClick={() => {
                                navigate(`/customer/${tableId.tableId}`);
                            }}
                            title="Go back to home page"
                        />
                        <Button
                            type="primary"
                            icon={<DoubleLeftOutlined />}
                            size="large"
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Are you sure?',
                                    content: 'By doing this, you will lose all your dishes selected!',
                                    onOk() {
                                        navigate(`/`);
                                    },
                                    onCancel() {
                                        // Handle cancel action if needed
                                    },
                                });
                            }}
                            title="Select new table number"
                        >
                            Select new table number
                        </Button>
                        <Button onClick={generateCouponCode} style={{ marginLeft: '30px' }}>Get a 10% off Voucher Code</Button>
                        <Modal
                            title="Your Coupon Code"
                            open={visible}
                            onOk={handleOk}
                            onCancel={() => setVisible(false)}
                        >
                            <p>{couponCode}</p>
                        </Modal>
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

export default CustomerPage;