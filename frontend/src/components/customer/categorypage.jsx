import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { List, Card, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

function CategoryPage() {
    const [dishData, setDishData] = useState([]);
    const [count, setCount] = useState({});
    let categoryInfo = useParams();

    // fetch all dishes
    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/select/${categoryInfo.categoryId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setDishData(data);
        }
        fetchDishData();
    }, [categoryInfo.categoryId])


    const MinusCount = (DishID) =>{
        setCount((prevNumbers) => ({
            ...prevNumbers,
            [DishID]: prevNumbers[DishID] > 0 ? prevNumbers[DishID]  - 1 : 0
          }));
    };

    const PlusCount = (DishID) =>{
        setCount((prevNumbers) => ({
            ...prevNumbers,
            [DishID]: (prevNumbers[DishID] || 0) + 1
          }));
    };

    return (
        <>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={dishData}
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
                                    <Card.Meta title={dish.DishName} />
                                    <div className="dish-info">
                                        <p className="price">Price: {dish.Price} $</p>
                                        <p className="description">Description: {dish.Description}</p>
                                        <p className="ingredients">Ingredients: {dish.Ingredients}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<MinusOutlined />}
                                        onClick={() => MinusCount(dish.DishID)}
                                    />
                                    <p style={{ margin: '0 16px' }}>{count[dish.DishID] || 0}</p>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        onClick={() => PlusCount(dish.DishID)}
                                    />
                                </div>
                            </div>
                        </Card>
                    </List.Item >
                )
                }
            />


        </>
    )

}

export default CategoryPage;