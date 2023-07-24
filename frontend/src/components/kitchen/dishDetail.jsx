import { Card, Button } from "antd";
import { useState, useEffect } from "react";

function DishDetail({ dish }) {
    const [detail, setDetail] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleClick = () => {
        setIsCompleted(true);
    }

    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/dishes/${dish.DishID}`, {
                method: 'GET'
            });
            const data = await response.json();

            setDetail(data);
        }

        fetchDishData();

    }, [dish.DishID]);

    if (!detail) {
        return <div>Loading...</div>;
    }


    return (
        <Card>
            <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    alt={dish.DishName}
                    src={'/ayouh.jpeg'}
                    style={{ height: '150px', objectFit: 'cover', marginRight: '30px' }}
                />
                <div style={{ marginRight: '30px' }}>
                    <div><strong>{detail.DishName}</strong></div>
                    <div>Amount: {dish.DishAmount}</div>
                    <div>Ingredient: {detail.Ingredients}</div>
                    <div>Status: {dish.CompleteStatus}</div>

                </div>
                <Button onClick={handleClick} disabled={isCompleted} style={{ backgroundColor: isCompleted ? 'gray' : 'red', color: 'white' }}>{isCompleted ? 'Completed' : 'Not Completed'}</Button>
            </div>
        </Card>
    )
}

export default DishDetail;