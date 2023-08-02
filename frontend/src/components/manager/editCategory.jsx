import { List, Card, Modal, Form, Input, Button, message, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function EditCategoryPage({ showAllDishes }) {
    const [dishes, setDishes] = useState([]);
    const [currentDish, setCurrentDish] = useState(null); //last id
    const [categories, setCategories] = useState([]);
    // edit information:
    const [dishName, setDishName] = useState(null)
    const [dishDescription, setDishDescription] = useState(null)
    const [dishPrice, setDishPrice] = useState(null)
    const [dishIngredients, setDishIngredients] = useState(null)
    const [dishCategory, setDishCategory] = useState(null);
    const [dishImage, setDishImage] = useState(null);


    // Add new dish information:
    const [newCategory, setNewCategory] = useState('');
    const [newName, setNewName] = useState(null)
    const [newDescription, setNewDescription] = useState(null)
    const [newPrice, setNewPrice] = useState(null)
    const [newIngredients, setNewIngredients] = useState(null)
    const [newImage, setNewImage] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    let categoryInfo = useParams();

    const showEditDishes = (dish) => {
        setCurrentDish(dish);//last id
        setIsEditOpen(true);
        setDishName(dish.DishName); // Set the dish name as the default value
        setDishPrice(dish.Price); // Set the dish price as the default value
        setDishDescription(dish.Description); // Set the dish description as the default value
        setDishIngredients(dish.Ingredients); // Set the dish ingredients as the default value
        setDishCategory(dish.DishType); // Set the dish category as the default value
        setDishImage(dish.DishImageURL);
        setIsEditOpen(true);
    };

    const showAddDishes = () => {
        setIsAddOpen(true);
        setNewCategory(null);
        // console.log(isAddOpen);
    }

    const editOk = () => {
        setIsEditOpen(false);
    };
    const editCancel = () => {
        setIsEditOpen(false);
        // setCurrentDish(null);
    };

    const addOk = () => {
        setIsAddOpen(false);
    };
    const addCancel = () => {
        setIsAddOpen(false);
    };



    const deleteDish = async (dish) => {
        await fetch(`http://localhost:8000/hungry/dishes/${dish.DishID}`, {
            method: 'DELETE'
        });
        setCurrentDish(dish);
        message.success("You have deleted this dish!")
    }

    useEffect(() => {
        const fetchCategoryData = async () => {
            const response = await fetch('http://localhost:8000/hungry/categories/', {
                method: 'GET'
            });
            const data = await response.json();
            setCategories(data);
        }
        fetchCategoryData();
    }, [isAddOpen, isEditOpen])

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
    }, [showAllDishes, isAddOpen, isEditOpen, currentDish])


    // fetch dishes with specific categories
    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/filter_dish/${categoryInfo.categoryId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setDishes(data);
        }
        if (categoryInfo.categoryId) {
            fetchDishData();
        }
    }, [categoryInfo.categoryId, isEditOpen, isAddOpen, currentDish])



    const modifyDish = async (dishId) => {
        // console.log({
        //     DishName: dishName,
        //     Price: dishPrice,
        //     Description: dishDescription,
        //     Ingredients: dishIngredients,//price not necessary
        //     DishType: dishCategory
        // })
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
                DishImageURL: dishImage,
                DishType: dishCategory,
            })
        });
        if (response.ok) {
            message.success("Editing dish information successfully!")
        }
    }

    const addDish = async () => {
        const response = await fetch(`http://localhost:8000/hungry/dishes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DishName: newName,
                Price: Number(newPrice),
                Description: newDescription,
                Ingredients: newIngredients,//price not necessary
                DishImageURL: newImage,
                DishType: newCategory,
            })
        });
        if (response.ok) {
            message.success("Adding dish information successfully!")
        }
    }

    useEffect(() => {
        console.log("category: ", newCategory);
    }, [newCategory]);

    // console.log(dishes);

    return (
        <>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={dishes}
                renderItem={dish => (
                    <List.Item>
                        <Card>
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    alt={dish.DishName}
                                    src={dish.DishImageURL}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div style={{ marginRight: '40px', marginLeft: '40px' }}>
                                    <h3>id: {dish.DishID}</h3>
                                    <h3>Dish Name: {dish.DishName}</h3>
                                    <div className="dish-info">
                                        <p className="price">Price: {dish.Price} $</p>
                                        <p className="description">Description: {dish.Description}</p>
                                        <p className="ingredients">Ingredients: {dish.Ingredients}</p>
                                        {/* <p className="ingredients">Category: {dish.DishType}</p> */}
                                    </div>
                                </div>
                                <Button type="primary" icon={<EditOutlined />} onClick={() => {
                                    showEditDishes(dish);
                                }} style={{ marginRight: '8px' }}>
                                    Edit
                                </Button>

                                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => {
                                    deleteDish(dish);
                                }} style={{ marginLeft: '8px' }}>
                                    Delete
                                </Button>

                                {/* Edit Dishes Window */}
                                <Modal title="Edit Dish Details"
                                    open={isEditOpen}
                                    onOk={() => {
                                        editOk();
                                        modifyDish(currentDish?.DishID);
                                    }}
                                    onCancel={editCancel}>
                                    Leave it blank if you don't want to change.
                                    <Form
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
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Dish ID"
                                        >
                                            {currentDish?.DishID}
                                        </Form.Item>
                                        <Form.Item
                                            label="Dish Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please specify the dish name!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={currentDish?.DishName}
                                                onChange={e => setDishName(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Dish Price"
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
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input rows={4} placeholder={currentDish?.Description} onChange={e => setDishDescription(e.target.value)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Dish Ingredients"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please specify the dish ingredients!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={currentDish?.Ingredients} onChange={e => setDishIngredients(e.target.value)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Dish Image URL"
                                            rules={[
                                                {
                                                    required: true
                                                },
                                            ]}
                                        >
                                            <Input placeholder={currentDish?.DishImageURL} onChange={e => setDishImage(e.target.value)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Dish Category"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select from below.',
                                                },
                                            ]}
                                        >
                                            <Select
                                                value={dishCategory}
                                                onChange={(value) => {
                                                    setDishCategory(value); // Update the state with the new selected value
                                                    // console.log("category: ", dishCategory);
                                                }}
                                                style={{ width: '100%', height: '32px', padding: '6px' }}
                                            >
                                                {/* <option value="">-- Select Category --</option> */}
                                                {categories.map((category) => (
                                                    <Select.Option key={category.CategoryID} value={category.CategoryID}>
                                                        {category.CategoryName} (CategoryID:{category.CategoryID})
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                    </Form>
                                </Modal>

                            </div>
                        </Card>
                    </List.Item >
                )
                }
            />

            {/* Add Dishes Window */}
            <Modal title="Add more dishes" open={isAddOpen}
                onOk={() => {
                    addOk();
                    addDish();
                }}
                onCancel={addCancel}>
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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Dish Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please specify the dish name!',
                            },
                        ]}
                        help="Please start with a capital letter!"
                    >
                        <Input placeholder={"Dish Name"}
                            onChange={e => setNewName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Dish Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please specify the dish price!',
                            },
                        ]}
                        help="Please enter the price!"
                    >
                        <Input placeholder={0.00}
                            onChange={e => setNewPrice(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Dish Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please specify the dish description!',
                            },
                        ]}
                    >
                        <Input placeholder={"Description"} onChange={e => setNewDescription(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Dish Ingredients"
                        rules={[
                            {
                                required: true,
                                message: 'Please specify the dish ingredients!',
                            },
                        ]}
                    >
                        <Input placeholder={"Ingredients"} onChange={e => setNewIngredients(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Dish Image URL"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input placeholder={"Image url"} onChange={e => setNewImage(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Dish Category"
                        rules={[
                            {
                                required: true,
                                message: 'Please select from below.',
                            },
                        ]}
                    >
                        <Select
                            value={newCategory}
                            onChange={(value) => {
                                setNewCategory(value); // Update the state with the new selected value

                            }}
                            style={{ width: '100%', height: '32px', padding: '6px' }}
                        >
                            {/* <option value="">-- Select Category --</option> */}
                            {categories.map((category) => (
                                <Select.Option key={category.CategoryID} value={category.CategoryID}>
                                    {category.CategoryName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Button type="primary" style={{
                position: 'fixed',
                right: '50px',
                bottom: '20px',
                zIndex: '1000',
                backgroundColor: 'green',
                width: '120px',
                height: '60px',
                fontSize: '1.5em'
            }}
                onClick={() => showAddDishes()}> Add dish </Button>
        </>

    )

}

export default EditCategoryPage;