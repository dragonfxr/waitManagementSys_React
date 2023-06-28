import { List, Card, Modal, Form, Input, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function EditCategoryPage({ showAllDishes }) {
    const [dishes, setDishes] = useState([]);
    const [currentDish, setCurrentDish] = useState(null); //last id
    // edit information
    const [dishName, setDishName] = useState(null)
    const [dishDescription, setDishDescription] = useState(null)
    const [dishPrice, setDishPrice] = useState(null)
    const [dishIngredients, setDishIngredients] = useState(null)
    // const [dishCategory, setDishCategory] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    let categoryInfo = useParams();

    const showModal = (dish) => {
        setCurrentDish(dish);//last id
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



    const modifyDish = async (dishId, dishCate) => {
        console.log({
            DishName: dishName,
            Price: dishPrice,
            Description: dishDescription,
            Ingredients: dishIngredients,//price not necessary
            DishType: dishCate
        })
        const response = await fetch(`http://localhost:8000/hungry/dishes/${dishId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DishName: dishName,
                Price: Number(dishPrice),
                Description: dishDescription,
                Ingredients: dishIngredients,//price not necessary
                DishType: dishCate,
            })
        });
        if (response.ok) {
            message.success("Modify dish information successfully!")
        }
    }

    return (
        <>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={dishes.concat('addButton')}
                renderItem={dish => (
                    dish !== 'addButton' ?
                        (<List.Item>
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
                                        showModal(dish);
                                    }}>
                                        Edit
                                    </Button>
                                    <Modal title="Edit Dish Details" open={isModalOpen}
                                        onOk={() => {
                                            handleOk();
                                            modifyDish(currentDish?.DishID, dish.DishType);
                                        }}
                                        onCancel={handleCancel}>
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
                                                {currentDish?.DishID}
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
                                                <Input placeholder={currentDish?.DishName}
                                                    onChange={e => setDishName(e.target.value)} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Dish Price"
                                                name="Dish Price"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please specify the dish price!',
                                                    },
                                                ]}
                                                help="Please enter a number!"
                                            >
                                                <Input placeholder={currentDish?.Price}
                                                    onChange={e => setDishPrice(e.target.value)} />
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
                                                <Input placeholder={currentDish?.Description} onChange={e => setDishDescription(e.target.value)} />
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
                                                <Input placeholder={currentDish?.Ingredients} onChange={e => setDishIngredients(e.target.value)} />
                                            </Form.Item>

                                            {/* <Form.Item
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

                                                <Input placeholder={currentDish?.DishType} />
                                            </Form.Item> */}

                                        </Form>
                                    </Modal>
                                </div>
                            </Card>
                        </List.Item >) :
                        (
                            <List.Item>
                                <Button style={{ backgroundColor: "green", width: "400px", height: "90px", fontSize: "6ex" }} type="primary">Add more dishes</Button>
                            </List.Item>
                        )
                )
                }
            />
        </>
    )

}

export default EditCategoryPage;