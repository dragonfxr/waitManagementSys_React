import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { List, Card, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import CartEdit from "./cartEdit";

function CategoryPage() {
    const [dishData, setDishData] = useState([]);
    const [count, setCount] = useState({});
    const [orderData, setOrderData] = useState([]);
    let categoryInfo = useParams();

    // fetch dishes with specific categories
    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/filter_dish/${categoryInfo.categoryId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setDishData(data);
        }
        fetchDishData();
    }, [categoryInfo.categoryId])

    const PlusCount = (DishID) => {
        setCount((prevNumbers) => ({
            ...prevNumbers,
            [DishID]: (prevNumbers[DishID] || 0) + 1
        }));

        let orderDetailId = Math.floor(Math.random() * 90000) + 10000;

        const dishIndex = orderData.findIndex(item => item.DishID === DishID);

        if (dishIndex !== -1) {
            // DishID already exists in orderData, just update the DishAmount
            setOrderData(orderData => {
                const newOrderData = [...orderData];
                newOrderData[dishIndex].DishAmount = (count[DishID] || 0) + 1;
                return newOrderData;
            });
        } else {
            // DishID does not exist in orderData, create a new entry
            const newOrderData = [...orderData, {
                "OrderDetailID": orderDetailId,
                "DishAmount": (count[DishID] || 0) + 1,
                "CompleteStatus": 0,
                "DishID": DishID
            }];

            setOrderData(newOrderData);
        }
    };

    const MinusCount = (DishID) => {
        setCount((prevNumbers) => ({
            ...prevNumbers,
            [DishID]: prevNumbers[DishID] > 0 ? prevNumbers[DishID] - 1 : 0
        }));

        const dishIndex = orderData.findIndex(item => item.DishID === DishID);

        if (dishIndex !== -1) {
            const newOrderData = [...orderData];
            if (newOrderData[dishIndex].DishAmount > 1) {
                newOrderData[dishIndex].DishAmount -= 1;
            } else {
                newOrderData.splice(dishIndex, 1);
            }
            setOrderData(newOrderData);
        }
    };

    // in shopping chart, orderdata will be modified, it needs a callback function
    const updateOrderData = (newData) => {
        setOrderData(newData);
    };

    useEffect(() => {
        let newcount = {};
        orderData.forEach(item => {
            newcount[item.DishID] = item.DishAmount || 0
        });
        setCount(newcount);
    }, [orderData])

    return (
        <>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={dishData}
                renderItem={dish => (
                    <List.Item>
                        <Card>
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    alt={dish.DishName}
                                    src={'/ayouh.jpeg'}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div style={{ marginRight: '40px', marginLeft: '40px' }}>
                                    <Card.Meta title={dish.DishName} />
                                    <div className="dish-info">
                                        <p>Id: {dish.DishID}</p>
                                        <p className="price">Price: {dish.Price} $</p>
                                        <p className="description">Description: {dish.Description}</p>
                                        <p className="ingredients">Ingredients: {dish.Ingredients}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        onClick={() => PlusCount(dish.DishID)}
                                    />
                                    <p style={{ margin: '0 16px' }}>{count[dish.DishID] || 0}</p>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<MinusOutlined />}
                                        onClick={() => MinusCount(dish.DishID)}
                                    />


                                </div>
                            </div>
                        </Card>
                    </List.Item >
                )
                }
            />

            <CartEdit orderData={orderData} updateOrderData={updateOrderData} />

        </>
    )

}

export default CategoryPage;