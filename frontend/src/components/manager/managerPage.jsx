import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, List, Card, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import { HomeOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import './manager.css';

function ManagerPage() {
    const [ categories, setCategories] = useState([]);
    const [ dishes, setDishes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [ currentDish, setCurrentDish] = useState();
    const [ showAllDishes, setShowAllDishes] = useState(true);
    const navigate = useNavigate();
    const { Header, Content, Footer, Sider } = Layout;

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => { // submit
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    useEffect(() => {
        const fetchCategoryData = async () => {
            const response = await fetch('http://localhost:8000/hungry/categories/', {
                method: 'GET'
            });
            const data = await response.json();
            setCategories(data);
        }
        fetchCategoryData();
    }, [])

    useEffect(() => {
        const fetchMenuData = async () => {
            if (showAllDishes){
                const response = await fetch('http://localhost:8000/hungry/dishes/', {
                method: 'GET'
            });
            const data = await response.json();
            setDishes(data);
            }
            
        }
        fetchMenuData();
    }, [showAllDishes])

    const fetchDishData = async (category) => {
        const response = await fetch(`http://localhost:8000/hungry/select/${category}`, {
            method: 'GET'
        });
        const data = await response.json();
        setDishes(data);
    }
    

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
                    <Menu
                        style={{ width: 256, background: 'transparent' }}
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub0']}
                        mode="inline"
                    >
                        <Button key={0} onClick={() => {
                            setShowAllDishes(true);
                        }}>
                            Show All Dishes
                        </Button>
                    </Menu>
                    {/* Show All Categories */}
                    <Menu
                        style={{ width: 256, background: 'transparent' }}
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub0']}
                        mode="inline"
                    >
                        {categories.map(category => (
                            <Menu.Item key={category.CategoryID} onClick={() => {
                                setShowAllDishes(false)
                                fetchDishData(category.CategoryID);
                            }}>
                                {category.CategoryName}
                            </Menu.Item>
                        ))}
                    </Menu>
                    <Button type="primary" icon={<EditOutlined/>} onClick={()=> {
                                                // setCurrentDish(dish);
                                            }}>
                                              Add
                    </Button>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', paddingLeft: 10 }}>
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<HomeOutlined />}
                            onClick={() => navigate(`/manager`)}
                            title="Go back to home page"
                        />
                        <Button
                            type="primary" danger
                            shape="circle"
                            size="large"
                            icon={<CloseOutlined />}
                            onClick={() => navigate(`/`)}
                            title="Exit"
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={dishes}
                            renderItem={dish => (
                            <List.Item>
                                    <Card>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                alt={dish.DishName}
                                                src={'/ayouh.jpeg'}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div style={{ marginRight: '40px', marginLeft: '40px' }}>
                                                <h3>id: {dish.DishID}</h3>
                                                <h3>Dish Name: {dish.DishName}</h3>
                                                <div className="dish-info">
                                                    <p className="price">Price: {dish.Price} $</p>
                                                    <p className="description">Description: {dish.Description}</p>
                                                    <p className="ingredients">Ingredients: {dish.Ingredients}</p>
                                                    <p className="ingredients">Category: {dish.DishType}</p>
                                                </div>
                                            </div>
                                            <Button type="primary" icon={<EditOutlined/>} onClick={()=> {
                                                showModal();
                                                // setCurrentDish(dish);
                                            }}>
                                              Edit
                                            </Button>
                                            <Modal title="Edit Dish Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                            <Form
                                            name="basic"
                                            labelCol={{
                                              span: 8,
                                            }}
                                            wrapperCol={{
                                              span: 16,
                                            }}
                                            style={{
                                              maxWidth: 600,
                                            }}
                                            initialValues={{
                                              remember: true,
                                            }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                          >
                                            <Form.Item
                                              label="Dish ID"
                                              name="Dish ID">
                                                {dish.DishID}
                                            </Form.Item>
                                            <Form.Item
                                              label="Dish Name"
                                              name="Dish Name"
                                              rules={[
                                                {
                                                  required: true,
                                                  message: 'Please specify the dish name!',
                                                },
                                              ]}
                                              help="Please start with a capital letter!"
                                            >
                                              <Input placeholder={dish.DishName}/>
                                            </Form.Item>
                                            <Form.Item
                                              label="Dish Description"
                                              name="Dish Description"
                                              rules={[
                                                {
                                                  required: true,
                                                  message: 'Please specify the dish description!',
                                                },
                                              ]}
                                            >
                                              <Input placeholder={dish.Description}/>
                                            </Form.Item>

                                            <Form.Item
                                              label="Dish Ingredients"
                                              name="Dish Ingredients"
                                              rules={[
                                                {
                                                  required: true,
                                                  message: 'Please specify the dish ingredients!',
                                                },
                                              ]}
                                            >
                                              <Input placeholder={dish.Ingredients}/>
                                            </Form.Item>

                                            <Form.Item
                                              label="Dish Category"
                                              name="Dish Category"
                                              rules={[
                                                {
                                                  required: true,
                                                  message: 'Please specify the dish category!',
                                                },
                                              ]}
                                              help="Please insert an integer for now! (TODO:)"
                                            >
                                                
                                              <Input placeholder={dish.DishType}/>
                                            </Form.Item>

                                          </Form>
                                            </Modal>
                                        </div>
                                    </Card>
                            </List.Item >
                            )
                        }
                        />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                        <div style={{margin: 20}}>
                        Are You Hungry 😋
                        </div>
                    </Footer>
                </Layout>
            </Layout >






        </>
    )
}


export default ManagerPage;