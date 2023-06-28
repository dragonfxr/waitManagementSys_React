import { List, Card, Modal, Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function EditCategoryPage({ showAllDishes }) {
    const [dishes, setDishes] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    let categoryInfo = useParams();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
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
        const fetchMenuData = async () => {
            if (showAllDishes) {
                const response = await fetch('http://localhost:8000/hungry/dishes/', {
                    method: 'GET'
                });
                const data = await response.json();
                setDishes(data);
            }
        }
        fetchMenuData();
    }, [showAllDishes])


    // fetch dishes with specific categories
    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/select/${categoryInfo.categoryId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setDishes(data);
        }
        if (categoryInfo.categoryId) {
            fetchDishData();
        }
    }, [categoryInfo.categoryId])

    return (
        <>
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
                                <Button type="primary" icon={<EditOutlined />} onClick={() => {
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
                                            <Input placeholder={dish.DishName} />
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
                                            <Input placeholder={dish.Description} />
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
                                            <Input placeholder={dish.Ingredients} />
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

                                            <Input placeholder={dish.DishType} />
                                        </Form.Item>

                                    </Form>
                                </Modal>
                            </div>
                        </Card>
                    </List.Item >
                )
                }
            />
        </>
    )

}

export default EditCategoryPage;